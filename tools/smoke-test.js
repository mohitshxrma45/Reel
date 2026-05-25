#!/usr/bin/env node
const { request } = require('https');
const { request: httpRequest } = require('http');
const { URL } = require('url');

const BACKEND = process.env.BACKEND_URL || 'https://reel-3-2fi7.onrender.com';
const ORIGIN = process.env.ORIGIN || 'https://reel-5wnb.vercel.app';

function doRequest(path, method = 'GET', body = null, cookie = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BACKEND);
    const isHttps = url.protocol === 'https:';
    const opts = {
      hostname: url.hostname,
      port: url.port || (isHttps ? 443 : 80),
      path: url.pathname + url.search,
      method,
      headers: {
        'Accept': 'application/json',
        'Origin': ORIGIN,
      }
    };
    if (body) {
      const bodyStr = JSON.stringify(body);
      opts.headers['Content-Type'] = 'application/json';
      opts.headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }
    if (cookie) opts.headers['Cookie'] = cookie;

    const req = (isHttps ? request : httpRequest)(opts, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, headers: res.headers, body: data });
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function extractCookie(setCookieHeaders) {
  if (!setCookieHeaders) return null;
  if (!Array.isArray(setCookieHeaders)) setCookieHeaders = [setCookieHeaders];
  return setCookieHeaders.map(s => s.split(';')[0]).join('; ');
}

async function run() {
  console.log('Smoke test: backend=', BACKEND, 'origin=', ORIGIN);
  const ts = Date.now();
  const email = `smoke+${ts}@example.com`;
  const password = 'Sm0keTest!';

  try {
    console.log('\n1) Registering food-partner...');
    const reg = await doRequest('/api/auth/food-partner/register', 'POST', {
      name: 'SmokeTest', email, password, phone: '000', address: 'here', link: 'http://x'
    });
    console.log(' register status:', reg.status);
    console.log(' register body:', reg.body ? reg.body.slice(0, 1000) : '');
    let cookie = extractCookie(reg.headers['set-cookie']);
    if (cookie) console.log(' cookie set on register');

    console.log('\n2) Logging in food-partner...');
    const login = await doRequest('/api/auth/food-partner/login', 'POST', { email, password }, cookie);
    console.log(' login status:', login.status);
    console.log(' login body:', login.body ? login.body.slice(0, 1000) : '');
    const cookie2 = extractCookie(login.headers['set-cookie']);
    if (cookie2) {
      cookie = cookie ? cookie + '; ' + cookie2 : cookie2;
      console.log(' cookie updated on login');
    }

    console.log('\n3) Calling protected GET /api/food/with-partners...');
    const protectedRes = await doRequest('/api/food/with-partners', 'GET', null, cookie);
    console.log(' protected status:', protectedRes.status);
    console.log(' protected body (first 1000 chars):', protectedRes.body ? protectedRes.body.slice(0, 1000) : '');

    const success = reg.status < 400 && login.status < 400 && protectedRes.status < 400;
    console.log('\nSMOKE TEST RESULT:', success ? 'SUCCESS' : 'FAIL');
    process.exit(success ? 0 : 2);
  } catch (err) {
    console.error('Smoke test error:', err);
    process.exit(3);
  }
}

run();
