import { GenerateTokensDto } from 'src/dtos/auth'

export class GenerateTokensCommand {
	constructor(public readonly dto: GenerateTokensDto) {}
}
