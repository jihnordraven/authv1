import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { FindOneUserHandler } from './queries/handlers'
import { CqrsModule } from '@nestjs/cqrs'
import { UserRepository } from './user.repository'
import { CreateUserHandler } from './commands/handlers'
import { UpdateUserEmailStatusHandler } from './commands/handlers'

const commandHandlers = [CreateUserHandler, UpdateUserEmailStatusHandler]
const queryHandlers = [FindOneUserHandler]

@Module({
	imports: [CqrsModule],
	controllers: [UserController],
	providers: [
		UserService,
		UserRepository,
		...queryHandlers,
		...commandHandlers
	],
	exports: [UserService]
})
export class UserModule {}
