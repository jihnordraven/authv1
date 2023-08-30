import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { PrismaModule } from './modules/prisma/prisma.module'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { EmailModule } from './modules/email/email.module'
import { TokenModule } from './modules/token/token.module'
import { CacheModule } from '@nestjs/cache-manager'
import { redisStore } from 'cache-manager-redis-yet'
import { NewPasswordModule } from './modules/new-password/new-password.module'
import { GoogleStrategy, JwtStrategy, LocalStrategy } from '@strategies'

const strategies = [LocalStrategy, JwtStrategy, GoogleStrategy]

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		CacheModule.registerAsync({
			isGlobal: true,
			useFactory: async (configService: ConfigService) => ({
				store: await redisStore({
					socket: {
						host: /* configService.get<string>('REDIS_HOST') */ 'localhost',
						port: /* configService.get<number>('REDIS_PORT') */ 6379
					},
					ttl: /* configService.get<number>('CACHE_TTL') */ 3600
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
	providers: [...strategies]
})
export class AppModule {}
