import { Hono } from 'hono'
import wechatBot from './wechat-bot';
import gitlab from './gitlab';
import debugs from './debugs';

const app = new Hono()

app.get('/', (c) => c.text('seemusic.xyz API Index'));

app.route('/wechat-bot', wechatBot);
app.route('/gitlab', gitlab);
app.route('/debugs', debugs);

export default app
