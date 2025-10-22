import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { OwnerEntity } from '../../owners/entities/owner.entity';

@Entity({ name: 'payouts' })
export class PayoutEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OwnerEntity, { eager: true })
  owner: OwnerEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'pending' })
  status: 'pending' | 'processing' | 'paid' | 'rejected';

  @Column({ nullable: true })
  notes?: string;

  @CreateDateColumn()
  createdAt: Date;
}
