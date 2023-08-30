import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindAllTokensQuery } from '../impl'
import { TokenRepository } from '../../token.repository'
import { Token } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

@QueryHandler(FindAllTokensQuery)
export class FindAllTokensHandler implements IQueryHandler<FindAllTokensQuery> {
	constructor(protected readonly tokenRepository: TokenRepository) {}

	async execute({ dto }: FindAllTokensQuery): Promise<Token[]> {
		const tokens = await this.tokenRepository.findAll(dto)

		if (!tokens) throw new NotFoundException('Any tokens was not found')

		return tokens
	}
}
