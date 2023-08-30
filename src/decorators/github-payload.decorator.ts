import { ExecutionContext, createParamDecorator } from '@nestjs/common'
import { GitHubUser } from '@types'
import { Request } from 'express'

export const GitHubPayloadDecorator = createParamDecorator(
	(
		key: keyof GitHubUser,
		ctx: ExecutionContext
	): Promise<GitHubUser | keyof GitHubUser> => {
		const req: Request = ctx.switchToHttp().getRequest()
		return key ? req.user[key] : req.user
	}
)
