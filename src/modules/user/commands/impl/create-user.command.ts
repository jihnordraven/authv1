import { CreateUserDto } from 'src/dtos/user'

export class CreateUserCommand {
	constructor(public readonly dto: CreateUserDto) {}
}
