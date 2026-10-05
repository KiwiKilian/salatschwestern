import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from '@/health/health.controller';

@Module({
  controllers: [HealthController],
  imports: [TerminusModule, ConfigModule],
})
export class HealthModule {}
