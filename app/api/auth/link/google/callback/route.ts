import { NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import clientPromise from "@/lib/mongodb";
import { verifyState } from "@/lib/oauthState";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const oauthClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");
    const error = url.searchParams.get("error");
    if (error) {
      console.error("Google callback error:", error);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=${encodeURIComponent(error)}`);
    }
    if (!code || !state) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=missing_code_or_state`);
    }

    // verify our signed state
    const payload = verifyState(state);
    if (!payload) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=invalid_state`);
    }

    // exchange code for tokens
    const tokenResponse = await oauthClient.getToken({
      code,
      redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/link/google/callback`,
    });
    const tokens = tokenResponse.tokens;
    // tokens.id_token exists usually
    const idToken = tokens.id_token;
    if (!idToken) {
      console.error("No id_token returned", tokens);
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=no_id_token`);
    }

    // verify id_token to get payload
    const ticket = await oauthClient.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
    const profile = ticket.getPayload();
    if (!profile?.email) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=no_email`);
    }
    const googleEmail = (profile.email || "").toLowerCase();

    // ensure signed-in user still matches payload email from state
    // (we used state.email to ensure original requester)
    if (googleEmail !== payload.email) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=email_mismatch`);
    }

    // At this point we should confirm the server session is valid (user still signed in)
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      // session might have expired — we can redirect to login
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/auth/signin?callbackUrl=/account`);
    }
    const signedInEmail = (session.user.email || "").toLowerCase();
    if (signedInEmail !== googleEmail) {
      // session email mismatch — don't link
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=session_email_mismatch`);
    }

    // Link in DB
    const db = (await clientPromise).db();
    const user = await db.collection("users").findOne({ email: signedInEmail });
    if (!user) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=user_not_found`);
    }

    // ensure provider not already linked to another user
    const providerTaken = await db.collection("accounts").findOne({ provider: "google", providerAccountId: profile.sub });
    if (providerTaken && String(providerTaken.userId) !== String(user._id)) {
      return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/account?link_error=provider_already_taken`);
    }

    // if not already linked to this user, insert
    const already = await db.collection("accounts").findOne({ userId: user._id, provider: "google" });
    if (!already) {
      await db.collection("accounts").insertOne({
        userId: user._id,
        provider: "google",
        providerAccountId: profile.sub,
        type: "oauth",
        providerType: "oauth",
        access_token: tokens.access_token ?? null,
        refresh_token: tokens.refresh_token ?? null,
        expires_at: tokens.expiry_date ?? null,
        scope: tokens.scope ?? null,
        id_token: idToken,
        token_type: tokens.token_type ?? null,
      });
    }

    // optionally update user profile fields
    await db.collection("users").updateOne(
      { _id: user._id },
      {
        $set: {
          name: user.name || profile.name || null,
          image: user.image || profile.picture || null,
          emailVerified: user.emailVerified || (profile.email_verified ? new Date() : null),
        },
      }
    );

    // Success — redirect back to account with success flag
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/?account=true&linked=google`);
  } catch (err) {
    console.error("Link callback error:", err);
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/?account=true&link_error=server_error`);
  }
}
