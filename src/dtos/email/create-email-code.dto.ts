import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class CreateEmailCodeDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly userId: string
}
