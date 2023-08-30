import { IsNotEmpty, IsUUID } from 'class-validator'

export class FindOneTokenByTokenDto {
	@IsNotEmpty()
	@IsUUID()
	public readonly token: string
}
