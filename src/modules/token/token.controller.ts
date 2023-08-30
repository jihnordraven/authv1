import { Controller } from '@nestjs/common'
import { TokenService } from './token.service'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('token endpoints')
@Controller('token')
export class TokenController {
	constructor(private readonly tokenService: TokenService) {}
}
