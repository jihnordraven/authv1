import { ValidateUserDto } from 'src/dtos/auth'

export class ValidateUserQuery {
	constructor(public readonly dto: ValidateUserDto) {}
}
