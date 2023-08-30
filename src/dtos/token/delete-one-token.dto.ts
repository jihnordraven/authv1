import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteOneTokenDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly id: string

	@IsNotEmpty()
	@IsUUID()
	public readonly userId: string
}
