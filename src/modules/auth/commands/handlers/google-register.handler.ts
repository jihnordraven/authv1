import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { GoogleRegisterCommand } from '../impl'
import { EmailStatusEnum, ProvidersEnum, RolesEnum, User } from '@prisma/client'
import { BadRequestException, ConflictException } from '@nestjs/common'
import { UserRepository } from 'src/modules/user/user.repository'
import { UserService } from 'src/modules/user/user.service'

@CommandHandler(GoogleRegisterCommand)
export class GoogleRegisterHandler
	implements ICommandHandler<GoogleRegisterCommand>
{
	constructor(protected readonly userService: UserService) {}

	async execute({ dto }: GoogleRegisterCommand): Promise<any> {
		const isUser: User | null = await this.userService.findOne({
			idOrEmail: dto.email
		})

		if (isUser) throw new ConflictException('Email is already existing')

		const user: User | null = await this.userService.create({
			email: dto.email,
			emailStatusName: EmailStatusEnum.CONFIRMED,
			providerName: ProvidersEnum.GOOGLE,
			roleName: RolesEnum.USER
		})

		if (!user)
			throw new BadRequestException('Не удалось создать пользователя')
		console.log(user)
		return user
	}
}
