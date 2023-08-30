import { Module } from '@nestjs/common'
import { EmailService } from './email.service'
import { EmailController } from './email.controller'
import { EmailRepository } from './email.repository'
import { FindByEmailCodeHandler } from './queries/handlers'
import {
	CreateEmailCodeHandler,
	VerifyEmailCodeHandler,
	RemoveEmailCodeHandler
} from './commands/handlers'
import { CqrsModule } from '@nestjs/cqrs'
import { UserModule } from '../user/user.module'

const commandHandlers = [
	CreateEmailCodeHandler,
	VerifyEmailCodeHandler,
	RemoveEmailCodeHandler
]
const queryHandlers = [FindByEmailCodeHandler]

@Module({
	imports: [CqrsModule, UserModule],
	controllers: [EmailController],
	providers: [
		EmailService,
		EmailRepository,
		...commandHandlers,
		...queryHandlers
	],
	exports: [EmailService]
})
export class EmailModule {}
