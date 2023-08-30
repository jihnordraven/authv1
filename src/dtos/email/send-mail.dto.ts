import { ApiProperty } from '@nestjs/swagger'
import { EmailCode } from '@prisma/client'

export class SendMailDto {
	@ApiProperty()
	readonly email: string

	@ApiProperty()
	readonly emailCode: EmailCode
}
