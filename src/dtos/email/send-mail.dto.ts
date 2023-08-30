import { ApiProperty } from '@nestjs/swagger'
import { EmailCode } from '@prisma/client'
import { IsNotEmpty } from 'class-validator'

export class SendMailDto {
	@ApiProperty()
	@IsNotEmpty()
	readonly email: string

	@ApiProperty()
	@IsNotEmpty()
	readonly emailCode: EmailCode
}
