import { EmailStatusEnum, ProvidersEnum, RolesEnum } from '@prisma/client'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
	@IsEmail()
	readonly email: string

	@IsString()
	readonly hashPassword?: string

	@IsNotEmpty()
	readonly roleName: RolesEnum

	@IsNotEmpty()
	readonly providerName: ProvidersEnum

	@IsNotEmpty()
	readonly emailStatusName: EmailStatusEnum
}
