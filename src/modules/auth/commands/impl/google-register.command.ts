import { GoogleRegisterDto } from 'src/dtos/auth'

export class GoogleRegisterCommand {
	constructor(public readonly dto: GoogleRegisterDto) {}
}
