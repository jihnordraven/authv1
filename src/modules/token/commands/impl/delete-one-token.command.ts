import { DeleteOneTokenDto } from '@dtos/token'

export class DeleteOneTokenCommand {
	constructor(public readonly dto: DeleteOneTokenDto) {}
}
