import {GenericFunction} from '@youtube-clone/api/shared-core';

export interface Pagination<T> {
    data: T[];
    pagination?: {
        currentPage: number;
        totalPagaes: number;
        perPage: number;
        total: number;
    };
}

export interface SortableSchema {
    sort?: string;
}

interface NestedLoadRelSchema {
    $recursivve?: boolean | number;
    $relation?: string;
    $modify?: string[];
    [key: string]: boolean | number | string | string[] | NestedLoadRelSchema;
}

interface LoadRelSchema {
    [key: string]: boolean | NestedLoadRelSchema;
}

export interface ObjectionModel {
    $fetchGraph?: GenericFunction;

    $load(exp: LoadRelSchema): Promise<void>;
}
