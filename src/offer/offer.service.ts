import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { CreateOfferDto } from './dto/create-offer.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from '../user/user.entity'
import { Repository } from 'typeorm'
import { OfferEntity } from './entities/offer.entity'
import { ProductEntity } from '../product/entities/product.entity'
import { UserService } from '../user/user.service'

@Injectable()
export class OfferService {

	constructor(
		@InjectRepository(UserEntity) private readonly userRepository :Repository<UserEntity>,
		@InjectRepository(OfferEntity) private readonly offerRepository :Repository<OfferEntity>,
		@InjectRepository(ProductEntity) private readonly productRepository :Repository<ProductEntity>,

		private readonly userService: UserService

	) {}

	async create(dto: CreateOfferDto, id: number) {
		const user = await this.userRepository.findOneById(id)
		const products = []
		for (let i = 0; i < dto.products.length; i++) {
			const product = await this.productRepository.findOneById(dto.products[i])
			products.push(product)
		}
		return await this.offerRepository.save({
			...dto,
			user,
			products
		})
	}

	async findAll() {
		return await this.offerRepository.find({ where: { made: false } });
	}

	async addOfferToMade(offerId: number, id: number) {
		const user = await this.userService.findOne(id)
		const offer = await this.offerRepository.findOneById(offerId);
		if (offer.made === true) {
			throw new HttpException('Offer already made', HttpStatus.BAD_REQUEST);
		}
		offer.made = true;
		user.offers.unshift(offer);
		await this.userRepository.save(user);
		return await this.offerRepository.save(offer);
	}

	async completeOffer(offerId: number){
		const offer = await this.offerRepository.findOneById(offerId);
		await this.offerRepository.remove(offer);
		return true
	}

}
