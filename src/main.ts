import { serve } from '@hono/node-server'
// import { Hono } from 'hono'
import router, {usersRoute} from './routes'
import { HonoApp } from './types';
// import { defineRoutes } from './routes'

const app = new HonoApp()
const port = 3000
console.log(`Server is running on port ${port}`)
app.route('/users', usersRoute)
router(app)

serve({
  ...app,
  port
})
