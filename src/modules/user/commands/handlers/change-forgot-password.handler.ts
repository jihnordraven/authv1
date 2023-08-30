import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ChangeForgotPasswordCommand } from '../impl'
import { UserRepository } from '../../user.repository'

@CommandHandler(ChangeForgotPasswordCommand)
export class ChangeForgotPasswordHandler
	implements ICommandHandler<ChangeForgotPasswordCommand>
{
	constructor(protected readonly userRepository: UserRepository) {}

	async execute({ dto }: ChangeForgotPasswordCommand): Promise<any> {
		return this.userRepository.changeForgotPassword(dto)
	}
}
