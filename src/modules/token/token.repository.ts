import { Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma'
import {
	CreateTokenDto,
	DeleteAllTokensDto,
	DeleteOneTokenDto,
	FindAllTokensDto,
	FindOneTokenByIdDto,
	FindOneTokenByTokenDto,
	FindOneTokenDto
} from '@dtos/token'
import { Token } from '@prisma/client'
import { v4 } from 'uuid'
import { add } from 'date-fns'

@Injectable()
export class TokenRepository {
	constructor(private readonly prismaService: PrismaService) {}

	async create(dto: CreateTokenDto): Promise<Token | null> {
		const _token: Token | null = await this.prismaService.token.findFirst({
			where: {
				userId: dto.userId,
				userAgent: dto.userAgent,
				userIp: dto.userIp
			}
		})
		const token: string = _token?.token ?? ''

		return this.prismaService.token.upsert({
			where: { token },
			update: {
				token: v4(),
				exp: add(new Date(), { months: 1 })
			},
			create: {
				token: v4(),
				exp: add(new Date(), { months: 1 }),
				userId: dto.userId,
				userAgent: dto.userAgent,
				userIp: dto.userIp
			}
		})
	}

	async findOneByToken(dto: FindOneTokenByTokenDto): Promise<Token | null> {
		return this.prismaService.token.findUnique({
			where: { token: dto.token }
		})
	}

	async findOneById(dto: FindOneTokenByIdDto): Promise<Token | null> {
		return this.prismaService.token.findUnique({
			where: { id: dto.id, userId: dto.userId }
		})
	}

	async findAll(dto: FindAllTokensDto): Promise<Token[] | null> {
		return this.prismaService.token.findMany({
			where: { userId: dto.userId }
		})
	}

	async deleteOne(dto: DeleteOneTokenDto): Promise<Token | null> {
		return this.prismaService.token.delete({
			where: { id: dto.id, userId: dto.userId }
		})
	}

	async deleteAll(dto: DeleteAllTokensDto): Promise<Token[] | null> {
		return this.prismaService.token.findMany({
			where: { userId: dto.userId }
		})
	}
}
