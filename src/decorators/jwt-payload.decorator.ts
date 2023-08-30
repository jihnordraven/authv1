import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { Request } from 'express'
import { JwtPayload } from 'src/types/jwt-payload.type'

export const JwtPayloadDecorator = createParamDecorator(
	(
		key: keyof JwtPayload,
		ctx: ExecutionContext
	): JwtPayload | keyof JwtPayload => {
		const req: Request = ctx.switchToHttp().getRequest()
		return key ? req.user[key] : req.user
	}
)
