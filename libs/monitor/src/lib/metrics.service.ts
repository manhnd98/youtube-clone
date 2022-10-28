import { Injectable } from '@nestjs/common';
import {PrometheusService} from "@youtube-clone/prometheus";
import {HealthService} from "./health.service";

@Injectable()
export class MetricsService {

  public get metrics(): Promise<string> {
    this.healthService.check();
    return this.promClientService.metrics;
  }

  constructor(
    private promClientService: PrometheusService,
    private healthService: HealthService
  ) {}

}
