import {CanActivate, ExecutionContext, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../../user/user.entity'
import { Repository } from 'typeorm'
@Injectable()
export class RoleGuard implements  CanActivate{
	constructor(
		@InjectRepository(UserEntity) private readonly userRepository :Repository<UserEntity>,
		private jwtService: JwtService) {
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest()
		try {
			const authHeader = req.headers.authorization
			const bearer = authHeader.split(' ')[0]
			const token = authHeader.split(' ')[1]
			if(bearer !== 'Bearer' || !token){
				throw new UnauthorizedException({message: 'користувач не авторизований'})
			}
			const {id} = this.jwtService.verify(token)
			const user = await this.userRepository.findOneById(id)
			if (user.admin !== false){
				return true
			}
		}catch (e){
			throw  new UnauthorizedException("користувач не авторизований")

		}
	}

}