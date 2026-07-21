
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
