import { randomUUID } from 'crypto';

export class SpaEntity {
  id: string = randomUUID();
  name!: string;
  description!: string;
  latitude!: number;
  longitude!: number;
  services: string[] = [];
  atHomeAvailable = false;
  mediaUrl?: string;
  approved = false;

  constructor(partial: Partial<SpaEntity>) {
    Object.assign(this, partial);
  }
}
