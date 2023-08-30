import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteAllTokensCommand } from '../impl'
import { TokenRepository } from '../../token.repository'
import { Token } from '@prisma/client'
import { NotFoundException } from '@nestjs/common'

@CommandHandler(DeleteAllTokensCommand)
export class DeleteAllTokensHandler
	implements ICommandHandler<DeleteAllTokensCommand>
{
	constructor(protected readonly tokenRepository: TokenRepository) {}

	async execute({ dto }: DeleteAllTokensCommand): Promise<string> {
		const tokens: Token[] | null = await this.tokenRepository.deleteAll(dto)

		if (!tokens) throw new NotFoundException(`Tokens weren't found`)

		return 'Tokens deleted successfully'
	}
}
