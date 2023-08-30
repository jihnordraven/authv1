import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class GoogleRegisterDto {
	@ApiProperty()
	@IsEmail()
	readonly email: string
}
