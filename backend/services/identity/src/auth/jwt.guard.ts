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
    const auth = req.headers["authorization"];
    if (!auth || !auth.startsWith("Bearer "))
      throw new UnauthorizedException("Missing token");

    const token = auth.slice(7);
    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || "dev_local_jwt_secret"
      ) as any;
      req.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
