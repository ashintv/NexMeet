import { email } from './../../node_modules/zod/src/v4/core/regexes';
import { z } from 'zod'

export const UserSchema  = z.object({
        Name:z.string().min(4 , 'username should have atleast four charecters')
                .max(20, "username should not exceed 20 charatecters").optional(),
        email:z.string().email(),
        password:z.string()
})