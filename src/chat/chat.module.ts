import { Module } from '@nestjs/common'
import { ChatService } from './chat.service'
import { ChatController } from './chat.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from '../product/entities/product.entity'
import { UserEntity } from '../user/user.entity'

@Module({
	controllers: [ChatController],
	providers: [ChatService],
	exports: [ChatService],
	imports: [TypeOrmModule.forFeature([ProductEntity, UserEntity])]
})
export class ChatModule {}
