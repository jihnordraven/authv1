import { createTransport, SendMailOptions } from 'nodemailer'
import { SendMailDto } from 'src/dtos/email/send-mail.dto'

export class MailerAdapter {
	private async options(dto: SendMailOptions) {
		const transport = createTransport({
			service: 'gmail',
			auth: {
				user: 'jihnordraven@gmail.com',
				pass: 'htsubscpzoymrwce'
			}
		})

		await transport.sendMail(dto)
	}

	async sendMailCode(dto: SendMailDto) {
		const isSuccess: boolean = Boolean(
			await this.options({
				to: dto.email,
				from: 'Anotn',
				subject: 'Email confirmation',
				html: `<a href='http://localhost:4200/api/email/confirm?code=${dto.emailCode.code}'>Confirm registration</a>`
			})
		)
		console.log('email sent')
		return isSuccess
	}

	async sendMailPass(dto: SendMailDto) {
		await this.options({
			to: dto.email,
			from: 'Anton',
			subject: 'Password recovery confirmation',
			html: `<a href='http://localhost:4200/api/new-password/confirm?code=${dto.emailCode.code}'>Confirm password recovery</a>`
		})
	}
}
