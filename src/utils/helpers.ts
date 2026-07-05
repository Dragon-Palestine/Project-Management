import * as bcrypt from 'bcrypt';

const HASH_SALT_ROUNDS = 10;

export async function generateHashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(HASH_SALT_ROUNDS);
  return bcrypt.hash(password, salt);
}
