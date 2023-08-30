import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common'
import { PasswordService } from './password.service'
import { JwtGuard } from '@guards'
import { JwtPayloadDecorator } from '@decorators'
import { ApiTags } from '@nestjs/swagger'
import { NewPasswordDto } from '@dtos/password'

@ApiTags('password endpoints')
@Controller('password')
export class PasswordController {
	constructor(private readonly passwordService: PasswordService) {}

	@Get('get-code')
	@UseGuards(JwtGuard)
	async getCode(@JwtPayloadDecorator('userId') userId: string) {
		await this.passwordService.sendCode(userId)
	}

	@Get('confirm')
	async confirm(@Query('code') code: string) {
		// По идеи это должна быть фронтенд страница с формой для смены пароля
		// и отправки кода + старого пароля + нового пароля на эндпоинт ниже
	}

	@Post('new-password')
	async newPassword(@Body() dto: NewPasswordDto) {
		await this.passwordService.newPassword(dto)
	}
}
