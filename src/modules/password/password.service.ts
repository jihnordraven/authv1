import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { ForgotPasswordCode, PasswordCode, User } from '@prisma/client'
import {
	SendForgotPasswordCodeCommand,
	NewForgotPasswordCommand,
	NewPasswordCommand,
	SendPasswordCodeCommand
} from './commands/impl'
import { UserService } from '../user/user.service'
import {
	SendForgotPasswordCodeDto,
	NewPasswordDto,
	NewPasswordForgotDto
} from '@dtos/password'
import { FindPasswordCodeQuery } from './queries/impl'
import { FindOneUserQuery } from '../user/queries/impl'

@Injectable()
export class PasswordService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	async sendCode(userId: string) {
		const user: User | null = await this.commandBus.execute(
			new FindOneUserQuery({ idOrEmail: userId })
		)

		if (!user) throw new UnauthorizedException('User not found')

		await this.commandBus.execute(
			new SendPasswordCodeCommand(userId, user.email)
		)
	}

	async newPassword(dto: NewPasswordDto) {
		const code: PasswordCode | null = await this.queryBus.execute(
			new FindPasswordCodeQuery(dto)
		)
		await this.commandBus.execute(
			new NewPasswordCommand({
				code,
				oldPassword: dto.oldPassword,
				newPassword: dto.newPassword
			})
		)
	}

	async sendForgotPasswordCode(
		dto: SendForgotPasswordCodeDto
	): Promise<void> {
		await this.commandBus.execute(new SendForgotPasswordCodeCommand(dto))
	}

	async newForgotPassword(dto: NewPasswordForgotDto) {
		const code: ForgotPasswordCode | null = await this.queryBus.execute(
			new FindPasswordCodeQuery({ code: dto.code })
		)
		await this.commandBus.execute(
			new NewForgotPasswordCommand({ code, newPassword: dto.newPassword })
		)
	}
}
