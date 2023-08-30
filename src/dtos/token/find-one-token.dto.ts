import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator'

export class FindOneTokenDto {
	@IsOptional()
	@IsUUID()
	public readonly id?: string

	@IsNotEmpty()
	@IsUUID()
	public readonly userId: string
}
