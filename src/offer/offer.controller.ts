import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common'
import { OfferService } from './offer.service'
import { CreateOfferDto } from './dto/create-offer.dto'
import { CurrentUser } from '../auth/decorators/currentUser'
import { JwtAuthGuard } from '../auth/decorators/auth.decorator'
import { CourierGuard } from '../auth/decorators/courier.guard'
import { ComplateOfferDto } from './dto/complate-offer.dto'

@UseGuards(JwtAuthGuard)
@Controller('offer')
export class OfferController {
	constructor(private readonly offerService: OfferService) {}

	@UseGuards(CourierGuard)
	@Post('completeOffer')
	completeOffer(@CurrentUser('id') id: number, @Body() dto: ComplateOfferDto) {
		return this.offerService.completeOffer(dto, id)
	}
	@UseGuards(CourierGuard)
	@Get()
	findAll() {
		return this.offerService.findAll()
	}
	@Post()
	create(
		@CurrentUser('id') id: number,
		@Body() createOfferDto: CreateOfferDto
	) {
		return this.offerService.create(createOfferDto, id)
	}

	@UseGuards(CourierGuard)
	@Post(':offerId')
	addOfferToMade(
		@CurrentUser('id') id: number,
		@Param('offerId') offerId: number
	) {
		return this.offerService.addOfferToMade(offerId, id)
	}
}
