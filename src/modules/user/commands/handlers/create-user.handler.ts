import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateUserCommand } from '../impl'
import { UserRepository } from '../../user.repository'

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
	constructor(protected userRepository: UserRepository) {}

	async execute({ dto }: CreateUserCommand): Promise<any> {
		return this.userRepository.create(dto)
	}
}
