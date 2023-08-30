import { Injectable, UnauthorizedException } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { User } from '@prisma/client'
import { SendPasswordCodeCommand } from './commands/impl'
import { UserService } from '../user/user.service'

@Injectable()
export class NewPasswordService {
	constructor(
		private readonly commandBus: CommandBus,
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
}
