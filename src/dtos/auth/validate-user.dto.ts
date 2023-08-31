import { ApiProperty } from '@nestjs/swagger'
import { PasswordValidation } from '@validations'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class ValidateUserDto {
	@ApiProperty()
	@IsEmail()
	readonly email: string

	@ApiProperty()
	@IsNotEmpty()
	@PasswordValidation()
	@MinLength(6)
	@MaxLength(20)
	readonly password: string
}
