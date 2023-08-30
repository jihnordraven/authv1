import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GenerateTokensCommand } from '../impl'
import { TokenService } from 'src/modules/token/token.service'
import { JwtService } from '@nestjs/jwt'
import { Token } from '@prisma/client'
import { UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@CommandHandler(GenerateTokensCommand)
export class GenerateTokensHandler
	implements ICommandHandler<GenerateTokensCommand>
{
	constructor(
		protected readonly jwtService: JwtService,
		protected readonly tokenService: TokenService,
		protected readonly configService: ConfigService
	) {}

	async execute({ dto }: GenerateTokensCommand): Promise<any> {
		const accessToken: string = this.jwtService.sign(
			{ userId: dto.userId },
			{
				secret: this.configService?.get<string>('JWT_SECRET'),
				expiresIn: this.configService?.get<string>('JWT_EXP')
			}
		)

		const refreshToken: Token | null = await this.tokenService.create({
			userId: dto.userId,
			userAgent: dto.userAgent,
			userIp: dto.userIp
		})

		if (!accessToken || !refreshToken)
			throw new UnauthorizedException('Не удалось создать токены')

		return { accessToken, refreshToken }
	}
}
