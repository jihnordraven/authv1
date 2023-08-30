import { IsNotEmpty } from 'class-validator'

export class NewPasswordDto {
	@IsNotEmpty()
	readonly oldPassword: string

	@IsNotEmpty()
	readonly newPassword: string
}
