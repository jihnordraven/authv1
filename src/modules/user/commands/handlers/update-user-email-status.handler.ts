import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { UpdateUserEmailStatusCommand } from '../impl'
import { UserRepository } from '../../user.repository'

@CommandHandler(UpdateUserEmailStatusCommand)
export class UpdateUserEmailStatusHandler
	implements ICommandHandler<UpdateUserEmailStatusCommand>
{
	constructor(protected userRepository: UserRepository) {}

	async execute({ dto }: UpdateUserEmailStatusCommand): Promise<any> {
		return this.userRepository.updateEmailStatus(dto)
	}
}
