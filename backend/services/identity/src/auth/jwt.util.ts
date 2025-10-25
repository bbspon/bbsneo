import * as jwt from "jsonwebtoken";

const DEFAULT_EXP = "7d";

export function signJwt(
  payload: object,
  secret: string,
  expiresIn = DEFAULT_EXP
) {
  return jwt.sign(payload, secret, { expiresIn });
}
