import { PasswordValidation } from '@validations'
import {
	IsNotEmpty,
	IsString,
	IsUUID,
	MaxLength,
	MinLength
} from 'class-validator'

export class NewPasswordDto {
	@IsString()
	@IsUUID()
	public readonly code: string

	@IsNotEmpty()
	@IsNotEmpty()
	public readonly oldPassword: string

	@IsNotEmpty()
	@PasswordValidation()
	@MinLength(6)
	@MaxLength(20)
	public readonly newPassword: string
}
