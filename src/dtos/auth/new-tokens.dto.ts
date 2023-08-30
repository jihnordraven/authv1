import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class NewTokensDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly token: string

	@IsNotEmpty()
	readonly userAgent: string
}
