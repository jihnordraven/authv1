import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindOneTokenByIdQuery } from '../impl'
import { TokenRepository } from '../../token.repository'
import { Token } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

@QueryHandler(FindOneTokenByIdQuery)
export class FindOneTokenByIdHandler
	implements IQueryHandler<FindOneTokenByIdQuery>
{
	constructor(protected readonly tokenRepository: TokenRepository) {}

	async execute({ dto }: FindOneTokenByIdQuery): Promise<Token> {
		const token: Token | null = await this.tokenRepository.findOneById(dto)

		if (!token) throw new NotFoundException('Token not found')

		return token
	}
}
