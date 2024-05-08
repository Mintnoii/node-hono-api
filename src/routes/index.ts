// import { Hono } from 'hono'
// import {v4 as uuidv4} from 'uuid'
import { HonoApp } from '../types'
import usersRoute from './users'

export {usersRoute}
export default function (app: HonoApp) {
  app.get('/', async (c) => {
    return c.text('Hello from HonoApp!');
  });
  // authController(app);
  // userController(app);
}
