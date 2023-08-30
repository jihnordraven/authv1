import { ChangePasswordDto } from '@dtos/user'

export class ChangePasswordCommand {
	constructor(public readonly dto: ChangePasswordDto) {}
}
