import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class RegisterUserDto {
	@ApiProperty()
	@IsEmail()
	readonly email: string

	@ApiProperty()
	@IsNotEmpty()
	readonly password: string
}
