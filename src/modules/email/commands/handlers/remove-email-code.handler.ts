import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RemoveEmailCodeCommand } from '../impl'
import { EmailRepository } from '../../email.repository'

@CommandHandler(RemoveEmailCodeCommand)
export class RemoveEmailCodeHandler
	implements ICommandHandler<RemoveEmailCodeCommand>
{
	constructor(protected emailRepository: EmailRepository) {}

	async execute({ dto }: RemoveEmailCodeCommand): Promise<any> {
		return this.emailRepository.removeEmailCode(dto)
	}
}
