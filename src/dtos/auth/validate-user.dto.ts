import { ApiProperty } from '@nestjs/swagger'

export class ValidateUserDto {
	@ApiProperty()
	readonly email: string

	@ApiProperty()
	readonly password: string
}
