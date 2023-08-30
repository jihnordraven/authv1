export class SendPasswordCodeCommand {
	constructor(
		public readonly userId: string,
		public readonly email: string
	) {}
}
