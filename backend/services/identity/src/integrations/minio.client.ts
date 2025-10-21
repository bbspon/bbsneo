// Load Minio dynamically to allow starting the dev server even when the
// `minio` package is not installed (useful during quick local dev).
let MinioClient: any = null;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const minio = require('minio');
  MinioClient = minio.Client;
} catch (err) {
  MinioClient = null;
}

export const KYC_BUCKET = process.env.MINIO_BUCKET || 'kyc-docs';
export let minio: any;

if (MinioClient && process.env.MINIO_ENDPOINT) {
  // Only instantiate real Minio client when endpoint is configured.
  minio = new MinioClient({
    endPoint: process.env.MINIO_ENDPOINT,
    port: Number(process.env.MINIO_PORT || 9000),
    useSSL: process.env.MINIO_USE_SSL === 'true',
    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY,
  });
} else {
  // Fallback stub: methods throw errors when used. This allows the app to
  // boot without the `minio` dependency; at runtime, if KYC uploads are used
  // you'll get a clear error instructing to install `minio`.
  class MinioStub {
    constructor(_opts: any) {
      // warn once
      // eslint-disable-next-line no-console
      console.warn('minio package not found; KYC storage is disabled.');
    }
    async putObject(_bucket: string, _key: string, _data: any, _meta?: any) {
      throw new Error('minio package not installed. Run `npm install minio` in the identity service to enable object storage.');
    }
  }

  // export stub instance
  minio = new MinioStub({});
}
