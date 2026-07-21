import crypto from "crypto";

const SECRET = process.env.NEXTAUTH_SECRET || "dev-secret-change-me";
const ALGORITHM = "sha256";
const EXPIRES_IN = 5 * 60; // seconds

type Payload = {
  email: string;
  iat: number;
  exp: number;
  nonce: string;
};

export function signState(email: string) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + EXPIRES_IN;
  const nonce = crypto.randomBytes(8).toString("hex");
  const payload: Payload = { email, iat, exp, nonce };
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const hmac = crypto.createHmac(ALGORITHM, SECRET).update(payloadStr).digest("base64url");
  return `${payloadStr}.${hmac}`;
}

export function verifyState(state: string): Payload | null {
  try {
    const [payloadStr, signature] = state.split(".");
    if (!payloadStr || !signature) return null;
    const expected = crypto.createHmac(ALGORITHM, SECRET).update(payloadStr).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) return null;
    const payloadJson = Buffer.from(payloadStr, "base64url").toString("utf8");
    const payload = JSON.parse(payloadJson) as Payload;
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) return null;
    return payload;
  } catch {
    return null;
  }
}
