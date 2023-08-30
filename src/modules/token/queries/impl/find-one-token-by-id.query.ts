import { FindOneTokenByIdDto } from '@dtos/token'

export class FindOneTokenByIdQuery {
	constructor(public readonly dto: FindOneTokenByIdDto) {}
}
