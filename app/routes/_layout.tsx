import { Outlet } from 'react-router';
import { MenuLink } from '~/components/MenuLink';
import { useAllHandleValues, useDeepestHandleValue } from '~/route-handle';

export default function Component() {
  const headerTitle = useDeepestHandleValue('headerTitle');
  const breadcrumbs = useAllHandleValues('breadcrumb');

  return (
    <div className="container mx-auto my-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{headerTitle ?? 'Welcome!'}</h1>
      <nav>
        <menu className="flex gap-4">
          <MenuLink to="/">Home</MenuLink>
          <MenuLink to="/users">Users</MenuLink>
        </menu>
      </nav>
      <div>
        <nav className="flex gap-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <span key={index} className="text-gray-500">
              {breadcrumb}
              {index < breadcrumbs.length - 1 && ' / '}
            </span>
          ))}
        </nav>
      </div>
      <Outlet />
    </div>
  );
}
