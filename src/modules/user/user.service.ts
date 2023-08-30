import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
	ChangePasswordDto,
	CreateUserDto,
	FindOneUserDto,
	UpdateUserEmailStatusDto
} from '@dtos/user'
import { User } from '@prisma/client'
import { FindOneUserQuery } from './queries/impl'
import {
	ChangePasswordCommand,
	CreateUserCommand,
	UpdateUserEmailStatusCommand
} from './commands/impl'

@Injectable()
export class UserService {
	constructor(
		private readonly queryBus: QueryBus,
		private readonly commandBus: CommandBus
	) {}

	async create(dto: CreateUserDto): Promise<User> {
		return this.commandBus.execute(new CreateUserCommand(dto))
	}

	async findOne(dto: FindOneUserDto): Promise<User | null> {
		return this.queryBus.execute(new FindOneUserQuery(dto))
	}

	async updateEmailStatus(dto: UpdateUserEmailStatusDto) {
		return this.commandBus.execute(new UpdateUserEmailStatusCommand(dto))
	}

	async changePassword(dto: ChangePasswordDto) {
		return this.commandBus.execute(new ChangePasswordCommand(dto))
	}
}
