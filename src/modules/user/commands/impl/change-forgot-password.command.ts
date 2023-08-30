import { ChangeForgotPasswordDto } from '@dtos/user'

export class ChangeForgotPasswordCommand {
	constructor(public readonly dto: ChangeForgotPasswordDto) {}
}
