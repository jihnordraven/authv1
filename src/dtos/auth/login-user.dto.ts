import { ApiProperty } from '@nestjs/swagger'
import { PasswordValidation } from '@validations'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginUserDto {
	@ApiProperty({ example: 'example@gmail.com' })
	@IsEmail()
	readonly email: string

	@ApiProperty({ example: 'password123' })
	@IsNotEmpty()
	@PasswordValidation()
	@MinLength(6)
	@MaxLength(20)
	readonly password: string
}
