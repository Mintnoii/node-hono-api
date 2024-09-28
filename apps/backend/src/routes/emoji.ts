import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client'

const emoji = new Hono()
const prisma = new PrismaClient()

// 查询
emoji.get('/', async (c) => {
  const emojis = await prisma.emoji.findMany()
  return c.json({
    status: 200,
    msg: 'success',
    data: emojis
  })
})

// 查询单个
emoji.get('/:id', async (c) => {
  const id = c.req.param('id')
  const data = await prisma.emoji.findUnique({
    where: { id: parseInt(id) }
  })
  console.log(data, '====')
  if (!data) {
    return c.json({
      status: 404,
      msg: 'Emoji not found',
      data: null
    })
  }
  return c.json({
    status: 200,
    msg: 'success',
    data
  })
})
// 新增
emoji.post('/', async (c) => {
  const data = await c.req.json()
  console.log(data, '====')
  const newwEmoji = await prisma.emoji.create({ data })
  return c.json(newwEmoji, 201)
})
// 删除
emoji.delete('/:id', async (c) => {
  const { id } = c.req.param()
  console.log(id, 'ididid')
  await prisma.emoji.delete({
    where: { id: parseInt(id) }
  })
  // todo 处理 id 不存在的情况
  return c.json({ status: 200, msg: 'Emoji deleted' })
})
// 更新
emoji.put('/:id', async (c) => {
  const { id } = c.req.param()
  const data = await c.req.json()
  try {
    const updatedUser = await prisma.emoji.update({
      where: { id: parseInt(id) },
      data
    })
    return c.json({
      status: 200,
      msg: 'success',
      data: updatedUser
    })
  } catch (err: any) {
    // 处理找不到数据的情况
    if (err.code === 'P2025') {
      return c.json({
        status: 404,
        msg: 'Emoji not found',
        data: null
      })
    } else {
      return c.json({
        status: 500,
        msg: 'Internal server error',
        data: null
      })
    }
  }
})

export default emoji
