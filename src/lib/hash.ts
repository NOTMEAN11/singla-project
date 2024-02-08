import bcrypt from "bcrypt";

function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
export { hashPassword, verifyPassword };
