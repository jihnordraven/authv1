import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class FindOneTokenDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly token: string
}
