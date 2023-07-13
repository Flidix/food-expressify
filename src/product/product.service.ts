import { Injectable } from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { ProductEntity } from './entities/product.entity'
import { Repository } from 'typeorm'
import { FileService, FileTypes } from '../file/file.service'

@Injectable()
export class ProductService {
	constructor(
		@InjectRepository(ProductEntity)
		private readonly userRepository: Repository<ProductEntity>,
		private fileService: FileService
	) {}

	async create(dto: CreateProductDto, avatar) {
		const avatarPath = this.fileService.createFile(FileTypes.AVATAR, avatar)

		return await this.userRepository.save({ ...dto, avatar: avatarPath })
	}
}
