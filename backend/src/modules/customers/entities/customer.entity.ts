import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from '../../users/entities/user.entity';

@Entity({ name: 'customers' })
export class CustomerEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity, { eager: true })
  @JoinColumn()
  user: UserEntity;

  @Column({ nullable: true })
  phoneNumber?: string;

  @Column({ nullable: true })
  defaultAddress?: string;

  @Column({ type: 'jsonb', nullable: true })
  preferences?: Record<string, any>;
}
