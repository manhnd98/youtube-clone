import {Injectable, Logger} from '@nestjs/common';
import { HealthIndicator } from './health-indicator/health-indicator.interface';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';
import { PrometheusService } from '@youtube-clone/prometheus';
import { CustomHttpHealthIndicator } from './health-indicator/custom-http-health.indicator';

@Injectable()
export class HealthService {
  private readonly listOfThingsToMonitor: HealthIndicator[];

  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private promClientService: PrometheusService
  ) {
    this.listOfThingsToMonitor = [
      new CustomHttpHealthIndicator(
        this.http,
        'https://docs.nestjs.com',
        this.promClientService,
        "Docs_NestJS"
      ),
    ];
  }

  @HealthCheck()
  public async check(): Promise<HealthCheckResult> {
    return await this.health.check(
      this.listOfThingsToMonitor.map(
        (apiIndicator: HealthIndicator) => async () => {
          try {
            return await apiIndicator.isHealthy();
          } catch (e) {
            Logger.warn(e);
            return apiIndicator.reportUnhealthy();
          }
        }
      )
    );
  }
}
