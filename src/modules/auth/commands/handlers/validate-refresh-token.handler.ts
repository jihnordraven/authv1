import { TokenService } from 'src/modules/token/token.service'
import { JwtService } from '@nestjs/jwt'
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ValidateRefreshTokenCommand } from '../impl'
import { Token } from '@prisma/client'
import { UnauthorizedException } from '@nestjs/common'

@CommandHandler(ValidateRefreshTokenCommand)
export class ValidateRefreshTokenHandler
	implements ICommandHandler<ValidateRefreshTokenCommand>
{
	constructor(
		protected jwtService: JwtService,
		protected tokenService: TokenService
	) {}

	async execute({ dto }: ValidateRefreshTokenCommand): Promise<any> {
		const token: Token | null = await this.tokenService.findOneByToken({
			token: dto.token
		})

		if (!token)
			throw new UnauthorizedException(
				'Invalid token, please log in again'
			)

		const isTokenExpired: boolean = Boolean(token.exp > new Date())

		if (!isTokenExpired)
			throw new UnauthorizedException(
				'Token expired, please log in again'
			)

		return token.userId
	}
}
