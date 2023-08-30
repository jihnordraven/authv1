import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { NewPasswordCommand } from '../impl'
import { UserRepository } from 'src/modules/user/user.repository'
import { User } from '@prisma/client'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { compare, hash } from 'bcrypt'
import { UserService } from 'src/modules/user/user.service'

@CommandHandler(NewPasswordCommand)
export class NewPasswordHandler implements ICommandHandler<NewPasswordCommand> {
	constructor(protected readonly userService: UserService) {}

	async execute({ dto }: NewPasswordCommand): Promise<any> {
		const user: User | null = await this.userService.findOne({
			idOrEmail: dto.code.userId
		})

		if (!user) throw new NotFoundException('User not found')

		const isPasswordsMatching: boolean = await compare(
			user.password,
			dto.oldPassword
		)

		if (!isPasswordsMatching)
			throw new UnauthorizedException('Invalid old password')

		const hashNewPassword: string = await hash(dto.newPassword, 8)

		await this.userService.changePassword({
			userId: user.id,
			newPassword: hashNewPassword
		})
	}
}
