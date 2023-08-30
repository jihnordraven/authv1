import { ApiProperty } from '@nestjs/swagger'

export class RemoveEmailCodeDto {
	@ApiProperty()
	readonly id: string
}
