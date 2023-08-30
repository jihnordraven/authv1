import { RegisterUserDto } from 'src/dtos/auth'

export class RegisterUserCommand {
	constructor(public readonly dto: RegisterUserDto) {}
}
