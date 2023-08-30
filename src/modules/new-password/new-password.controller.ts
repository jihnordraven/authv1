import { Controller, Get, Query, UseGuards } from '@nestjs/common'
import { NewPasswordService } from './new-password.service'
import { JwtGuard } from '@guards'
import { JwtPayloadDecorator } from '@decorators'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('new-password endpoints')
@Controller('new-password')
export class NewPasswordController {
	constructor(private readonly newPasswordService: NewPasswordService) {}

	@Get('get-code')
	@UseGuards(JwtGuard)
	async newPassword(@JwtPayloadDecorator('userId') userId: string) {
		await this.newPasswordService.sendCode(userId)
	}

	@Get('confirm')
	async confirm(@Query('code') code: string) {
		return code
	}
}
