import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NewForgotPasswordCommand } from '../impl'
import { UserService } from 'src/modules/user/user.service'
import { PasswordService } from '../../password.service'
import { PasswordRepository } from '../../password-repository'

@CommandHandler(NewForgotPasswordCommand)
export class NewForgotPasswordHandler
	implements ICommandHandler<NewForgotPasswordCommand>
{
	constructor(
		protected readonly userService: UserService,
		protected readonly passwordRepository: PasswordRepository
	) {}

	async execute({ dto }: NewForgotPasswordCommand): Promise<any> {
		await this.userService.changeForgotPassword({
			userId: dto.code.userId,
			newPassword: dto.newPassword
		})

		await this.passwordRepository.removeCode({
			passwordCodeId: dto.code.id
		})
	}
}
