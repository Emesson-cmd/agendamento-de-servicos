'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ResetPasswordCard } from '@/components/ui/reset-password/reset-password-card';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      router.push('/forgot-password');
    }
  }, [token, router]);

  if (!token) {
    return null; // or a loading state, but since redirecting, null is fine
  }

  return <ResetPasswordCard token={token} />;
}
