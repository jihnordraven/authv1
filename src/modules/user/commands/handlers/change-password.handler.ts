import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { ChangePasswordCommand } from '../impl'
import { UserRepository } from '../../user.repository'

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordHandler
	implements ICommandHandler<ChangePasswordCommand>
{
	constructor(protected readonly userRepository: UserRepository) {}

	async execute({ dto }: ChangePasswordCommand): Promise<any> {
		return this.userRepository.changePassword(dto)
	}
}
