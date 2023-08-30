import { UpdateUserEmailStatusDto } from 'src/dtos/user'

export class UpdateUserEmailStatusCommand {
	constructor(public readonly dto: UpdateUserEmailStatusDto) {}
}
