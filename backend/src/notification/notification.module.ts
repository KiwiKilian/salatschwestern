import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@nestjs/config';
import { NotificationService } from '@/notification/notification.service';
import { Salad } from '@/salads/entities/salad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salad]), ConfigModule],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
