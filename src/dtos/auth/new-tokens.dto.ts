import { ApiProperty } from '@nestjs/swagger'

export class NewTokensDto {
	@ApiProperty()
	readonly token: string

	readonly userAgent: string
}
