import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsUUID } from 'class-validator'

export class NewTokensDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	readonly token: string

	@IsNotEmpty()
	readonly userAgent: string
}
