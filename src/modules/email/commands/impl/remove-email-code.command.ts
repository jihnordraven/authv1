import { RemoveEmailCodeDto } from 'src/dtos/email'

export class RemoveEmailCodeCommand {
	constructor(public readonly dto: RemoveEmailCodeDto) {}
}
