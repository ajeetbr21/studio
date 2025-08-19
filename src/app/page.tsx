"use client";

import * as React from 'react';
import Header from '@/components/header';
import BuyerDashboard from '@/components/buyer-dashboard';
import ProviderDashboard from '@/components/provider-dashboard';
import type { Role } from '@/lib/types';

export default function Home() {
  const [role, setRole] = React.useState<Role>('buyer');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header role={role} setRole={setRole} />
      <main className="flex-1 p-4 sm:p-6">
        {role === 'buyer' ? <BuyerDashboard /> : <ProviderDashboard />}
      </main>
    </div>
  );
}
