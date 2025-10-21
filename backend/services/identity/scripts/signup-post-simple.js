const http = require('http');
const data = JSON.stringify({ email: 'smoke+http@example.com', password: 'P@ssword1', displayName: 'HTTP Smoke' });

const options = {
  hostname: 'localhost',
  port: 3103,
  path: '/auth/email/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data),
  },
  timeout: 3000,
};

const req = http.request(options, (res) => {
  const chunks = [];
  res.on('data', (chunk) => chunks.push(chunk));
  res.on('end', () => {
    const body = Buffer.concat(chunks).toString();
    console.log('STATUS', res.statusCode);
    console.log('BODY', body);
    process.exit(0);
  });
});

req.on('error', (err) => {
  console.error('REQ_ERR', err.message);
  process.exit(1);
});
req.on('timeout', () => {
  console.error('REQ_TIMEOUT');
  req.destroy();
});

req.write(data);
req.end();
