import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { ValidateUserQuery } from '../impl'
import { UserService } from 'src/modules/user/user.service'
import { User } from '@prisma/client'
import { UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'

@QueryHandler(ValidateUserQuery)
export class ValidateUserHandler implements IQueryHandler<ValidateUserQuery> {
	constructor(protected userService: UserService) {}

	async execute({ dto }: ValidateUserQuery): Promise<any> {
		const user: User | null = await this.userService.findOne({
			idOrEmail: dto.email
		})

		if (!user) throw new UnauthorizedException('Invalid login or password')

		const isValidPassword: boolean = await compare(
			dto.password,
			user.password
		)

		if (!isValidPassword)
			throw new UnauthorizedException('Invalid login or password')

		return user
	}
}
