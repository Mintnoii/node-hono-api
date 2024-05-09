import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const emoji = new Hono()
const prisma = new PrismaClient()

// emoji.get('/', (c) => c.text('List emoji')) // GET /emoji
emoji.get('/', async (c) => {
   const emojis = await prisma.emoji.findMany();
   return c.json({
    status:200,
    msg:'success',
    data:emojis
   });
 });
// 新增
 emoji.post('/', async (c) => {
   const data = await c.req.json();
   console.log(data,'====');
   const newwEmoji = await prisma.emoji.create({ data });
   return c.json(newwEmoji, 201);
 });
emoji.get('/:id', (c) => {
  // GET /emoji/:id
  const id = c.req.param('id')
  return c.text('Get emoji: ' + id)
})
emoji.post('/', (c) => c.text('Create emoji')) // POST /emoji

export default emoji
