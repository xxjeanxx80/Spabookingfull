import { SpaEntity } from '../entities/spa.entity';

export interface SpaResponseDto {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  services: string[];
  atHomeAvailable: boolean;
  approved: boolean;
  mediaUrl?: string;
}

export const toSpaResponse = (entity: SpaEntity): SpaResponseDto => ({
  id: entity.id,
  name: entity.name,
  description: entity.description,
  latitude: entity.latitude,
  longitude: entity.longitude,
  services: entity.services,
  atHomeAvailable: entity.atHomeAvailable,
  approved: entity.approved,
  mediaUrl: entity.mediaUrl,
});
