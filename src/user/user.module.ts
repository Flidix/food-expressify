import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { ProductEntity } from '../product/entities/product.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '../config/jwtr.config'
import { ChatService } from '../chat/chat.service'

@Module({
	controllers: [UserController],
	providers: [UserService, ChatService],
	imports: [
		TypeOrmModule.forFeature([ProductEntity, UserEntity]),

		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	],
	exports: [UserService]
})
export class UserModule {}
