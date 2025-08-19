"use client";

import * as React from 'react';
import Header from '@/components/header';
import BuyerDashboard from '@/components/buyer-dashboard';
import ProviderDashboard from '@/components/provider-dashboard';
import type { Role } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';

export default function Home() {
  const [role, setRole] = React.useState<Role>('buyer');

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <Header role={role} setRole={setRole} />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {role === 'buyer' ? <BuyerDashboard /> : <ProviderDashboard />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
