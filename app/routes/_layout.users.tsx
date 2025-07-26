import { Outlet } from 'react-router';
import { MenuLink } from '~/components/MenuLink';
import type { RouteHandle } from '~/route-handle';

export const handle: RouteHandle = {
  headerTitle: () => 'Users',
  breadcrumb: () => (
    <MenuLink to="/users" end>
      Users
    </MenuLink>
  ),
};

export default function Component() {
  return (
    <div className="flex flex-row gap-4">
      <ul className="border border-gray-200 rounded p-4 shadow-sm">
        <li>
          <MenuLink to="/users/1">User 1</MenuLink>
        </li>
        <li>
          <MenuLink to="/users/2">User 2</MenuLink>
        </li>
        <li>
          <MenuLink to="/users/3">User 3</MenuLink>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}
