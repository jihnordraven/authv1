import { CreateTokenDto } from 'src/dtos/token'

export class CreateTokenCommand {
	constructor(public readonly dto: CreateTokenDto) {}
}
