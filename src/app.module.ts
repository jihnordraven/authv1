import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaModule } from './modules/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { EmailModule } from './modules/email/email.module'
import { TokenModule } from './modules/token/token.module'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { NewPasswordModule } from './modules/password/password.module'
import {
	GitHubStrategy,
	GoogleStrategy,
	JwtStrategy,
	LocalStrategy
} from '@strategies'
import { AppController } from './app.controller'
import { ThrottlerModule } from '@nestjs/throttler'
// import { GitHubStrategy } from './protection/strategies/github.strategy'

const strategies = [LocalStrategy, JwtStrategy, GoogleStrategy, GitHubStrategy]

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory: async (configService: ConfigService) => ({
				store: await redisStore({
					socket: {
						host: 'localhost',
						port: 6379
					},
					ttl: 3600
				})
			})
		}),
		PrismaModule,
		AuthModule,
		UserModule,
		EmailModule,
		TokenModule,
		NewPasswordModule
	],
	controllers: [AppController],
	providers: [...strategies]
})
export class AppModule {}
