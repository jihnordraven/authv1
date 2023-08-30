import { EmailStatusEnum, ProvidersEnum, RolesEnum } from '@prisma/client'

export class CreateUserDto {
	readonly email: string
	readonly hashPassword?: string
	readonly roleName: RolesEnum
	readonly providerName: ProvidersEnum
	readonly emailStatusName: EmailStatusEnum
}
