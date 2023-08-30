import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { red } from 'colorette'
import { Profile, Strategy } from 'passport-google-oauth20'
import { GoogleUser } from 'src/types'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
	private readonly logger: Logger = new Logger(GoogleStrategy.name)

	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get<string>('GOOGLE_CLIENT_ID'),
			clientSecret: configService.get<string>('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.get<string>('GOOGLE_CALLBACK_URL'),
			scope: ['profile', 'email']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string | null,
		profile: Profile,
		done: any
	) {
		try {
			const user: GoogleUser = {
				email: profile.emails[0].value,
				firstName: profile.name.givenName,
				lastName: profile.name.familyName,
				photo: profile.photos[0].value,
				accessToken
			}
			done(null, user)
		} catch (error: unknown) {
			done(error)
			this.logger.error(
				red(
					`Google Authentication done with an error... Learn more at: ${error}`
				)
			)
		}
	}
}
