import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class HealthController {
  constructor(@InjectConnection() private readonly conn: Connection) {}

  @Get('/healthz')
  health() {
    return { status: 'ok', service: 'identity' };
  }

  // Debug: shows which DB/host/port we’re actually connected to,
  // and how many docs are in the "users" collection.
  @Get('/_debug/db')
  async dbInfo() {
    const name = this.conn.name;                 // database name
    const host = (this.conn as any).host;        // host (Mongoose exposes on the connection)
    const port = (this.conn as any).port;        // port
    const collections = await this.conn.db.listCollections().toArray();
    const hasUsers = collections.some(c => c.name === 'users');
    const usersCount = hasUsers ? await this.conn.collection('users').countDocuments() : 0;

    return { name, host, port, usersCount, collections: collections.map(c => c.name) };
  }
}
