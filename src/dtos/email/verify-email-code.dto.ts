import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class VerifyEmailCodeDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly code: string
}
