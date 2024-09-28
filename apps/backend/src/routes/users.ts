import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'
import { UserValidator } from '@/schema'

const user = new Hono()
const prisma = new PrismaClient()

// 查询
user.get('/', async (c) => {
  const emojis = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc' // 从新到旧排序
    }
  })
  return c.json({
    status: 200,
    msg: 'success',
    data: emojis
  })
})
// 注册
user.post('/register', UserValidator, async (c) => {
  const validated = c.req.valid('json')
  const data = await c.req.json()
  //  console.log(validated,data,'====');
  const newUser = await prisma.user.create({ data })
  return c.json(newUser, 201)
})
// 登录
user.post('/login', UserValidator, async (c) => {
  // 1. 验证用户输入
  const validated = c.req.valid('json')
  // if (!username || !password) {
  //   return c.status(400).send({ message: '用户名和密码不能为空' })
  // }
  const data = await c.req.json()
  const { email, password } = data

  // 2. 查找用户
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  console.log(user, '====')

  // 3. 密码验证
  // 假设密码是加密存储的，这里需要使用相同的加密方法来验证密码 validatePassword(password, user.password)
  if (user && user.password === password) {
    // 登录成功，返回成功响应
    // 注意：实际应用中不应直接返回密码或敏感信息
    return c.json({ message: '登录成功', id: user.id, token: '123456' }, 200)
  } else {
    // 用户名或密码错误
    return c.json({ message: '用户名或密码错误' }, 401)
  }
})

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
