import { Module } from '@nestjs/common'
import { ProductService } from './product.service'
import { ProductController } from './product.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductEntity } from './entities/product.entity'
import { FileModule } from '../file/file.module'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { getJwtConfig } from '../config/jwtr.config'
import { UserEntity } from '../user/user.entity'

@Module({
	controllers: [ProductController],
	providers: [ProductService],
	imports: [
		FileModule,
		TypeOrmModule.forFeature([ProductEntity, UserEntity]),
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class ProductModule {}
