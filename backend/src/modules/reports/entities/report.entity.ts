import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'reports' })
export class ReportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reporterId: string;

  @Column()
  subjectId: string;

  @Column()
  subjectType: string;

  @Column('text')
  description: string;

  @Column({ default: 'open' })
  status: 'open' | 'in_review' | 'resolved';

  @CreateDateColumn()
  createdAt: Date;
}
