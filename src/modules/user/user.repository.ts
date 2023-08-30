import { Inject, Injectable } from '@nestjs/common'
import { PrismaService } from '@prisma'
import {
	ChangePasswordDto,
	CreateUserDto,
	FindOneUserDto,
	UpdateUserEmailStatusDto
} from '@dtos/user'
import { User } from '@prisma/client'
import { Cache } from 'cache-manager'
import { CACHE_MANAGER } from '@nestjs/cache-manager'

@Injectable()
export class UserRepository {
	constructor(
		private readonly prismaService: PrismaService,
		@Inject(CACHE_MANAGER) private readonly cacheManager: Cache
	) {}

	async create(dto: CreateUserDto): Promise<User> {
		return this.prismaService.user.create({
			data: {
				email: dto.email,
				password: dto.hashPassword,
				roleName: dto.roleName,
				providerName: dto.providerName,
				emailStatusName: dto.emailStatusName
			}
		})
	}

	async findOne({ idOrEmail }: FindOneUserDto): Promise<User | null> {
		return this.prismaService.user.findFirst({
			where: { OR: [{ id: idOrEmail }, { email: idOrEmail }] }
		})
	}

	async updateEmailStatus(dto: UpdateUserEmailStatusDto) {
		return this.prismaService.user.update({
			where: { id: dto.userId },
			data: { emailStatusName: dto.emailStatusName }
		})
	}

	async changePassword(dto: ChangePasswordDto): Promise<any> {
		await this.prismaService.user.update({
			where: { id: dto.userId },
			data: { password: dto.newPassword }
		})
	}
}
