(async () => {
  try {
  const url = 'http://localhost:3103/auth/email/register';
    const body = { email: 'smoke+3@example.com', password: 'P@ssword1', displayName: 'Smoke Test 3' };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => null);
    console.log('Status:', res.status);
    console.log('Response:', data);
  } catch (err) {
    console.error('Request error:', err.message || err);
    process.exit(1);
  }
})();
