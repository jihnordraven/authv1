import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateEmailCodeCommand } from '../impl'
import { EmailRepository } from '../../email.repository'

@CommandHandler(CreateEmailCodeCommand)
export class CreateEmailCodeHandler
	implements ICommandHandler<CreateEmailCodeCommand>
{
	constructor(protected emailRepository: EmailRepository) {}

	async execute({ dto }: CreateEmailCodeCommand): Promise<any> {
		return this.emailRepository.createEmailCode(dto)
	}
}
