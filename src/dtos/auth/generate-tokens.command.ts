import { ApiProperty } from '@nestjs/swagger'

export class GenerateTokensDto {
	@ApiProperty()
	readonly userId: string

	@ApiProperty()
	readonly userAgent: string

	@ApiProperty()
	readonly userIp: string
}
