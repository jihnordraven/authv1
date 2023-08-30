import { ApiProperty } from '@nestjs/swagger'

export class FindByEmailCodeDto {
	@ApiProperty()
	readonly code: string
}
