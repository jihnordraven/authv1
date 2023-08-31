import { ApiProperty } from '@nestjs/swagger'
import { IsIP, IsNotEmpty, IsUUID } from 'class-validator'

export class GenerateTokensDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsUUID()
	readonly userId: string

	@ApiProperty()
	@IsNotEmpty()
	readonly userAgent: string

	@ApiProperty()
	@IsNotEmpty()
	@IsIP()
	readonly userIp: string
}
