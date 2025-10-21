const { spawn } = require('child_process');
const http = require('http');
const mongoose = require('mongoose');

const SERVER_CMD = 'node';
const SERVER_ARGS = ['dist/main.js'];
const PORT = 3103;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/bbsneo_identity';

function startServer() {
  const child = spawn(SERVER_CMD, SERVER_ARGS, {
    cwd: process.cwd(),
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
  console.log('Server started detached, PID', child.pid);
}

function waitForPort(port, timeout = 10000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    (function check() {
      const socket = require('net').createConnection(port, '127.0.0.1');
      socket.on('connect', () => {
        socket.destroy();
        resolve(true);
      });
      socket.on('error', () => {
        socket.destroy();
        if (Date.now() - start > timeout) return reject(new Error('timeout'));
        setTimeout(check, 250);
      });
    })();
  });
}

function postSignup() {
  const data = JSON.stringify({ email: 'smoke+detached@example.com', password: 'P@ssword1', displayName: 'Detached Smoke' });
  const opts = { hostname: 'localhost', port: PORT, path: '/auth/email/register', method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) }, timeout: 5000 };
  return new Promise((resolve, reject) => {
    const req = http.request(opts, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const body = Buffer.concat(chunks).toString();
        resolve({ status: res.statusCode, body });
      });
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function checkDb() {
  await mongoose.connect(MONGO_URI);
  const db = mongoose.connection.db;
  const cols = await db.listCollections().toArray();
  const colNames = cols.map(c => c.name);
  let users = [];
  if (colNames.includes('users')) {
    users = await db.collection('users').find({}).limit(5).toArray();
  }
  await mongoose.disconnect();
  return { colNames, users };
}

(async () => {
  try {
    startServer();
    await waitForPort(PORT, 10000);
    console.log('Port', PORT, 'is open — posting signup...');
    const res = await postSignup();
    console.log('Signup response:', res.status, res.body);
    const db = await checkDb();
    console.log('Collections:', db.colNames);
    console.log('Users sample:', db.users);
    process.exit(0);
  } catch (err) {
    console.error('run-and-test error:', err && err.message ? err.message : err);
    process.exit(1);
  }
})();
