// app/api/auth/link/google/start/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { signState } from "@/lib/oauthState";

export async function GET() {
  // require authenticated user
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = (session.user.email || "").toLowerCase();
  const state = signState(email);

  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/link/google/callback`,
    response_type: "code",
    scope: "openid email profile",
    prompt: "select_account", // let user choose
    access_type: "offline",
    state,
  });

  const url = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  return NextResponse.redirect(url);
}
