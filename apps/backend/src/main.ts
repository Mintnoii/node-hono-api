import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import router from './routes'
// import { HonoApp } from './types';
// import { defineRoutes } from './routes'

const app = new Hono()
const port = 3000
console.log(`Server is running on port ${port}`)
router(app)

serve({
  ...app,
  port
})
