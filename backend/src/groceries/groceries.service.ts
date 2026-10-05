import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGroceryDto } from '@/groceries/dto/create-grocery.dto';
import { UpdateGroceryDto } from '@/groceries/dto/update-grocery.dto';
import { Grocery } from '@/groceries/entities/grocery.entity';

@Injectable()
export class GroceriesService {
  constructor(@InjectRepository(Grocery) private groceriesRepository: Repository<Grocery>) {}

  create({ userIds, ...createGroceryDto }: CreateGroceryDto): Promise<Grocery> {
    return this.groceriesRepository.save(
      this.groceriesRepository.create({ ...createGroceryDto, users: userIds.map((id) => ({ id })) }),
    );
  }

  findAll(): Promise<Grocery[]> {
    return this.groceriesRepository.find();
  }

  findOne(id: string): Promise<Grocery> {
    return this.groceriesRepository.findOneOrFail({ where: { id }, relations: { billingPeriod: true, users: true } });
  }

  async update(id: string, { userIds, ...updateGroceryDto }: UpdateGroceryDto): Promise<Grocery> {
    const grocery = await this.findOne(id);

    if (grocery.billingPeriod) {
      throw new ForbiddenException();
    }

    return this.groceriesRepository.save(
      Object.assign(grocery, { ...updateGroceryDto, users: userIds?.map((userId) => ({ id: userId })) }),
    );
  }

  async remove(id: string): Promise<Grocery> {
    const grocery = await this.findOne(id);

    if (grocery.billingPeriod) {
      throw new ForbiddenException();
    }

    return this.groceriesRepository.remove(grocery);
  }
}
