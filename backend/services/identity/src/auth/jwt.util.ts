import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

// Strongly type the default so TS knows it's valid for 'expiresIn'
const DEFAULT_EXP: SignOptions["expiresIn"] = "7d";

export function signJwt(
  payload: Record<string, unknown>,
  secret: string,
  options: SignOptions = {}
): string {
  const finalOpts: SignOptions = {
    expiresIn: options.expiresIn ?? DEFAULT_EXP,
    ...options,
  };
  // jsonwebtoken@9 expects: (payload, secretOrPrivateKey, options)
  return jwt.sign(payload, secret, finalOpts);
}

export function verifyJwt<T extends JwtPayload = JwtPayload>(
  token: string,
  secret: string
): T {
  return jwt.verify(token, secret) as T;
}

export function decodeJwt<T = unknown>(token: string): T | null {
  const decoded = jwt.decode(token);
  return (decoded ?? null) as T | null;
}
