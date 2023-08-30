import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { CqrsModule } from '@nestjs/cqrs'
import {
	GenerateTokensHandler,
	RegisterUserHandler,
	ValidateRefreshTokenHandler,
	GoogleRegisterHandler
} from './commands/handlers'
import { AuthRepository } from './auth.repository'
import { UserModule } from '../user/user.module'
import { EmailModule } from '../email/email.module'
import { MailerAdapter } from '@adapters'
import { ValidateUserHandler } from './queries/handlers'
import { TokenModule } from '../token/token.module'
import { JwtModule } from '@nestjs/jwt'
import { HttpModule } from '@nestjs/axios'

const commandHandlers = [
	RegisterUserHandler,
	GenerateTokensHandler,
	ValidateRefreshTokenHandler,
	GoogleRegisterHandler
]

const queryHandlers = [ValidateUserHandler]

const adapters = [MailerAdapter]

@Module({
	imports: [
		CqrsModule,
		UserModule,
		EmailModule,
		TokenModule,
		JwtModule,
		HttpModule
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		AuthRepository,
		...commandHandlers,
		...queryHandlers,
		...adapters
	],
	exports: [AuthService]
})
export class AuthModule {}
