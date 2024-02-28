import { Hono } from 'hono';
import { cors } from 'hono/cors';

interface WechatResponseJson {
  errcode: number;
  errmsg: string;
}

const app = new Hono();

app.use('*', cors());

app.post('/', async(c) => {
    const { webhook, msg } = await c.req.json();

    const res = await fetch(webhook, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(msg)
    });

    const { errcode, errmsg: message }: WechatResponseJson = await res.json();

    if (errcode === 0) {
      c.status(200);

      return c.json({})
    }

    c.status(400);

    return c.json({
      message,
    })
  }
);

export default app;
