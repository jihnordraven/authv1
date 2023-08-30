import { CommandBus, QueryBus } from '@nestjs/cqrs'
import { Injectable } from '@nestjs/common'
import {
	CreateEmailCodeDto,
	FindByEmailCodeDto,
	RemoveEmailCodeDto,
	VerifyEmailCodeDto
} from '@dtos/email'
import {
	CreateEmailCodeCommand,
	RemoveEmailCodeCommand,
	VerifyEmailCodeCommand
} from './commands/impl'
import { EmailCode } from '@prisma/client'
import { FindByEmailCodeQuery } from './queries/impl'

@Injectable()
export class EmailService {
	constructor(
		private readonly commandBus: CommandBus,
		private readonly queryBus: QueryBus
	) {}

	async createEmailCode(dto: CreateEmailCodeDto): Promise<EmailCode> {
		return this.commandBus.execute(new CreateEmailCodeCommand(dto))
	}

	async findByEmailCode(dto: FindByEmailCodeDto): Promise<EmailCode> {
		return this.queryBus.execute(new FindByEmailCodeQuery(dto))
	}

	async verifyEmailCode(dto: VerifyEmailCodeDto) {
		return this.commandBus.execute(new VerifyEmailCodeCommand(dto))
	}

	async removeEmailCode(dto: RemoveEmailCodeDto) {
		return this.commandBus.execute(new RemoveEmailCodeCommand(dto))
	}
}
