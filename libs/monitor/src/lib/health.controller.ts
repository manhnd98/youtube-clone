import { Controller, Get, Version } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthCheckResult } from '@nestjs/terminus';

@Controller('health')
export class HealthController {
  constructor(private healthService: HealthService) {}

  @Get()
  @Version('1')
  public async check(): Promise<HealthCheckResult> {
    return await this.healthService.check();
  }
}
