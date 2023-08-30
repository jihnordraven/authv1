import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateTokenDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly userId: string

	@ApiProperty()
	@IsNotEmpty()
	readonly userAgent: string

	@ApiProperty()
	@IsNotEmpty()
	readonly userIp: string
}
