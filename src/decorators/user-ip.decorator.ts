import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const UserIpDecorator = createParamDecorator(
	(_, ctx: ExecutionContext): string => {
		const req: Request = ctx.switchToHttp().getRequest()
		return req.ip
	}
)
