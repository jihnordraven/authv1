import { SendForgotPasswordCodeDto } from '@dtos/password'

export class SendForgotPasswordCodeCommand {
	constructor(public readonly dto: SendForgotPasswordCodeDto) {}
}
