import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { PasswordCode, User } from '@prisma/client'
import { NewPasswordCommand, SendPasswordCodeCommand } from './commands/impl'
import { UserService } from '../user/user.service'
import { NewPasswordDto } from '@dtos/password'
import { FindPasswordCodeQuery } from './queries/impl'

@Injectable()
export class PasswordService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus,
		private readonly userService: UserService
	) {}

	async sendCode(userId: string) {
		const user: User | null = await this.userService.findOne({
			idOrEmail: userId
		})

		if (!user) throw new UnauthorizedException('User not found')

		await this.commandBus.execute(
			new SendPasswordCodeCommand(userId, user.email)
		)
	}

	async findOne() {}

	async remove() {}

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
}
