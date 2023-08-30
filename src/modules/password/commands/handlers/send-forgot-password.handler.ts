import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { SendForgotPasswordCodeCommand } from '../impl'
import { ForgotPasswordCode, User } from '@prisma/client'
import { UserService } from 'src/modules/user/user.service'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { PasswordRepository } from '../../password-repository'
import { MailerAdapter } from '@adapters'

@CommandHandler(SendForgotPasswordCodeCommand)
export class SendForgotPasswordCodeHandler
	implements ICommandHandler<SendForgotPasswordCodeCommand>
{
	constructor(
		protected readonly userService: UserService,
		protected readonly passwordRepository: PasswordRepository,
		protected readonly mailerAdapter: MailerAdapter
	) {}

	async execute({ dto }: SendForgotPasswordCodeCommand): Promise<any> {
		const user: User | null = await this.userService.findOne({
			idOrEmail: dto.email
		})

		if (!user) throw new NotFoundException('User not found')

		const forgotPasswordCode: ForgotPasswordCode | null =
			await this.passwordRepository.createForgotPasswordCode({
				userId: user.id
			})

		if (!forgotPasswordCode)
			throw new BadRequestException('Something went wrong... Try again')

		await this.mailerAdapter.sendMailForgotPass({
			email: user.email,
			emailCode: forgotPasswordCode
		})
	}
}
