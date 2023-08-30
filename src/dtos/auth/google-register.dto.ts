import { ApiProperty } from '@nestjs/swagger'

export class GoogleRegisterDto {
	@ApiProperty()
	readonly email: string
}
