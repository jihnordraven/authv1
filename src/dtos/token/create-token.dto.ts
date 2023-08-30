import { ApiProperty } from '@nestjs/swagger'

export class CreateTokenDto {
	@ApiProperty()
	readonly userId: string

	@ApiProperty()
	readonly userAgent: string

	@ApiProperty()
	readonly userIp: string
}
