import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'media_assets' })
export class MediaEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  url: string;

  @Column()
  ownerId: string;

  @Column()
  ownerType: string;

  @Column({ nullable: true })
  altText?: string;

  @CreateDateColumn()
  createdAt: Date;
}
