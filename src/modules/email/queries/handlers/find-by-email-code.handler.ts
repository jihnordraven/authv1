import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindByEmailCodeQuery } from '../impl'

@QueryHandler(FindByEmailCodeQuery)
export class FindByEmailCodeHandler
	implements IQueryHandler<FindByEmailCodeQuery>
{
	async execute(query: FindByEmailCodeQuery): Promise<any> {}
}
