import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common'
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { CurrentUser } from '../auth/decorators/currentUser'
import { JwtAuthGuard } from '../auth/decorators/auth.decorator'
import { CourierGuard } from '../auth/decorators/courier.guard'

@UseGuards(JwtAuthGuard)
@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post('completeOffer/:offerId')
  completeOffer(@Param('offerId') offerId: number) {
    return this.offerService.completeOffer(offerId, )
  }
  @UseGuards(CourierGuard)
  @Get()
  findAll() {
    return this.offerService.findAll()
  }
  @Post()
  create(@CurrentUser('id') id: number, @Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto, id);
  }

  @Post(':offerId')
  addOfferToMade(@CurrentUser('id')id: number, @Param('offerId') offerId: number) {
    return this.offerService.addOfferToMade(offerId, id)

  }
}
