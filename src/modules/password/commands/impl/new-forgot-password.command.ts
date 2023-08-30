import { ForgotPasswordCode } from '@prisma/client'

export class NewForgotPasswordCommand {
	constructor(
		public readonly dto: { code: ForgotPasswordCode; newPassword: string }
	) {}
}
