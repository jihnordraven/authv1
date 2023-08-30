import { INestApplication } from '@nestjs/common'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

export const swaggerSetup = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('AUTH API')
		.setDescription('AUTH API description')
		.setVersion('1.0')
		.build()

	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api/swagger', app, document)
}
