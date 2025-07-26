import clsx from 'clsx';
import { NavLinkProps, NavLink } from 'react-router';

export function MenuLink({ className, ...props }: NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        clsx(isActive && 'underline', 'text-blue-500', className)
      }
    />
  );
}
