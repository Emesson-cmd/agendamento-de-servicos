import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { LogoutButton } from '@/components/ui/logout-button';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div className="text-2xl bg-slate-600">
      Welcome, {session.user?.email}
      <LogoutButton />
    </div>
  );
}
