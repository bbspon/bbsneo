import jwt from 'jsonwebtoken';

const accessSecret = process.env.JWT_ACCESS_SECRET!;
const refreshSecret = process.env.JWT_REFRESH_SECRET!;
const accessTTL = process.env.JWT_ACCESS_TTL || '15m';
const refreshTTL = process.env.JWT_REFRESH_TTL || '30d';

export function signAccessToken(payload: object): string {
  // cast to any to work around mismatched @types/jsonwebtoken overloads
  return (jwt as any).sign(payload, accessSecret, { expiresIn: accessTTL });
}
export function signRefreshToken(payload: object): string {
  // cast to any to work around mismatched @types/jsonwebtoken overloads
  return (jwt as any).sign(payload, refreshSecret, { expiresIn: refreshTTL });
}
export function verifyAccessToken(token: string) {
  return jwt.verify(token, accessSecret) as any;
}
export function verifyRefreshToken(token: string) {
  return jwt.verify(token, refreshSecret) as any;
}
