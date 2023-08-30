import { VerifyEmailCodeDto } from 'src/dtos/email'

export class VerifyEmailCodeCommand {
	constructor(public readonly dto: VerifyEmailCodeDto) {}
}
