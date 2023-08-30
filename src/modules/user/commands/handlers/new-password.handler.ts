import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NewPasswordCommand } from '../impl'
import { MailerAdapter } from 'src/adapters'

@CommandHandler(NewPasswordCommand)
export class NewPasswordHandler implements ICommandHandler<NewPasswordCommand> {
	constructor(protected readonly mailerAdapter: MailerAdapter) {}

	async execute({ dto, userId }: NewPasswordCommand): Promise<any> {}
}
