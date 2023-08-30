import { IsNotEmpty, IsUUID } from 'class-validator'

export class DeleteAllTokensDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly userId: string
}
