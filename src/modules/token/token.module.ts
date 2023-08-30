import { Module } from '@nestjs/common'
import { TokenService } from './token.service'
import { TokenController } from './token.controller'
import { CqrsModule } from '@nestjs/cqrs'
import { CreateTokenHandler } from './commands/handlers'
import { TokenRepository } from './token.repository'

const commandHandlers = [CreateTokenHandler]
const queryHandlers = []

@Module({
	imports: [CqrsModule],
	controllers: [TokenController],
	providers: [TokenService, TokenRepository, ...commandHandlers],
	exports: [TokenService]
})
export class TokenModule {}
