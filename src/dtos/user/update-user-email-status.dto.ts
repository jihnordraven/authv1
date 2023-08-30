import { EmailStatusEnum } from '@prisma/client'

export class UpdateUserEmailStatusDto {
	readonly userId: string
	readonly emailStatusName: EmailStatusEnum
}
