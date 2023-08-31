import { Controller, Get, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { ApiTags } from '@nestjs/swagger'
import { AdminGuard, JwtGuard } from '@guards'
import { JwtPayloadDecorator } from '@decorators'

@ApiTags('user endpoints')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	@UseGuards(JwtGuard, AdminGuard)
	async delete(@JwtPayloadDecorator('userId') userId: string) {
		return userId
	}
}
