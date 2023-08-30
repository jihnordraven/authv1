import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { CreateTokenCommand } from '../impl'
import { CreateTokenDto } from 'src/dtos/token'
import { TokenRepository } from '../../token.repository'
import { Token } from '@prisma/client'
import { BadRequestException } from '@nestjs/common'

@CommandHandler(CreateTokenCommand)
export class CreateTokenHandler implements ICommandHandler<CreateTokenCommand> {
	constructor(protected tokenRepository: TokenRepository) {}

	async execute({ dto }: CreateTokenCommand): Promise<any> {
		return this.tokenRepository.create(dto)
	}
}
