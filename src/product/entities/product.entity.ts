import { Column, Entity } from 'typeorm'
import { Base } from '../../utils/base'

@Entity('product')
export class ProductEntity extends Base {
	@Column()
	name: string

	@Column()
	avatar: string

	@Column({ default: 0 })
	price: number
}
