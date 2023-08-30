import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Query,
	Res,
	UseGuards,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginUserDto, RegisterUserDto } from '@dtos/auth'
import { GoogleGuard, LocalGuard } from '@guards'
import {
	CookieDecorator,
	GooglePayloadDecorator,
	LocalGuardDecorator,
	UserAgentDecorator,
	UserIpDecorator
} from '@decorators'
import { Tokens } from '@types'
import { Response } from 'express'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@constants'
import { HttpService } from '@nestjs/axios'
import { Observable, firstValueFrom, mergeMap } from 'rxjs'
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger'

@ApiTags('auth endpoints')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly httpService: HttpService
	) {}

	@Post('register')
	@HttpCode(HttpStatus.CREATED)
	@UsePipes(new ValidationPipe())
	// swagger
	@ApiBody({ type: RegisterUserDto })
	async register(@Body() dto: RegisterUserDto): Promise<string> {
		return this.authService.register(dto)
	}

	@Post('login')
	@UseGuards(LocalGuard)
	@HttpCode(HttpStatus.OK)
	@UsePipes(new ValidationPipe())
	@ApiBody({ type: LoginUserDto })
	@ApiResponse({
		status: 200,
		description: 'Logged in',
		headers: {
			refresh_token: {
				schema: { type: 'string' },
				description: 'Refresh token in cookie'
			}
		},
		schema: {
			properties: {
				access_token: { type: `string` }
			},
			description: 'Bearer ...'
		}
	})
	@ApiResponse({ status: 401, description: 'Invalid login or password' })
	@ApiResponse({ status: 400, description: 'Invalid credentials' })
	async login(
		@LocalGuardDecorator('id') userId: string,
		@UserAgentDecorator() userAgent: string,
		@UserIpDecorator() userIp: string,
		@Res() res: Response
	): Promise<void> {
		const tokens: Tokens = await this.authService.login({
			userId,
			userAgent,
			userIp
		})
		return await this.setTokensToResponse(tokens, res)
	}

	@Get('new-tokens')
	@HttpCode(HttpStatus.OK)
	async newTokens(
		@CookieDecorator(REFRESH_TOKEN) token: string,
		@UserAgentDecorator() userAgent: string,
		@UserIpDecorator() userIp: string,
		@Res() res: Response
	) {
		const tokens: Tokens = await this.authService.newTokens(
			{
				token,
				userAgent
			},
			userIp
		)
		return await this.setTokensToResponse(tokens, res)
	}

	private async setTokensToResponse(
		{ refreshToken, accessToken }: Tokens,
		res: Response
	): Promise<void> {
		res.cookie(REFRESH_TOKEN, refreshToken.token, {
			httpOnly: true,
			secure: false,
			sameSite: 'lax',
			expires: refreshToken.exp
		})
		res.json({ accessToken })
	}

	@Get('google')
	@UseGuards(GoogleGuard)
	async googleAuth() {}

	@Get('google/callback')
	@UseGuards(GoogleGuard)
	async googleAuthCallback(
		@GooglePayloadDecorator('accessToken') accessToken: string,
		@Res() res: Response
	) {
		return res.redirect(
			`http://localhost:4200/api/auth/google/success?${ACCESS_TOKEN}=${accessToken}`
		)
	}

	@Get('google/success')
	async googleAuthSuccess(
		@Query(ACCESS_TOKEN) accessToken: string,
		@UserAgentDecorator() userAgent: string,
		@UserIpDecorator() userIp: string,
		@Res() res: Response
	) {
		const tokens$: Observable<Tokens> = this.httpService
			.get(
				`https://www.googleapis.com/oauth2/v3/tokeninfo?${ACCESS_TOKEN}=${accessToken}`
			)
			.pipe(
				mergeMap(async ({ data: { email } }) =>
					this.authService.googleRegister(email, userAgent, userIp)
				)
			)
		const tokens: Tokens = await firstValueFrom(tokens$)

		return await this.setTokensToResponse(tokens, res)
	}
}
