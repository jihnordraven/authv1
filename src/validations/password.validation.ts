import {
	registerDecorator,
	ValidationOptions,
	ValidatorConstraint,
	ValidatorConstraintInterface,
	ValidationArguments
} from 'class-validator'

@ValidatorConstraint({ name: 'passwordValidation', async: false })
export class PasswordValidationConstraint
	implements ValidatorConstraintInterface
{
	validate(value: any): boolean {
		if (typeof value !== 'string') {
			return false
		}
		return (
			/[A-Z]/.test(value) &&
			/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value) &&
			value.trim() === value
		)
	}

	defaultMessage(args: ValidationArguments): string {
		return `${args.property} must include at least one uppercase letter, one special character, and not be trimmed`
	}
}

export function PasswordValidation(validationOptions?: ValidationOptions) {
	return function (object: Record<string, any>, propertyName: string) {
		registerDecorator({
			target: object.constructor,
			propertyName: propertyName,
			options: validationOptions,
			constraints: [],
			validator: PasswordValidationConstraint
		})
	}
}
