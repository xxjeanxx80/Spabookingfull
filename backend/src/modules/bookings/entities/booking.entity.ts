import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { CustomerEntity } from '../../customers/entities/customer.entity';
import { SpaServiceEntity } from '../../spas/entities/spa-service.entity';
import { SpaEntity } from '../../spas/entities/spa.entity';
import { StaffEntity } from '../../staff/entities/staff.entity';

@Entity({ name: 'bookings' })
export class BookingEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => CustomerEntity, { eager: true })
  @JoinColumn()
  customer: CustomerEntity;

  @ManyToOne(() => SpaEntity, { eager: true })
  @JoinColumn()
  spa: SpaEntity;

  @ManyToOne(() => SpaServiceEntity, { eager: true })
  @JoinColumn()
  service: SpaServiceEntity;

  @ManyToOne(() => StaffEntity, { eager: true, nullable: true })
  @JoinColumn()
  staff?: StaffEntity;

  @Column({ type: 'timestamptz' })
  startTime: Date;

  @Column({ type: 'timestamptz' })
  endTime: Date;

  @Column({ default: 'pending' })
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  @Column({ nullable: true })
  couponCode?: string;

  @Column({ type: 'jsonb', nullable: true })
  feedback?: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
