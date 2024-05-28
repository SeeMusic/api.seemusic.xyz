import { Hono } from 'hono'
import wechatBot from './wechat-bot';
import gitlab from './gitlab';

const app = new Hono()

app.get('/', (c) => c.text('seemusic.xyz API Index'));

app.route('/wechat-bot', wechatBot);
app.route('/gitlab', gitlab);

export default app
