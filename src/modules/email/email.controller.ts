import { Controller, Get, Query } from '@nestjs/common'
import { EmailService } from './email.service'
import { VerifyEmailCodeDto } from '@dtos/email'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('email endpoints')
@Controller('email')
export class EmailController {
	constructor(private readonly emailService: EmailService) {}

	@Get('confirm')
	async confirm(@Query() dto: VerifyEmailCodeDto) {
		return this.emailService.verifyEmailCode(dto)
	}
}
