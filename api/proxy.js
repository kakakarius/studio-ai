export const config = { runtime: 'edge' };

export default async function handler(req) {
  const url = new URL(req.url);
  const target = 'https://api.siray.ai' + url.pathname.replace('/api/proxy', '') + url.search;

  const headers = new Headers(req.headers);
  headers.delete('host');

  const res = await fetch(target, {
    method: req.method,
    headers,
    body: req.method !== 'GET' ? req.body : undefined,
  });

  const responseHeaders = new Headers(res.headers);
  responseHeaders.set('Access-Control-Allow-Origin', '*');
  responseHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  responseHeaders.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');

  return new Response(res.body, {
    status: res.status,
    headers: responseHeaders,
  });
}
