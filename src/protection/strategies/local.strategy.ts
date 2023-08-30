import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { User } from '@prisma/client'
import { Strategy } from 'passport-local'
import { AuthService } from 'src/modules/auth/auth.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
	constructor(private readonly authService: AuthService) {
		super({ usernameField: 'email' })
	}

	async validate(email: string, password: string): Promise<User> {
		const user = await this.authService.validateUser({ email, password })

		if (!user) throw new UnauthorizedException('Something went wrong...')

		return user
	}
}
