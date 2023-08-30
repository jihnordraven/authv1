import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateTokenCommand } from '../impl'
import { TokenRepository } from '../../token.repository'
import { Token } from '@prisma/client'
import { BadRequestException } from '@nestjs/common'

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
	constructor(protected tokenRepository: TokenRepository) {}

	async execute({ dto }: CreateTokenCommand): Promise<Token> {
		const token = await this.tokenRepository.create(dto)

		if (!token) throw new BadRequestException('Failed to create token')

		return token
	}
}
