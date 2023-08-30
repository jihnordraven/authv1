import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { FindOneTokenQuery } from '../impl'
import { TokenRepository } from '../../token.repository'

@CommandHandler(FindOneTokenQuery)
export class FindOneTokenHandler implements ICommandHandler<FindOneTokenQuery> {
	constructor(protected readonly tokenRepository: TokenRepository) {}

	async execute({ dto }: FindOneTokenQuery): Promise<any> {
		return this.tokenRepository.findOne(dto)
	}
}
