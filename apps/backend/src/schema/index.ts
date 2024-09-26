import { z } from "zod"
import { zValidator } from "@hono/zod-validator"

const UserSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export const UserValidator = zValidator("json", UserSchema)
// export const UserValidator = zValidator("json", UserSchema,(result, c) => {
//   console.log(result,c,'====dad')
//     if (!result.success) {
//       return c.text('Invalid!', 400)
//     }
//   })