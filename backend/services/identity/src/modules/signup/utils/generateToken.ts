import jwt from 'jsonwebtoken';

export function generateToken(userId: string) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });
}
