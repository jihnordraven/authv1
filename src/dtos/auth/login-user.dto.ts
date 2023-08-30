import { ApiProperty } from '@nestjs/swagger'
import { User } from '@prisma/client'

export class LoginUserDto {
	@ApiProperty({ example: 'example@gmail.com' })
	readonly email: string

	@ApiProperty({ example: 'password123' })
	readonly password: string
}
