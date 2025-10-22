import { randomUUID } from 'crypto';

export class PostEntity {
  id: string = randomUUID();
  spaId!: string;
  title!: string;
  content!: string;
  tags: string[] = [];
  publishedAt: string = new Date().toISOString();

  constructor(partial: Partial<PostEntity>) {
    Object.assign(this, partial);
  }
}
