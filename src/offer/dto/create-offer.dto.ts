import { IsString } from 'class-validator'

export class CreateOfferDto {

	@IsString()
	readonly address: string

	readonly products: number[]
}
