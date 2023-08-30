import { FindByEmailCodeDto } from 'src/dtos/email'

export class FindByEmailCodeQuery {
	constructor(public readonly dto: FindByEmailCodeDto) {}
}
