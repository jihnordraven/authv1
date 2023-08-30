import { Injectable } from '@nestjs/common'
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
	CreateTokenDto,
	DeleteAllTokensDto,
	DeleteOneTokenDto,
	FindAllTokensDto,
	FindOneTokenByIdDto,
	FindOneTokenByTokenDto
} from '@dtos/token'
import {
	CreateTokenCommand,
	DeleteAllTokensCommand,
	DeleteOneTokenCommand
} from './commands/impl'
import {
	FindAllTokensQuery,
	FindOneTokenByIdQuery,
	FindOneTokenByTokenQuery
} from './queries/impl'
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

	async findOneByToken(dto: FindOneTokenByTokenDto): Promise<Token> {
		return this.queryBus.execute(new FindOneTokenByTokenQuery(dto))
	}

	async findOneById(dto: FindOneTokenByIdDto): Promise<Token> {
		return this.queryBus.execute(new FindOneTokenByIdQuery(dto))
	}

	async findAll(dto: FindAllTokensDto): Promise<Token[]> {
		return this.queryBus.execute(new FindAllTokensQuery(dto))
	}

	async deleteOne(dto: DeleteOneTokenDto): Promise<void> {
		await this.commandBus.execute(new DeleteOneTokenCommand(dto))
	}

	async deleteAll(dto: DeleteAllTokensDto): Promise<void> {
		await this.commandBus.execute(new DeleteAllTokensCommand(dto))
	}
}
