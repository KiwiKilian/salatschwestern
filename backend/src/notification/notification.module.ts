import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NotificationService } from '@/notification/notification.service';
import { Salad } from '@/salads/entities/salad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Salad])],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
