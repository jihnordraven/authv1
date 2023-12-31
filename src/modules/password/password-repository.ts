import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma'
import { v4 } from 'uuid'
import { add } from 'date-fns'
import { ForgotPasswordCode, PasswordCode } from '@prisma/client'
import { FindPasswordCodeDto, RemovePasswordCodeDto } from '@dtos/password'

@Injectable()
export class PasswordRepository {
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

	async findCode(dto: FindPasswordCodeDto): Promise<PasswordCode> {
		return this.prismaService.passwordCode.findUnique({
			where: { code: dto.code }
		})
	}

	async removeCode(dto: RemovePasswordCodeDto): Promise<void> {
		await this.prismaService.passwordCode.delete({
			where: { id: dto.passwordCodeId }
		})
	}

	async createForgotPasswordCode(dto: {
		userId: string
	}): Promise<ForgotPasswordCode> {
		return this.prismaService.forgotPasswordCode.create({
			data: {
				code: v4(),
				exp: add(new Date(), { months: 1 }),
				userId: dto.userId
			}
		})
	}
}
