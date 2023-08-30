import { NewPasswordDto } from '@dtos/password'
import { PasswordCode } from '@prisma/client'

export class NewPasswordCommand {
	constructor(
		public readonly dto: {
			code: PasswordCode
			oldPassword: string
			newPassword: string
		}
	) {}
}
