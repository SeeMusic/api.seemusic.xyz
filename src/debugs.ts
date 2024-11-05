import { Hono } from 'hono';
import { cors } from 'hono/cors';

type Bindings = {
  debugs: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>();

app.use('*', cors());

interface DebugLog {
  timestamp?: number,    // 客户端时间
  message: string,       // 日志信息
  clientId?: string,     // 客户端标识
}

// 创建日志
app.post('/', async(c) => {
  const body = await c.req.json<DebugLog>();
  const serverTime = Date.now();
  const clientTime = body.timestamp || serverTime;
  const clientId = body.clientId || 'anonymous';
  
  // 生成唯一的 key：clientId_clientTime_serverTime
  const key = `${clientId}_${clientTime}_${serverTime}`;
  
  // 只存储消息内容，其他信息都在 key 中
  // 设置 7 天的 TTL，到期自动删除
  const TTL = 60 * 60 * 24 * 7;
  await c.env.debugs.put(key, body.message, { expirationTtl: TTL });
  
  return c.json({ key }, 201);
});

// 获取单条日志
app.get('/:key', async(c) => {
  const key = c.req.param('key');
  const message = await c.env.debugs.get(key);
  
  if (!message) {
    return c.json({ error: 'Log not found' }, 404);
  }
  
  return c.json({ message });
});

export default app;
