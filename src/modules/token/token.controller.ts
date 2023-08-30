import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common'
import { TokenService } from './token.service'
import { ApiTags } from '@nestjs/swagger'
import { JwtGuard } from '@guards'
import { JwtPayloadDecorator } from '@decorators'
import { Token } from '@prisma/client'

@ApiTags('token endpoints')
@Controller('token')
export class TokenController {
	constructor(private readonly tokenService: TokenService) {}

	@Get(':id')
	@UseGuards(JwtGuard)
	async findOne(
		@JwtPayloadDecorator('userId') userId: string,
		@Param('id') id: string
	): Promise<Token> {
		return this.tokenService.findOneById({ userId, id })
	}

	@Get()
	@UseGuards(JwtGuard)
	async findAll(
		@JwtPayloadDecorator('userId') userId: string
	): Promise<Token[]> {
		return this.tokenService.findAll({ userId })
	}

	@Delete(':id')
	@UseGuards(JwtGuard)
	async deleteOne(
		@JwtPayloadDecorator('userId') userId: string,
		@Param('id') id: string
	): Promise<void> {
		await this.tokenService.deleteOne({ userId, id })
	}

	@Delete()
	@UseGuards(JwtGuard)
	async deleteAll(
		@JwtPayloadDecorator('userId') userId: string
	): Promise<void> {
		await this.tokenService.deleteAll({ userId })
	}
}
