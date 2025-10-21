declare module 'minio' {
  export interface ClientOptions {
    endPoint?: string;
    port?: number;
    useSSL?: boolean;
    accessKey?: string;
    secretKey?: string;
  }

  export class Client {
    constructor(opts: ClientOptions);
    putObject(bucket: string, key: string, data: any, meta?: any): Promise<any>;
  }

  export = { Client } as any;
}
