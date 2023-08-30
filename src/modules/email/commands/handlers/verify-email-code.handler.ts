import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { VerifyEmailCodeCommand } from '../impl'
import { EmailCode, EmailStatusEnum } from '@prisma/client'
import { EmailRepository } from '../../email.repository'
import { BadRequestException } from '@nestjs/common'
import { UserService } from 'src/modules/user/user.service'

@CommandHandler(VerifyEmailCodeCommand)
export class VerifyEmailCodeHandler
	implements ICommandHandler<VerifyEmailCodeCommand>
{
	constructor(
		protected emailRepository: EmailRepository,
		protected userService: UserService
	) {}

	async execute({ dto }: VerifyEmailCodeCommand): Promise<any> {
		const isEmailCode: EmailCode | null =
			await this.emailRepository.findByEmailCode(dto)

		if (!isEmailCode)
			throw new BadRequestException('Неверный код подтверждения')

		await this.userService.updateEmailStatus({
			userId: isEmailCode.userId,
			emailStatusName: EmailStatusEnum.CONFIRMED
		})

		await this.emailRepository.removeEmailCode({ id: isEmailCode.id })
		return 'success'
	}
}
