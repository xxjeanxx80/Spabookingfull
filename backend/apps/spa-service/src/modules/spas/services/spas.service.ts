import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationQueryDto, createPaginatedResponse } from '@app/common';
import { CreateSpaDto } from '../dto/create-spa.dto';
import { UpdateSpaDto } from '../dto/update-spa.dto';
import { SpaEntity } from '../entities/spa.entity';
import { toSpaResponse } from '../response/spa-response.dto';

@Injectable()
export class SpasService {
  private spas: SpaEntity[] = [
    new SpaEntity({
      id: 'spa-1',
      name: 'Saigon Glow',
      description: 'Luxury downtown spa with rooftop pool',
      latitude: 10.7769,
      longitude: 106.7009,
      services: ['Facial', 'Massage', 'Sauna'],
      atHomeAvailable: true,
      approved: true,
    }),
    new SpaEntity({
      id: 'spa-2',
      name: 'Hanoi Calm',
      description: 'Mindful rituals inspired by Vietnamese herbs',
      latitude: 21.0278,
      longitude: 105.8342,
      services: ['Massage', 'Body Scrub'],
      atHomeAvailable: false,
      approved: false,
    }),
  ];

  create(payload: CreateSpaDto) {
    const entity = new SpaEntity({ id: `spa-${Date.now()}`, ...payload, approved: false });
    this.spas.push(entity);
    return toSpaResponse(entity);
  }

  findAll(query: PaginationQueryDto & { atHome?: boolean; approved?: boolean }) {
    const { page = 1, limit = 20, atHome, approved } = query;
    let result = [...this.spas];
    if (typeof atHome === 'boolean') {
      result = result.filter((spa) => spa.atHomeAvailable === atHome);
    }
    if (typeof approved === 'boolean') {
      result = result.filter((spa) => spa.approved === approved);
    }
    const items = result
      .slice((page - 1) * limit, (page - 1) * limit + limit)
      .map(toSpaResponse);
    return createPaginatedResponse(items, result.length, page, limit);
  }

  findNearby(lat: number, lng: number, radiusKm = 10) {
    const filtered = this.spas.filter((spa) => this.distanceKm(lat, lng, spa.latitude, spa.longitude) <= radiusKm);
    return filtered.map(toSpaResponse);
  }

  findOne(id: string) {
    const spa = this.spas.find((item) => item.id === id);
    if (!spa) {
      throw new NotFoundException(`Spa ${id} not found`);
    }
    return toSpaResponse(spa);
  }

  update(id: string, payload: UpdateSpaDto) {
    const spa = this.spas.find((item) => item.id === id);
    if (!spa) {
      throw new NotFoundException(`Spa ${id} not found`);
    }
    Object.assign(spa, payload);
    return toSpaResponse(spa);
  }

  approve(id: string) {
    const spa = this.spas.find((item) => item.id === id);
    if (!spa) {
      throw new NotFoundException(`Spa ${id} not found`);
    }
    spa.approved = true;
    return toSpaResponse(spa);
  }

  private distanceKm(lat1: number, lng1: number, lat2: number, lng2: number) {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
