import { IsNotEmpty, IsUUID } from 'class-validator'

export class FindPasswordCodeDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly code: string
}
