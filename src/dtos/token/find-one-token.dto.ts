import { ApiProperty } from '@nestjs/swagger'

export class FindOneTokenDto {
	@ApiProperty()
	readonly token: string
}
