import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.json({
    id: 1,
    name: "user001"
  })
})
app.post('/', (c) => c.json('create an author', 201))
app.get('/:id', (c) => c.json(`get ${c.req.param('id')}`))

export default app