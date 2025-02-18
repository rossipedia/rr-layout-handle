import clsx from 'clsx';
import { NavLink, Outlet, useMatches, type LinkProps } from 'react-router';
import type { AppUIMatch } from '~/route-handle';

export default function Component() {
  const headerTitle = (useMatches() as AppUIMatch[])
    .toReversed()
    .map((match, i, matches) => match.handle?.headerTitle?.(match, i, matches))
    .find(Boolean);

  return (
    <div className="container mx-auto my-4 flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{headerTitle ?? 'Welcome!'}</h1>
      <nav>
        <menu className="flex gap-4">
          <MenuLink to="/">Home</MenuLink>
          <MenuLink to="/users">Users</MenuLink>
        </menu>
      </nav>
      <Outlet />
    </div>
  );
}

function MenuLink({ className, ...props }: LinkProps) {
  return (
    <li>
      <NavLink
        {...props}
        className={({ isActive }) =>
          clsx(isActive && 'underline', 'text-blue-500', className)
        }
      />
    </li>
  );
}
