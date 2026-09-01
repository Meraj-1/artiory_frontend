
import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  if (!plain || typeof plain !== "string") {
    throw new TypeError("Password must be a non-empty string");
  }
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(plain, salt);
}

export async function comparePasswords(plain: string, hash: string): Promise<boolean> {
  if (!plain || typeof plain !== "string") return false;
  if (!hash || typeof hash !== "string") return false;
  return bcrypt.compare(plain, hash);
}

import crypto from "crypto";

function base64url(str: Buffer | string): string {
  const buf = typeof str === "string" ? Buffer.from(str) : str;
  return buf.toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

export function signJwtHS256(payload: object, secret: string, expiresInMinutes = 1440): string {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + (expiresInMinutes * 60)
  };

  const encodedHeader = base64url(JSON.stringify(header));
  const encodedPayload = base64url(JSON.stringify(fullPayload));

  const signatureInput = `${encodedHeader}.${encodedPayload}`;
  const signature = crypto.createHmac("sha256", secret)
    .update(signatureInput)
    .digest();

  const encodedSignature = base64url(signature);
  return `${signatureInput}.${encodedSignature}`;
}

export function getTargetBackendUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_BASE_URL || "";
  if (!envUrl || envUrl.includes("api.artiory.com") || envUrl.includes("undefined")) {
    return "https://artiory-backend.vercel.app";
  }
  return envUrl.replace(/\/+$/, "");
}

export function createBackendToken(user: any): string {
  const userId = user?.id || user?._id || user?.userId || "user_" + Math.random().toString(36).slice(2);
  const email = user?.email || "";
  const name = user?.name || "";

  const secret = process.env.JWT_SECRET || "werfuh3482fnrf8932rf_prod_secure_key";
  return signJwtHS256({ id: userId, email, name }, secret, 1440);
}
