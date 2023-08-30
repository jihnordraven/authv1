import { IsNotEmpty, IsOptional } from 'class-validator'

export class GitHubUser {
	@IsNotEmpty()
	readonly email: string

	@IsOptional()
	readonly firstName?: string

	@IsOptional()
	readonly lastName?: string

	@IsOptional()
	readonly photo?: string

	@IsNotEmpty()
	readonly accessToken: string
}
