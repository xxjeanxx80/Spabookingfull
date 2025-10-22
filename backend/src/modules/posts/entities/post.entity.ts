import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { SpaEntity } from '../../spas/entities/spa.entity';

@Entity({ name: 'posts' })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => SpaEntity, { eager: true })
  spa: SpaEntity;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  coverImageUrl?: string;

  @Column({ default: true })
  published: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
