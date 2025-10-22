import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SpaEntity } from './spa.entity';

@Entity({ name: 'spa_services' })
export class SpaServiceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column('int')
  durationMinutes: number;

  @Column({ default: false })
  availableAtHome: boolean;

  @ManyToOne(() => SpaEntity, (spa) => spa.services)
  spa: SpaEntity;
}
