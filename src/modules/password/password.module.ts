import { Module } from '@nestjs/common'
import { PasswordService } from './password.service'
import { PasswordController } from './password.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { SendPasswordCodeHandler } from './commands/handlers'
import { MailerAdapter } from '@adapters'
import { NewPasswordRepository } from './password-repository'
import { UserModule } from '../user/user.module'
import { FindPasswordCodeHandler } from './queries/handlers'
import { NewPasswordHandler } from './commands/handlers/new-password.handler'

const commandHandlers = [SendPasswordCodeHandler, NewPasswordHandler]

const queryHandlers = [FindPasswordCodeHandler]

const adapters = [MailerAdapter]

@Module({
	imports: [CqrsModule, UserModule],
	controllers: [PasswordController],
	providers: [
		PasswordService,
		NewPasswordRepository,
		...adapters,
		...commandHandlers,
		...queryHandlers
	]
})
export class NewPasswordModule {}
