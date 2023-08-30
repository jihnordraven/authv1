import { NewPasswordDto } from 'src/dtos/user'

export class NewPasswordCommand {
	constructor(
		public readonly dto: NewPasswordDto,
		public readonly userId: string
	) {}
}
