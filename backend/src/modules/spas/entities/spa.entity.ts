import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { OwnerEntity } from '../../owners/entities/owner.entity';
import { SpaServiceEntity } from './spa-service.entity';

@Entity({ name: 'spas' })
export class SpaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('double precision')
  latitude: number;

  @Column('double precision')
  longitude: number;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column({ default: false })
  approved: boolean;

  @ManyToOne(() => OwnerEntity, { eager: true })
  @JoinColumn()
  owner: OwnerEntity;

  @OneToMany(() => SpaServiceEntity, (service) => service.spa, { cascade: true })
  services: SpaServiceEntity[];
}
