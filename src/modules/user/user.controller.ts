import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { NewPasswordDto } from '@dtos/user'
import { JwtGuard } from '@guards'
import { JwtPayloadDecorator } from '@decorators'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('user endpoints')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post('new-password')
	@UseGuards(JwtGuard)
	async newPassword(
		@Body() dto: NewPasswordDto,
		@JwtPayloadDecorator('userId') userId: string
	) {
		await this.userService.newPassword(dto, userId)
	}
}
