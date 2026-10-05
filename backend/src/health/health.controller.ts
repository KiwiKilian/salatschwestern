import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, TypeOrmHealthIndicator } from '@nestjs/terminus';

@ApiTags('Health')
@Controller('health')
export class HealthController {
  constructor(private healthCheckService: HealthCheckService, private typeOrmHealthIndicator: TypeOrmHealthIndicator) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([() => this.typeOrmHealthIndicator.pingCheck('postgres')]);
  }
}
