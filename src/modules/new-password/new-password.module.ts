import { Module } from '@nestjs/common'
import { NewPasswordService } from './new-password.service'
import { NewPasswordController } from './new-password.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { SendPasswordCodeHandler } from './commands/handlers'
import { MailerAdapter } from '@adapters'
import { NewPasswordRepository } from './new-password.repository'
import { UserModule } from '../user/user.module'

const commandHandlers = [SendPasswordCodeHandler]

const adapters = [MailerAdapter]

@Module({
	imports: [CqrsModule, UserModule],
	controllers: [NewPasswordController],
	providers: [
		NewPasswordService,
		NewPasswordRepository,
		...adapters,
		...commandHandlers
	]
})
export class NewPasswordModule {}
