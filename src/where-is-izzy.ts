import { Hono } from 'hono';
import { cors } from 'hono/cors';

const app = new Hono();

app.use('*', cors());

app.get('/', async(c) => {
  const res = await fetch('https://musicbrainz.org/ws/2/artist/d8433dee-d1a8-4b40-b27c-40bc53481167?inc=url-rels', {
    headers: {
      'Accept': 'application/json',
      'User-Agent': "WhereIsIzzy/0.1.0 ( cuiguojie@me.com )"
    },
  });

  const resJson = await res.json();

  c.status(200);
  return c.json(resJson);
});

export default app;
