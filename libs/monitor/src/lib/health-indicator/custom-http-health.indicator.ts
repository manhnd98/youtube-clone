import { HealthIndicatorResult, HttpHealthIndicator } from '@nestjs/terminus';
import { BaseHealthIndicator } from './base-health.indicator';
import { HealthIndicator } from './health-indicator.interface';
import { PrometheusService } from '@youtube-clone/prometheus';
import { Inject } from '@angular/core';

export class CustomHttpHealthIndicator
  extends BaseHealthIndicator
  implements HealthIndicator
{
  public name = 'Http';

  protected readonly help = 'Status of ' + this.name;

  protected readonly promClientService: PrometheusService | undefined;

  private readonly url: string;

  private readonly httpHealthIndicator: HttpHealthIndicator;

  constructor(
    httpHealthIndicator: HttpHealthIndicator,
    url: string | undefined,
    promClientService?: PrometheusService,
    httpHealthName = "Health"
  ) {
    super();

    this.name = httpHealthName

    this.httpHealthIndicator = httpHealthIndicator;
    this.promClientService = promClientService;
    this.url = url || '';

    this.registerGauges();
  }

  public async isHealthy(): Promise<HealthIndicatorResult> {
    if (this.isDefined(this.url)) {
      const result: Promise<HealthIndicatorResult> =
        this.httpHealthIndicator.pingCheck(this.name, this.url);

      // if the api dependency isn't available, HealthCheckService
      // of Terminus throws an error that need to be catched in the HealthService
      this.updatePrometheusData(true);
      return result;
    }

    return {};
  }
}
