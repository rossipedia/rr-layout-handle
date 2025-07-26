import { Faker, en } from '@faker-js/faker';
import { Route } from './+types/_layout.users.$id';
import { RouteHandle } from '~/route-handle';
import { Link } from 'react-router';
import { MenuLink } from '~/components/MenuLink';

// If an ErrorBoundary ends up rendering things from this handle, data will be undefined
export const handle: RouteHandle<Route.ComponentProps> = {
  headerTitle: ({ data }) => (data ? `Profile for ${data.email}` : undefined),
  breadcrumb: ({ params, data }) =>
    data ? (
      <MenuLink to={`/users/${params.id}`}>{data.name}</MenuLink>
    ) : undefined,
};

export function loader({ params }: Route.LoaderArgs) {
  // Simulate fetching user data based on the ID
  const id = Number.parseInt(params.id, 10);
  if (!id) {
    throw new Response('User not found', { status: 404 });
  }

  const gen = new Faker({ locale: en, seed: id });
  return {
    id,
    name: gen.person.fullName(),
    email: gen.internet.email(),
    joined: gen.date.past({ refDate: new Date('2025-01-01') }).toISOString(),
  };
}

export default function UserLayout({ loaderData }: Route.ComponentProps) {
  return (
    <ul>
      <li>User ID: {loaderData.id}</li>
      <li>Name: {loaderData.name}</li>
      <li>Email: {loaderData.email}</li>
      <li>Join date: {loaderData.joined}</li>
    </ul>
  );
}
