import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Base } from '../../utils/base'
import { UserEntity } from '../../user/user.entity'

@Entity('Offer')
export class OfferEntity extends Base {

	@Column()
	address: string

	@Column({default: false})
	made: boolean

	@Column('jsonb', { default: []})
	products: any[];


	@OneToOne(() => UserEntity)
	fromUser: UserEntity

	@ManyToOne(() => UserEntity, (user) => user.offers)
	@JoinColumn()
	courier: UserEntity | null;



}
