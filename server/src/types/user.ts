import { z } from 'zod'

export const UserSchema  = z.object({
        username:z.string().min(4 , 'username should have atleast four charecters')
                .max(10 , "username should not exceed 10 charatecters"),
        password:z.string()
})