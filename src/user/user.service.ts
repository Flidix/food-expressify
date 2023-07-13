import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { ChatService } from '../chat/chat.service'

@Injectable()
export class UserService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,

		private readonly chatService: ChatService
	) {}

	async changeRole(id: number) {
		const user = await this.userRepository.findOneById(id)
		user.admin = !user.admin
		await this.userRepository.save(user)
		return !user.admin
	}

	async findOneById(id: number) {
		return await this.userRepository.findOneById(id)
	}

	async changeCourier(id: number) {
		const user = await this.userRepository.findOneById(id)
		user.courier = !user.courier
		await this.userRepository.save(user)
		return !user.courier
	}

	async myProfile(id: number) {
		return await this.userRepository.findOne({
			where: { id },
			relations: {
				offers: true
			}
		})
	}

	async myMessage(id: number) {
		const messages = await this.chatService.findGroupById(id)
		return messages
	}

	async findOne(id: number) {
		return await this.userRepository.findOne({
			where: { id },
			relations: {
				offers: true
			}
		})
	}
}
