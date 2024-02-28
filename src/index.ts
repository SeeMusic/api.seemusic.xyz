import { Hono } from 'hono'
import wechatBot from './wechat-bot';

const app = new Hono()

app.get('/', (c) => c.text('seemusic.xyz API Index'));

app.route('/wechat-bot', wechatBot);

export default app
