import { Hono } from 'hono'
import wechatBot from './wechat-bot';
import whereIsIzzy from './where-is-izzy';

const app = new Hono()

app.get('/', (c) => c.text('seemusic.xyz API Index'));

app.route('/wechat-bot', wechatBot);
app.route('/where-is-izzy', whereIsIzzy);

export default app
