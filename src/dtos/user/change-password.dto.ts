import { PasswordValidation } from '@validations'
import { IsNotEmpty, IsUUID, MaxLength, MinLength } from 'class-validator'

export class ChangePasswordDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly userId: string

	@IsNotEmpty()
	@PasswordValidation()
	@MinLength(6)
	@MaxLength(20)
	public readonly newPassword: string
}
