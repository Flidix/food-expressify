import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CurrentUser } from '../auth/decorators/currentUser'
import { RoleGuard } from '../auth/decorators/role.guard'
import { JwtAuthGuard } from '../auth/decorators/auth.decorator'

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get('myProfile/message')
	myMessage(@CurrentUser('id') id: number) {
		return this.userService.myMessage(id)
	}
	@UseGuards(RoleGuard)
	@Put('changeCourier/:id')
	async changeCourier(@Param('id') id: number) {
		return this.userService.changeCourier(id)
	}
	@UseGuards(RoleGuard)
	@Put('changeRole/:id')
	async addRole(@Param('id') id: number) {
		return this.userService.changeRole(id)
	}

	@Get('findOne/:id')
	findOneById(@Param('id') id: number) {
		return this.userService.findOneById(id)
	}

	@Get('myProfile')
	myProfile(@CurrentUser('id') id: number) {
		return this.userService.myProfile(id)
	}
}
