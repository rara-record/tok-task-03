import { z } from 'nestjs-zod/z';
import { produce } from 'immer';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { ENV } from 'env';

export const createRepository = <
  Schema extends z.AnyZodObject,
  SchemaData = z.infer<Schema>,
  IDKey extends keyof z.infer<Schema> | undefined = undefined,
  CreatedKey extends keyof z.infer<Schema> | undefined = undefined,
>(params: {
  key: string;
  schema: Schema;
  initial?: SchemaData[];
  persist?: boolean;
  autoIncrementId?: IDKey;
  autoCreatedAt?: CreatedKey;
}) => {
  const {
    key,
    schema,
    autoIncrementId,
    autoCreatedAt,
    initial = [],
    persist = ENV.CACHE_DATA,
  } = params;
  const cachePath = `.cache/${key}.json`;

  const cacheInit = () => {
    const initialData: { data: SchemaData[]; nextId: number } = {
      data: initial,
      nextId: initial.length,
    };

    if (!persist) return initialData;
    if (!existsSync(cachePath)) return initialData;
    try {
      const cache = JSON.parse(readFileSync(cachePath, { encoding: 'utf-8' }));
      cache.data.forEach((item) => schema.parse(item));
      return cache;
    } catch (e) {
      console.error(e);
      console.error(`Failed to parse cache file: ${cachePath}`);
      rmSync(cachePath);
      return initialData;
    }
  };

  const cache = cacheInit();

  let data: SchemaData[] = persist ? cache.data : initial;
  let nextId: number = persist ? cache.nextId : initial.length;

  const setData = (newData: SchemaData[]) => {
    if (persist) {
      mkdirSync('.cache', { recursive: true });
      writeFileSync(
        cachePath,
        JSON.stringify(
          {
            data: newData,
            nextId,
          },
          null,
          2,
        ),
      );
    }
    data = newData;
  };

  const repository = {
    create: (
      dto: IDKey extends string
        ? CreatedKey extends string
          ? Omit<SchemaData, IDKey | CreatedKey>
          : Omit<SchemaData, IDKey>
        : CreatedKey extends string
          ? Omit<SchemaData, CreatedKey>
          : SchemaData,
    ) => {
      const item = dto as SchemaData;
      if (autoIncrementId) {
        item[autoIncrementId as keyof typeof item] = nextId as any;
      }
      if (autoCreatedAt) {
        item[autoCreatedAt as keyof typeof item] =
          new Date().toISOString() as any;
      }

      schema.parse(item);
      data.push(item as SchemaData);
      nextId++;
      setData(data);

      return item;
    },
    findAll: () => data,
    findOne: <
      K extends keyof SchemaData,
      Query extends { key: K; value: SchemaData[K] },
    >(params: {
      query: Query[];
      operator?: 'and' | 'or';
    }): SchemaData | undefined => {
      const { query, operator = 'and' } = params;

      const isTarget = (item: SchemaData) => (query: Query) => {
        const value = item[query.key];
        return value === query.value;
      };

      return data.find((item) =>
        operator === 'and'
          ? query.every(isTarget(item))
          : query.some(isTarget(item)),
      );
    },
    findMany: <
      K extends keyof SchemaData,
      Query extends { key: K; value: SchemaData[K] },
    >(params: {
      query: Query[];
      operator?: 'and' | 'or';
    }): SchemaData[] => {
      const { query, operator = 'and' } = params;

      const isTarget = (item: SchemaData) => (query: Query) => {
        const value = item[query.key];
        return value === query.value;
      };

      return data.filter((item) =>
        operator === 'and'
          ? query.every(isTarget(item))
          : query.some(isTarget(item)),
      );
    },
    update: <
      K extends keyof SchemaData,
      Query extends { key: K; value: SchemaData[K] },
    >(
      params: {
        query: Query[];
        operator?: 'and' | 'or';
      },
      updator: SchemaData | ((prev: SchemaData) => void),
    ) => {
      const { query, operator = 'and' } = params;

      const isTarget = (item: SchemaData) => (query: Query) => {
        const value = item[query.key];
        return value === query.value;
      };

      const index = data.findIndex((item) =>
        operator === 'and'
          ? query.every(isTarget(item))
          : query.some(isTarget(item)),
      );

      if (index === -1) {
        return;
      }

      const res =
        typeof updator === 'function'
          ? produce(data[index], updator as any)
          : updator;

      schema.parse(res);
      data[index] = res;
      setData(data);

      return data[index];
    },
    remove: <
      K extends keyof SchemaData,
      Query extends { key: K; value: SchemaData[K] },
    >(params: {
      query: Query[];
      operator?: 'and' | 'or';
    }) => {
      const { query, operator = 'and' } = params;

      const isTarget = (item: SchemaData) => (query: Query) => {
        const value = item[query.key];
        return value === query.value;
      };

      const index = data.findIndex((item) =>
        operator === 'and'
          ? query.every(isTarget(item))
          : query.some(isTarget(item)),
      );

      if (index === -1) {
        return;
      }

      data.splice(index, 1);
      setData(data);
      return query;
    },
  };

  return repository;
};
