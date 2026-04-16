import { TopBar } from './TopBar';
import { UserMenu } from './UserMenu';
import { getSession } from '@/lib/auth';

type Props = {
  title: string;
  children: React.ReactNode;
};

// Server component: pulls the session and renders the dashboard page header.
export async function PageShell({ title, children }: Props) {
  const session = await getSession();
  return (
    <>
      <TopBar title={title} rightSlot={session ? <UserMenu email={session.email} /> : null} />
      <div className="px-6 lg:px-10 py-6 lg:py-8">{children}</div>
    </>
  );
}
