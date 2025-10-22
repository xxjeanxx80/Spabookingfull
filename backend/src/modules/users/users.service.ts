import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  async create(dto: CreateUserDto) {
    const { password, ...rest } = dto;
    const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
    const entity = this.repository.create({
      ...rest,
      passwordHash,
      roles: rest.roles ?? ['customer']
    });
    const saved = await this.repository.save(entity);
    return saved;
  }

  findAll() {
    return this.repository.find();
  }

  findById(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, dto: UpdateUserDto) {
    const { password, ...rest } = dto as UpdateUserDto & { password?: string };
    const partial: Partial<UserEntity> = { ...rest };
    if (password) {
      partial.passwordHash = await bcrypt.hash(password, 10);
    }
    await this.repository.update(id, partial);
    return this.findById(id);
  }

  async remove(id: string) {
    await this.repository.delete(id);
    return { id };
  }

  async validateCredentials(email: string, password: string) {
    const user = await this.repository.findOne({ where: { email } });
    if (!user || !user.passwordHash) {
      return null;
    }

    const matches = await bcrypt.compare(password, user.passwordHash);
    if (!matches) {
      return null;
    }

    return user;
  }

  async upsertOAuthProfile(payload: any) {
    const existing = await this.repository.findOne({
      where: [
        { oauthProvider: payload.provider, oauthProviderId: payload.providerId },
        { email: payload.email }
      ]
    });

    if (existing) {
      return existing;
    }

    const entity = this.repository.create({
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      oauthProvider: payload.provider,
      oauthProviderId: payload.providerId,
      roles: ['customer']
    });

    return this.repository.save(entity);
  }

  async applyLoyaltyPoints(id: string, delta: number) {
    await this.repository.increment({ id }, 'loyaltyPoints', delta);
    const updated = await this.findById(id);
    if (!updated) {
      return null;
    }

    updated.loyaltyRank = this.calculateRank(updated.loyaltyPoints);
    await this.repository.update(id, { loyaltyRank: updated.loyaltyRank });
    return updated;
  }

  private calculateRank(points: number) {
    if (points >= 1000) return 'diamond';
    if (points >= 500) return 'platinum';
    if (points >= 250) return 'gold';
    if (points >= 100) return 'silver';
    return 'bronze';
  }
}
