import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
	GenerateTokensDto,
	NewTokensDto,
	RegisterUserDto,
	ValidateUserDto
} from '@dtos/auth'
import {
	GenerateTokensCommand,
	ValidateRefreshTokenCommand,
	RegisterUserCommand,
	GoogleRegisterCommand
} from './commands/impl'
import { ValidateUserQuery } from './queries/impl'
import { Tokens } from '@types'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	async register(dto: RegisterUserDto): Promise<string> {
		return this.commandBus.execute(new RegisterUserCommand(dto))
	}

	async login(dto: GenerateTokensDto): Promise<Tokens> {
		return this.commandBus.execute(new GenerateTokensCommand(dto))
	}

	async validateUser(dto: ValidateUserDto) {
		return this.queryBus.execute(new ValidateUserQuery(dto))
	}

	async newTokens(dto: NewTokensDto, userIp: string): Promise<Tokens> {
		const userId: string = await this.commandBus.execute(
			new ValidateRefreshTokenCommand(dto)
		)
		return this.commandBus.execute(
			new GenerateTokensCommand({
				userId,
				userAgent: dto.userAgent,
				userIp
			})
		)
	}

	async googleRegister(email: string, userAgent: string, userIp: string) {
		const user: User = await this.commandBus.execute(
			new GoogleRegisterCommand({ email })
		)
		return this.commandBus.execute(
			new GenerateTokensCommand({ userId: user.id, userAgent, userIp })
		)
	}
}
