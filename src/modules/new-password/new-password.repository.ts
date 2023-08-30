import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma'
import { v4 } from 'uuid'
import { add } from 'date-fns'
import { PasswordCode } from '@prisma/client'

@Injectable()
export class NewPasswordRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async createCode(userId: string): Promise<PasswordCode> {
		return this.prismaService.passwordCode.create({
			data: {
				code: v4(),
				exp: add(new Date(), { months: 1 }),
				userId: userId
			}
		})
	}
}
