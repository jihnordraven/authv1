import { CreateEmailCodeDto } from 'src/dtos/email'

export class CreateEmailCodeCommand {
	constructor(public readonly dto: CreateEmailCodeDto) {}
}
