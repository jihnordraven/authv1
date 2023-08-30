import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class FindByEmailCodeDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly code: string
}
