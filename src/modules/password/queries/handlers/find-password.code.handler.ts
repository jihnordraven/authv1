import { IQueryHandler, QueryHandler } from '@nestjs/cqrs'
import { FindPasswordCodeQuery } from '../impl'
import { PasswordCode } from '@prisma/client'
import { NewPasswordRepository } from '../../password-repository'
import { UnauthorizedException } from '@nestjs/common'

@QueryHandler(FindPasswordCodeQuery)
export class FindPasswordCodeHandler
	implements IQueryHandler<FindPasswordCodeQuery>
{
	constructor(protected readonly passwordRepository: NewPasswordRepository) {}

	async execute({ dto }: FindPasswordCodeQuery): Promise<PasswordCode> {
		const passwordCode: PasswordCode | null =
			await this.passwordRepository.findCode(dto)

		if (!passwordCode) throw new UnauthorizedException('Invalid code')

		const isCodeExpired: boolean = new Date(passwordCode.exp) < new Date()

		if (isCodeExpired) {
			await this.passwordRepository.removeCode({
				passwordCodeId: passwordCode.id
			})
			throw new UnauthorizedException('Code expired')
		}

		return passwordCode
	}
}
