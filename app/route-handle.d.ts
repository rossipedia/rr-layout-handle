import type { ReactNode } from 'react';
import type { UIMatch } from 'react-router';

export type AppUIMatch<D = unknown> = UIMatch<D, RouteHandle>;

export type RouteHandler<R = ReactNode> = (
  match: AppUIMatch<unknown>,
  index: number,
  matches: AppUIMatch<unknown>[]
) => R;

export interface RouteHandle {
  headerTitle?: RouteHandler;
}
