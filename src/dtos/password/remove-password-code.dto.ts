import { IsNotEmpty, IsUUID } from 'class-validator'

export class RemovePasswordCodeDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly passwordCodeId: string
}
