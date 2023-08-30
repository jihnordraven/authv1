import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { PasswordRepository } from '../../password-repository'
import { PasswordCode } from '@prisma/client'
import { UnauthorizedException } from '@nestjs/common'
import { MailerAdapter } from 'src/adapters'
import { SendPasswordCodeCommand } from '../impl'

@CommandHandler(SendPasswordCodeCommand)
export class SendPasswordCodeHandler
	implements ICommandHandler<SendPasswordCodeCommand>
{
	constructor(
		protected passwordRepository: PasswordRepository,
		protected mailerAdapter: MailerAdapter
	) {}

	async execute({ userId, email }: SendPasswordCodeCommand): Promise<any> {
		const emailCode: PasswordCode | null =
			await this.passwordRepository.createCode(userId)

		if (!emailCode)
			throw new UnauthorizedException('Something went wrong...')

		await this.mailerAdapter.sendMailPass({ email, emailCode })
	}
}
