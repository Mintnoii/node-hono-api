import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {v4 as uuidv4} from 'uuid'

const app = new Hono()

app.get('/', (c) => {
  return c.html('<h1>Hello Hono!</h1>')
})

app.get('/users', (c) => {
  return c.json({
    id: 1,
    name: "user001"
  })
})

const posts = []
app.post('/post', async (c) => {
  const { title, content } = await c.req.json()
  const newPost = {
    id: uuidv4(),
    title,
    content
  }
  posts.push(newPost)
  return c.json(newPost)
})

// serve(app)
serve({
  fetch: app.fetch,
  port: 3000
})
