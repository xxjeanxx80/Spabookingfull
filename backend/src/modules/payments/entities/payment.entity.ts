import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { BookingEntity } from '../../bookings/entities/booking.entity';

@Entity({ name: 'payments' })
export class PaymentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => BookingEntity, { eager: true })
  booking: BookingEntity;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column({ default: 'stripe' })
  provider: 'stripe' | 'wallet';

  @Column({ default: 'pending' })
  status: 'pending' | 'succeeded' | 'failed';

  @Column({ nullable: true })
  referenceId?: string;

  @CreateDateColumn()
  createdAt: Date;
}
