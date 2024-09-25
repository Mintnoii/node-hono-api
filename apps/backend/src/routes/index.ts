// import { Hono } from 'hono'
// import {v4 as uuidv4} from 'uuid'
// import { HonoApp } from '../types'
// type Bindings = {
//   JWT_SECRET: string;
//   // DB: D1Database;
// };
// export class HonoApp extends Hono<{ Bindings: Bindings }> {}
import { Hono } from 'hono';
import user from './users'
import emoji from './emoji'

export default function (app: Hono) {
  app.get('/', async (c) => {
    return c.text('Hello from HonoApp!');
  });
  // 路由配置
  app.route('users', user)
  app.route('emoji', emoji)

  // authController(app);
  // userController(app);
}
