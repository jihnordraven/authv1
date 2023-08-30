import { Module } from '@nestjs/common'
import { PasswordService } from './password.service'
import { PasswordController } from './password.controller'
import { CqrsModule } from '@nestjs/cqrs'
import {
	SendPasswordCodeHandler,
	NewPasswordHandler,
	SendForgotPasswordCodeHandler
} from './commands/handlers'
import { MailerAdapter } from '@adapters'
import { PasswordRepository } from './password-repository'
import { UserModule } from '../user/user.module'
import { FindPasswordCodeHandler } from './queries/handlers'

const commandHandlers = [
	SendPasswordCodeHandler,
	NewPasswordHandler,
	SendForgotPasswordCodeHandler
]

const queryHandlers = [FindPasswordCodeHandler]

const adapters = [MailerAdapter]

@Module({
	imports: [CqrsModule, UserModule],
	controllers: [PasswordController],
	providers: [
		PasswordService,
		PasswordRepository,
		...adapters,
		...commandHandlers,
		...queryHandlers
	]
})
export class NewPasswordModule {}
