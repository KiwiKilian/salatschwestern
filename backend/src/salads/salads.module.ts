import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationModule } from '@/notification/notification.module';
import { Salad } from '@/salads/entities/salad.entity';
import { SaladsController } from '@/salads/salads.controller';
import { SaladsService } from '@/salads/salads.service';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salad, User]), NotificationModule],
  controllers: [SaladsController],
  providers: [SaladsService],
})
export class SaladsModule {}
