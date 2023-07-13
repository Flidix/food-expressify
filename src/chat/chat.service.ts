import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { ref, set, child, get, push } from 'firebase/database'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { firebaseConfig } from '../config/firebase.config'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { Repository } from 'typeorm'
import { OfferEntity } from '../offer/entities/offer.entity'

@Injectable()
export class ChatService {
	private database

	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>
	) {
		const app = initializeApp(firebaseConfig)
		this.database = getDatabase(app)
	}
	async findGroupById(userId: number) {
		const groupSnapshot = await get(ref(this.database, `${userId}`))
		const groupData = groupSnapshot.val()

		if (groupData) {
			return groupData
		} else {
			throw new HttpException('Group not found', HttpStatus.NOT_FOUND)
		}
	}
	async create(user: UserEntity) {
		const groupRef = ref(this.database, `${user.id}`)

		const groupData = {
			messages: []
		}

		const message = {
			fromUser: 'FootExpressify',
			message: 'Welcome to FootExpressify'
		}

		groupData.messages.push(message)

		await set(groupRef, groupData)

		return groupData
	}

	async sendMessage(user: UserEntity, message: string, offer: OfferEntity) {
		const chat = await this.findGroupById(user.id)
		if (chat) {
			const newMessage = {
				fromUser: user,
				offer: offer,
				message: message
			}
			chat.messages.unshift(newMessage)
			const groupRef = ref(this.database, `${user.id}`)
			await set(groupRef, chat)
			return message
		}
	}
}
