import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const header = req.headers["authorization"] || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) throw new UnauthorizedException("Missing token");

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || "dev_local_jwt_secret"
      );
      req.user = payload; // { sub, email, role, ... }
      return true;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
