import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
	@Get()
	async main() {
		return 'Welcome to main endpoint of the application'
	}
}
