import { ApiProperty } from '@nestjs/swagger'

export class CreateEmailCodeDto {
	@ApiProperty()
	readonly userId: string
}
