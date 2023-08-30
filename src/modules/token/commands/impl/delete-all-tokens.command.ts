import { DeleteAllTokensDto } from '@dtos/token'

export class DeleteAllTokensCommand {
	constructor(public readonly dto: DeleteAllTokensDto) {}
}
