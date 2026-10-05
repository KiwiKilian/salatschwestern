import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Grocery } from '@/groceries/entities/grocery.entity';
import { GroceriesController } from '@/groceries/groceries.controller';
import { GroceriesService } from '@/groceries/groceries.service';

@Module({
  imports: [TypeOrmModule.forFeature([Grocery])],
  controllers: [GroceriesController],
  providers: [GroceriesService],
})
export class GroceriesModule {}
