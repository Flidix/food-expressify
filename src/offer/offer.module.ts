import { Module } from '@nestjs/common'
import { OfferService } from './offer.service'
import { OfferController } from './offer.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from '../product/entities/product.entity'
import { UserEntity } from '../user/user.entity'
import { OfferEntity } from './entities/offer.entity'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '../config/jwtr.config'
import { UserModule } from '../user/user.module'
import { ChatService } from '../chat/chat.service'

@Module({
	controllers: [OfferController],
	providers: [OfferService, ChatService],
	imports: [
		TypeOrmModule.forFeature([ProductEntity, UserEntity, OfferEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule
	]
})
export class OfferModule {}
