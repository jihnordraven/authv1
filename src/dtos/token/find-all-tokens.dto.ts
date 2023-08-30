import { IsNotEmpty, IsUUID } from 'class-validator'

export class FindAllTokensDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly userId: string
}
