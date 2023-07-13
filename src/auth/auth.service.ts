import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { AuthDto } from './auth-dto'
import { compare, hash, genSalt } from 'bcryptjs'
import { ChatService } from '../chat/chat.service'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(UserEntity)
		private readonly userRepository: Repository<UserEntity>,

		private readonly chatService: ChatService,
		private readonly jwtService: JwtService
	) {}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)

		return {
			user: { id: user.id, email: user.email },
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async register(dto: AuthDto) {
		const oldUser = await this.userRepository.findOneBy({ email: dto.email })
		if (oldUser) throw new BadRequestException('email зайнятий')

		const salt = await genSalt(10)

		const newUser = await this.userRepository.create({
			...dto,
			password: await hash(dto.password, salt)
		})
		const user = await this.userRepository.save(newUser)
		await this.chatService.create(user)
		await this.userRepository.save(user)

		return {
			user: {
				id: user.id,
				email: user.email,
				name: user.name,
				telephoneNumber: user.telephoneNumber
			},
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userRepository.findOne({
			where: { email: dto.email },
			select: ['id', 'email', 'password'] // Додайте поле "password" для перевірки пароля
		})
		if (!user) throw new NotFoundException('not found')

		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('неправильний пароль')

		return user
	}

	async issueAccessToken(userId: number) {
		const data = {
			id: userId
		}
		return await this.jwtService.signAsync(data, {
			expiresIn: '31d'
		})
	}
}
