import { IsEmail, IsNotEmpty } from 'class-validator'

export class SendForgotPasswordCodeDto {
	@IsNotEmpty()
	@IsEmail()
	public readonly email: string
}
