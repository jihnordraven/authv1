import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { RolesEnum, User } from '@prisma/client'
import { JwtPayload } from '@types'
import { Request } from 'express'
import { UserService } from 'src/modules/user/user.service'

@Injectable()
export class AdminGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(ctx: ExecutionContext): Promise<boolean> {
		const req: Request = ctx.switchToHttp().getRequest()

		//@ts-ignore
		const payload: JwtPayload = req.user

		const user: User | null = await this.userService.findOne({
			idOrEmail: payload.userId
		})

		if (user.roleName === RolesEnum.ADMIN) {
			return true
		} else {
			return false
		}
	}
}
