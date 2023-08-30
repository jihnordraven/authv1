import { NewTokensDto } from 'src/dtos/auth'

export class ValidateRefreshTokenCommand {
	constructor(public readonly dto: NewTokensDto) {}
}
