// app/api/auth/register/route.ts  (modified)
import { NextResponse } from "next/server";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";
import { hashPassword } from "@/lib/auth";

const RegisterBody = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = RegisterBody.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input", issues: parsed.error.flatten() }, { status: 400 });
    }

    const { name, email: rawEmail, password } = parsed.data;
    const email = rawEmail.toLowerCase().trim();

    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const existing = await users.findOne({ email });

    if (existing) {
      // Case A: existing user already has passwordHash -> can't register
      if (existing.passwordHash) {
        return NextResponse.json({ error: "Email already in use. Did you mean to sign in or reset your password?" }, { status: 409 });
      }

      // Case B: existing OAuth-only user (no passwordHash) -> set password (or require verification)
      const passwordHash = await hashPassword(password);
      await users.updateOne(
        { _id: existing._id },
        {
          $set: {
            passwordHash,
            name: existing.name || name,
            // optionally set emailVerified if you trust OAuth provider:
            // emailVerified: existing.emailVerified ?? new Date(),
          },
        }
      );

      const updated = await users.findOne({ _id: existing._id }, { projection: { passwordHash: 0 } });
      return NextResponse.json({ user: updated, message: "Password set. You can now sign in with email & password." }, { status: 200 });
    }

    // New user: insert
    const passwordHash = await hashPassword(password);
    const insertResult = await users.insertOne({
      name,
      email,
      passwordHash,
      image: null,
      emailVerified: null,
      number: "", // Optional field for phone number
      gender: "", // Optional field for gender
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: ["user"],
    });

    const created = await users.findOne({ _id: insertResult.insertedId }, { projection: { passwordHash: 0 } });
    return NextResponse.json({ user: created }, { status: 201 });
  } catch (err: unknown) {
    console.error("Register error:", err);
    if (err instanceof Error && err.message.includes("duplicate key error")) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
