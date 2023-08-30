import { INestApplication, Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

import { blue, bold, red } from 'colorette'
import { ConfigService } from '@nestjs/config'
import * as cookieParser from 'cookie-parser'
import { swaggerSetup } from './utils'

const bootstrap = async () => {
	const logger: Logger = new Logger('bootstrap')

	try {
		const app = await NestFactory.create<INestApplication>(AppModule)
		app.setGlobalPrefix('api')
		app.use(cookieParser())
		app.enableCors()
		swaggerSetup(app)

		const configService = app.get(ConfigService) as ConfigService
		const PORT: number = configService.get<number>('PORT')
		const HOST: string = configService.get<string>('HOST')

		await app.listen(PORT)
		logger.log(blue(bold(`Server is running on ${HOST}:${PORT}`)))
	} catch (error: unknown) {
		logger.error(red(`Something went wrong... Learn more at: ${error}`))
	}
}

bootstrap()
