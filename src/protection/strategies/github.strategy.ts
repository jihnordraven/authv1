import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { GitHubUser } from '@types'
import { red } from 'colorette'
import { Profile, Strategy } from 'passport-github2'

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy) {
	private readonly logger: Logger = new Logger(GitHubStrategy.name)

	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.get<string>('GITHUB_CLIENT_ID'),
			clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
			callbackURL: 'http://localhost:4200/api/auth/github/callback',
			scope: ['user', 'user:email', 'email']
		})
	}

	async validate(
		accessToken: string,
		refreshToken: string | null,
		profile: Profile,
		done: any
	) {
		try {
			console.log(accessToken, profile)
			const user: GitHubUser = {
				email: profile.emails[0].value,
				firstName: /* profile.name.givenName */ null,
				lastName: /* profile.name.familyName */ null,
				photo: /* profile.photos[0].value */ null,
				accessToken
			}
			done(null, user)
		} catch (error: unknown) {
			done(error)
			this.logger.error(
				red(
					`GitHub Authentication done with an error... Learn more at: ${error}`
				)
			)
		}
	}
}
