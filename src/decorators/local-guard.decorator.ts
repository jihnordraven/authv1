import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { User } from '@prisma/client'
import { Request } from 'express'

export const LocalGuardDecorator = createParamDecorator(
	(key: keyof User, ctx: ExecutionContext): User | keyof User => {
		const req: Request = ctx.switchToHttp().getRequest()
		return key ? req.user[key] : req.user
	}
)
