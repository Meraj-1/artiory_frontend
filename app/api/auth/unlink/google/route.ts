import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const email = (session.user.email || "").toLowerCase();
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({ email }, { projection: { _id: 1 } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // Ensure user has at least one way to sign in afterwards:
  // check if user has a passwordHash OR another provider linked
  const hasPassword = !!(await db.collection("users").findOne({ _id: user._id, passwordHash: { $exists: true } }));
  const otherProviders = await db.collection("accounts").find({ userId: user._id, provider: { $ne: "google" } }).limit(1).toArray();

  if (!hasPassword && otherProviders.length === 0) {
    return NextResponse.json({ error: "Cannot unlink the only authentication method" }, { status: 400 });
  }

  // delete the google account row
  await db.collection("accounts").deleteMany({ userId: user._id, provider: "google" });

  return NextResponse.json({ ok: true, message: "Unlinked" }, { status: 200 });
}
