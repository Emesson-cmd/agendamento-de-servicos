'use client';

import { signOut } from 'next-auth/react';
import { Button } from './button';

export function LogoutButton() {
  const handleLogout = () => {
    signOut();
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
}
