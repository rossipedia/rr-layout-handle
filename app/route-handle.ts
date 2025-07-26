import type { ReactNode } from 'react';
import { useMatches, type UIMatch } from 'react-router';

export type AppUIMatch<D> = UIMatch<D | undefined, RouteHandle>;

export function useAppMatches(): AppUIMatch<unknown>[] {
  return useMatches() as AppUIMatch<unknown>[];
}

export function useAllHandleValues<K extends keyof RouteHandle<unknown>>(
  key: K
): RouteMatchHandleValueType<unknown, K>[] {
  const matches = useAppMatches();
  const values = matches.map(
    (match, i, matches) =>
      match.handle?.[key]?.(match, i, matches) as RouteMatchHandleValueType<
        unknown,
        K
      >
  );
  return values.filter((value) => value !== undefined);
}

export function useDeepestHandleValue<K extends keyof RouteHandle<unknown>>(
  key: K
): RouteMatchHandleValueType<unknown, K> | undefined {
  const matches = useAppMatches();
  for (let i = matches.length - 1; i >= 0; i--) {
    const match = matches[i];
    const value = match.handle?.[key]?.(
      match,
      i,
      matches
    ) as RouteMatchHandleValueType<unknown, K>;
    if (value !== undefined) {
      return value;
    }
  }
  return undefined;
}

type ExtractLoaderData<D> = D extends { loaderData: infer D }
  ? ExtractLoaderData<D>
  : D;

export type RouteMatchHandler<D = unknown, R = unknown> = (
  match: AppUIMatch<ExtractLoaderData<D>>,
  index: number,
  matches: AppUIMatch<unknown>[]
) => R;

type RouteMatchHandleValueType<D, K extends keyof RouteHandle<D>> = ReturnType<
  NonNullable<RouteHandle<D>[K]>
>;

export interface RouteHandle<R = unknown> {
  headerTitle?: RouteMatchHandler<R, ReactNode>;
  breadcrumb?: RouteMatchHandler<R, ReactNode>;
}
