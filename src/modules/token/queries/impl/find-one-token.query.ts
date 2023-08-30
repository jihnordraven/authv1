import { FindOneTokenDto } from 'src/dtos/token'

export class FindOneTokenQuery {
	constructor(public readonly dto: FindOneTokenDto) {}
}
