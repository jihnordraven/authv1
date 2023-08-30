import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NewPasswordRepository } from '../../new-password.repository'
import { PasswordCode } from '@prisma/client'
import { UnauthorizedException } from '@nestjs/common'
import { MailerAdapter } from 'src/adapters'
import { SendPasswordCodeCommand } from '../impl'

@CommandHandler(SendPasswordCodeCommand)
export class SendPasswordCodeHandler
	implements ICommandHandler<SendPasswordCodeCommand>
{
	constructor(
		protected newPasswordRepository: NewPasswordRepository,
		protected mailerAdapter: MailerAdapter
	) {}

	async execute({ userId, email }: SendPasswordCodeCommand): Promise<any> {
		const emailCode: PasswordCode | null =
			await this.newPasswordRepository.createCode(userId)

		if (!emailCode)
			throw new UnauthorizedException('Something went wrong...')

		await this.mailerAdapter.sendMailPass({ email, emailCode })
	}
}
