import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SpaEntity } from '../../spas/entities/spa.entity';

@Entity({ name: 'staff_members' })
export class StaffEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'simple-array', default: '' })
  skills: string[];

  @Column({ type: 'jsonb', nullable: true })
  workShifts?: Record<string, any>;

  @Column({ type: 'jsonb', nullable: true })
  timeOff?: Record<string, any>;

  @ManyToOne(() => SpaEntity, (spa) => spa.services, { eager: true })
  spa: SpaEntity;
}
