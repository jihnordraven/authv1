import { Injectable } from '@nestjs/common'
import { GoogleRegisterDto } from '@dtos/auth'

@Injectable()
export class AuthRepository {
	constructor() {}

	async googleRegister(dto: GoogleRegisterDto) {}
}
