import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { FindOneTokenByTokenQuery } from '../impl'
import { TokenRepository } from '../../token.repository'
import { Token } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

@CommandHandler(FindOneTokenByTokenQuery)
export class FindOneTokenByTokenHandler
	implements ICommandHandler<FindOneTokenByTokenQuery>
{
	constructor(protected readonly tokenRepository: TokenRepository) {}

	async execute({ dto }: FindOneTokenByTokenQuery): Promise<Token> {
		const token: Token | null =
			await this.tokenRepository.findOneByToken(dto)

		if (!token) throw new NotFoundException('Token not found')

		return token
	}
}
