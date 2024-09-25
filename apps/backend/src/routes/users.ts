import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const user = new Hono()
const prisma = new PrismaClient()

// 查询
user.get('/', async (c) => {
   const emojis = await prisma.user.findMany();
   return c.json({
    status:200,
    msg:'success',
    data:emojis
   });
 });
// 注册
 user.post('/register', async (c) => {
   const data = await c.req.json();
   console.log(data,'====');
   const newUser = await prisma.user.create({ data });
   return c.json(newUser, 201);
 });
// // 新增
//  user.post('/', async (c) => {
//    const data = await c.req.json();
//    console.log(data,'====');
//    const newUser = await prisma.user.create({ data });
//    return c.json(newUser, 201);
//  });
user.get('/:id', (c) => {
  // GET /user/:id
  const id = c.req.param('id')
  return c.text('Get user: ' + id)
})
user.post('/', (c) => c.text('Create user')) // POST /user

export default user

