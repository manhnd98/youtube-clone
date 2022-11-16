import {Transformer} from '../transformers';
import {get} from 'lodash';
import {Request} from './interfaces';

type paginate<T> = {
    data: T;
    pagination: any;
};

export class RestController {
    /**
     * Transform a object
     *
     * @param obj
     * @param transformer
     * @param options
     */
    async transform(
        obj: Record<string, unknown>,
        transformer: Transformer,
        options?: Record<string, any>,
    ) {
        transformer = this.setTransformerContext(transformer, options);

        return await transformer.parseIncludes(this.getIncludes(options?.req)).work(obj);
    }

    async collection(
        collect: Array<Record<string, any>>,
        transformer: Transformer,
        options?: Record<string, any>,
    ): Promise<Array<Record<string, any>>> {
        transformer = this.setTransformerContext(transformer, options);

        const collection = [];

        for (const o of collect) {
            collection.push(
                await transformer.parseIncludes(this.getIncludes(options?.req)).work(o),
            );
        }

        return collection;
    }

    async paginate(
        obj: Record<string, any>,
        transformer: Transformer,
        options?: Record<string, any>,
    ): Promise<Record<keyof paginate<any>, any>> {
        const collect = this.collection(obj.data, transformer, options);
        return {
            data: await collect,
            pagination: obj.pagination,
        };
    }

    private setTransformerContext(
        transformer: Transformer,
        options: Record<string, any>,
    ): Transformer {
        transformer.ctx.setRequest(options?.req || {});
        return transformer;
    }

    private getIncludes(req: Request): string {
        if (!req) return '';
        return get(req.all(), 'include', '') as string;
    }
}
