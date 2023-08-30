import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'
import { GoogleUser } from 'src/types'

export const GooglePayloadDecorator = createParamDecorator(
	(
		key: keyof GoogleUser,
		ctx: ExecutionContext
	): GoogleUser | keyof GoogleUser => {
		const req: Request = ctx.switchToHttp().getRequest()
		return key ? req.user[key] : req.user
	}
)
