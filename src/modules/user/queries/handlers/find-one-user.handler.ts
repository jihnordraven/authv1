import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindOneUserQuery } from '../impl/find-one-user.query'
import { UserRepository } from '../../user.repository'

@QueryHandler(FindOneUserQuery)
export class FindOneUserHandler implements IQueryHandler<FindOneUserQuery> {
	constructor(protected userRepository: UserRepository) {}

	async execute({ dto }: FindOneUserQuery): Promise<any> {
		return this.userRepository.findOne(dto)
	}
}
