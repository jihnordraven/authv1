import { PasswordValidation } from '@validations'
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator'

export class NewPasswordForgotDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly code: string

	@IsNotEmpty()
	@PasswordValidation()
	@MinLength(6)
	@MaxLength(20)
	public readonly newPassword: string
}
