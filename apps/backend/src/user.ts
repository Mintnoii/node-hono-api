import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient();

// async function test1() {
//     await prisma.user.create({
//         data: {
//             name: 'qing',
//             email: '123@qing.com'
//         }
//     });

//     await prisma.user.create({
//         data: {
//             name: 'wqing',
//             email: '222@wqing.com'
//         }
//     });

//     const users = await prisma.user.findMany();
//     console.log(users);
// }

// test1();

const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query'
    },
  ],
});

async function test2() {
    const user = await prisma.user.create({
        data: {
            name: '东东东',
            email: 'dongdong@dong.com',
            posts: {
                create: [
                    {
                        title: 'aaa',
                        content: 'aaaa'
                    },
                    {
                        title: 'bbb',
                        content: 'bbbb'
                    }
                ]
            },
        },
    })
    console.log(user)
}

test2();
