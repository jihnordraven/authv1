import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginUserDto {
	@ApiProperty({ example: 'example@gmail.com' })
	@IsEmail()
	readonly email: string

	@ApiProperty({ example: 'password123' })
	@IsNotEmpty()
	readonly password: string
}
