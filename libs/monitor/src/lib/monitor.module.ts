import { Module } from '@nestjs/common';
import { HealthService } from './health.service';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { MetricsController } from './metrics.controller';
import { MetricsService } from './metrics.service';
import {PrometheusModule} from "@youtube-clone/prometheus";

@Module({
  imports: [TerminusModule, PrometheusModule],
  controllers: [HealthController, MetricsController],
  providers: [HealthService, MetricsService],
  exports: [HealthService],
})
export class MonitorModule {}
