import { ApiProperty } from '@nestjs/swagger'

export class VerifyEmailCodeDto {
	@ApiProperty()
	readonly code: string
}
