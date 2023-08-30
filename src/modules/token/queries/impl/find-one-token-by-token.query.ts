import { FindOneTokenByTokenDto } from '@dtos/token'

export class FindOneTokenByTokenQuery {
	constructor(public readonly dto: FindOneTokenByTokenDto) {}
}
