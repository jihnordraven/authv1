import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { RegisterUserCommand } from '../impl'
import {
	EmailCode,
	EmailStatusEnum,
	ProvidersEnum,
	RolesEnum,
	User
} from '@prisma/client'
import { UserService } from 'src/modules/user/user.service'
import { BadRequestException, ConflictException } from '@nestjs/common'
import { hash } from 'bcrypt'
import { MailerAdapter } from 'src/adapters'
import { EmailService } from 'src/modules/email/email.service'

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler
	implements ICommandHandler<RegisterUserCommand>
{
	constructor(
		protected userService: UserService,
		protected emailService: EmailService,
		protected mailerAdapter: MailerAdapter
	) {}

	async execute({
		dto: { email, password }
	}: RegisterUserCommand): Promise<any> {
		const isUser: User | null = await this.userService.findOne({
			idOrEmail: email
		})

		if (isUser) throw new ConflictException('Email is already existing')

		const hashPassword: string = await hash(password, 8)

		const user: User | null = await this.userService.create({
			email,
			hashPassword,
			roleName: RolesEnum.USER,
			providerName: ProvidersEnum.LOCAL,
			emailStatusName: EmailStatusEnum.PENDING
		})

		if (!user)
			throw new BadRequestException('Не удалось создать пользователя')

		const emailCode: EmailCode = await this.emailService.createEmailCode({
			userId: user.id
		})

		return this.mailerAdapter.sendMailCode({
			email: user.email,
			emailCode
		})
	}
}
