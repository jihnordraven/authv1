import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { CreateTokenDto, FindOneTokenDto } from '@dtos/token'
import { CreateTokenCommand } from './commands/impl'
import { FindOneTokenQuery } from './queries/impl'
import { Token } from '@prisma/client'

@Injectable()
export class TokenService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	async create(dto: CreateTokenDto): Promise<Token> {
		return this.commandBus.execute(new CreateTokenCommand(dto))
	}

	async findOne(dto: FindOneTokenDto): Promise<Token | null> {
		return this.queryBus.execute(new FindOneTokenQuery(dto))
	}
}
