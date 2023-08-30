import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'
import { cyanBright } from 'colorette'

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
	private logger: Logger = new Logger(PrismaService.name)

	async onModuleInit() {
		await this.$connect()
		this.logger.log(cyanBright('Prisma init successfully'))
	}
}
