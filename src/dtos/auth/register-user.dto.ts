import { ApiProperty } from '@nestjs/swagger'

export class RegisterUserDto {
	@ApiProperty()
	readonly email: string

	@ApiProperty()
	readonly password: string
}
