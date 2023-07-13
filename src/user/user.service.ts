import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { identity } from 'rxjs'

@Injectable()
export class UserService {
	constructor(@InjectRepository(UserEntity) private readonly userRepository :Repository<UserEntity>,) {
	}

	async addRole(id: number){
		const user = await this.userRepository.findOneById(id)
		user.admin = true
		await this.userRepository.save(user)
		return true
	}
	async deleteRole(id: number){
		const user = await this.userRepository.findOneById(id)
		user.admin = false
		await this.userRepository.save(user)
		return false
	}


	async findOneById(id: number){
		return await this.userRepository.findOneById(id)
	}

	async changeCourier(id: number){
		const user = await this.userRepository.findOneById(id)
		if (user.courier === true){
			user.courier = false
			await this.userRepository.save(user)
			return false
		}else{
			user.courier = true
			await this.userRepository.save(user)
			return true
		}
	}

	async myProfile(id: number){
		return await this.userRepository.findOne({where: {id},
		relations:{
			offers: true
		}})
	}

	async findOne(id: number){
		return await this.userRepository.findOne({
			where: {id},
			relations: {
				offers: true
			}
		})
	}
}
