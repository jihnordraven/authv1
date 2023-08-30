import { FindOneUserDto } from 'src/dtos/user'

export class FindOneUserQuery {
	constructor(public readonly dto: FindOneUserDto) {}
}
