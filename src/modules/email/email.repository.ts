import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma'

import { v4 } from 'uuid'
import { add } from 'date-fns'
import {
	CreateEmailCodeDto,
	FindByEmailCodeDto,
	RemoveEmailCodeDto
} from '@dtos/email'
import { EmailCode } from '@prisma/client'

@Injectable()
export class EmailRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async createEmailCode(dto: CreateEmailCodeDto): Promise<EmailCode> {
		return this.prismaService.emailCode.create({
			data: {
				code: v4(),
				exp: add(new Date(), { months: 1 }),
				userId: dto.userId
			}
		})
	}

	async findByEmailCode(dto: FindByEmailCodeDto): Promise<EmailCode> {
		return this.prismaService.emailCode.findUnique({
			where: { code: dto.code }
		})
	}

	async removeEmailCode(dto: RemoveEmailCodeDto): Promise<EmailCode | null> {
		return this.prismaService.emailCode.delete({ where: { id: dto.id } })
	}
}
