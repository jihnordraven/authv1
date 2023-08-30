import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { TokenController } from './token.controller'
import { CqrsModule } from '@nestjs/cqrs'
import {
	CreateTokenHandler,
	DeleteAllTokensHandler,
	DeleteOneTokenHandler
} from './commands/handlers'
import { TokenRepository } from './token.repository'
import {
	FindAllTokensHandler,
	FindOneTokenByIdHandler,
	FindOneTokenByTokenHandler
} from './queries/handlers'

const commandHandlers = [
	CreateTokenHandler,
	DeleteAllTokensHandler,
	DeleteOneTokenHandler
]
const queryHandlers = [
	FindAllTokensHandler,
	FindOneTokenByTokenHandler,
	FindOneTokenByIdHandler
]

@Module({
	imports: [CqrsModule],
	controllers: [TokenController],
	providers: [
		TokenService,
		TokenRepository,
		...commandHandlers,
		...queryHandlers
	],
	exports: [TokenService]
})
export class TokenModule {}
