import type { RouteHandle } from '~/route-handle';

export const handle: RouteHandle = {
  headerTitle: () => 'Users',
};

export default function Component() {
  return <div className="flex flex-col gap-2">Users list</div>;
}
