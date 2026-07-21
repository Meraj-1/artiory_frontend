import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const email = (session.user.email || "").toLowerCase();
  const client = await clientPromise;
  const db = client.db();

  const user = await db.collection("users").findOne({ email }, { projection: { _id: 1 } });
  if (!user) return NextResponse.json({ google: false });

  const account = await db.collection("accounts").findOne({ userId: user._id, provider: "google" });
  return NextResponse.json({ google: Boolean(account) });
}
