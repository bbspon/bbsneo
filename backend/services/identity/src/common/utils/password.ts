import * as bcrypt from 'bcryptjs';
export async function hashPassword(p: string) {
const salt = await bcrypt.genSalt(10);
return bcrypt.hash(p, salt);
}
export async function verifyPassword(p: string, hash: string) {
return bcrypt.compare(p, hash);
}