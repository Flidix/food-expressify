import { Column, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { Base } from '../utils/base';
import { OfferEntity } from '../offer/entities/offer.entity'

@Entity('User')
export class UserEntity extends Base {
    @Column({ unique: true })
    email: string;

    @Column({unique: true})
    telephoneNumber: string

    @Column({ select: false })
    password: string;

    @Column({ default: '' })
    name: string;

    @Column({ default: false })
    courier: boolean;

    @Column({ default: false })
    admin: boolean;

    @OneToMany(() => OfferEntity, (offer) => offer.courier, )
    offers: OfferEntity[]

}
