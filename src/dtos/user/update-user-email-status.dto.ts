import { EmailStatusEnum } from '@prisma/client'
import { IsNotEmpty } from 'class-validator'

export class UpdateUserEmailStatusDto {
	@IsNotEmpty()
	readonly userId: string

	@IsNotEmpty()
	readonly emailStatusName: EmailStatusEnum
}
