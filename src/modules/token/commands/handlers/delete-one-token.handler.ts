import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteOneTokenCommand } from '../impl'
import { Token } from '@prisma/client'
import { TokenRepository } from '../../token.repository'
import { NotFoundException } from '@nestjs/common'

@CommandHandler(DeleteOneTokenCommand)
export class DeleteOneTokenHandler
	implements ICommandHandler<DeleteOneTokenCommand>
{
	constructor(protected readonly tokenRepository: TokenRepository) {}

	async execute({ dto }: DeleteOneTokenCommand): Promise<string> {
		const token: Token | null = await this.tokenRepository.deleteOne(dto)

		if (!token) throw new NotFoundException('Token not found')

		return 'Token deleted successfully'
	}
}
