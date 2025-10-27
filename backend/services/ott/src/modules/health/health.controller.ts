import { Controller, Get } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Controller("health")
export class HealthController {
  constructor(@InjectConnection() private readonly conn: Connection) {}
  @Get("db")
  db() {
    const uri =
      (this.conn as any)?.client?.s?.url || process.env.MONGO_URI || "";
    const redacted = uri.replace(/(mongodb(\+srv)?:\/\/)([^@]+)@/i, "$1***@");
    const hosts = (this.conn as any)?.client?.topology?.s?.description?.servers
      ? Array.from(
          (this.conn as any).client.topology.s.description.servers.keys()
        )
      : [(this.conn as any)?.host].filter(Boolean);
    return {
      ok: this.conn.readyState === 1,
      dbName: this.conn.name,
      hosts,
      isSrv: uri.startsWith("mongodb+srv://"),
      uriRedacted: redacted,
    };
  }
}
