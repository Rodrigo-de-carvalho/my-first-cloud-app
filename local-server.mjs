import { createServer } from 'node:http';
import worker from './worker.js';

const server = createServer(async (incoming, outgoing) => {
  const host = incoming.headers.host ?? 'localhost:8787';
  const request = new Request(`http://${host}${incoming.url ?? '/'}`, {
    method: incoming.method,
    headers: incoming.headers,
  });

  try {
    const response = await worker.fetch(request);
    outgoing.writeHead(response.status, Object.fromEntries(response.headers));
    outgoing.end(await response.text());
  } catch {
    outgoing.writeHead(500, { 'content-type': 'application/json; charset=utf-8' });
    outgoing.end(JSON.stringify({ error: 'Local server error' }));
  }
});

server.listen(8787, '127.0.0.1', () => {
  console.log('Fallback local em http://localhost:8787');
});
