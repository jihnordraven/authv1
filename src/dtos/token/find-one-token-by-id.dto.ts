import { IsNotEmpty, IsUUID } from 'class-validator'

export class FindOneTokenByIdDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly id: string

	@IsNotEmpty()
	@IsUUID()
	public readonly userId: string
}
