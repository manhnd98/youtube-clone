import {URL} from 'url';
import * as querystring from 'querystring';

export class HttpMetadata {
    static store: Record<string, unknown> = {
        routes: {},
        baseUrl: '',
    };

    static addNamedRoute(routeName: string, path: string): void {
        HttpMetadata.store.routes[routeName] = path;
    }

    static getRoute(routeName: string, params?: Record<string, unknown>): string {
        let route = HttpMetadata.store.routes[routeName];

        if (!route) return null;

        let notPathParams = null;

        if (params && Object.keys(params).length) {
            notPathParams = {};

            for (const key in params) {
                route.includes(`:${key}`)
                    ? (route = route.replace(`:${key}`, params[key]))
                    : (notPathParams[key] = params[key]);
            }
        }

        const url = new URL(
            notPathParams ? `${route}?${querystring.stringify(notPathParams)}` : route,
            HttpMetadata.store.baseUrl as string,
        );

        return url.href;
    }

  static setBaseUrl(url: string): void {
      HttpMetadata.store.baseUrl = url;
    }
}
