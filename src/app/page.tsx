"use client";

import * as React from 'react';
import Header from '@/components/header';
import BuyerDashboard from '@/components/buyer-dashboard';
import ProviderDashboard from '@/components/provider-dashboard';
import type { Role, User, KycStatus } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import AuthModal from '@/components/auth-modal';
import KycModal from '@/components/kyc-modal';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [role, setRole] = React.useState<Role>('buyer');
  const [user, setUser] = React.useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [kycModalOpen, setKycModalOpen] = React.useState(false);
  const { toast } = useToast();

  const handleLogin = (phone: string) => {
    // Mock user creation/login
    const newUser: User = {
      id: `user-${Date.now()}`,
      phone,
      kycStatus: 'pending',
    };
    setUser(newUser);
    setAuthModalOpen(false);
    // Open KYC modal for new users or those with pending/rejected KYC
    if (newUser.kycStatus !== 'verified') {
      setTimeout(() => setKycModalOpen(true), 500);
    }
  };

  const handleKycSubmit = (details: {
    front: File | null;
    back: File | null;
  }) => {
    console.log('KYC Submitted:', details);
    if (user) {
      setUser({ ...user, kycStatus: 'verified' }); // Mock verification
       toast({
        title: 'KYC Submitted!',
        description: 'Your documents have been submitted for verification.',
      });
    }
    setKycModalOpen(false);
  };
  
  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/20">
      <Header
        role={role}
        setRole={setRole}
        user={user}
        onLoginClick={() => setAuthModalOpen(true)}
        onLogoutClick={handleLogout}
      />
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {role === 'buyer' ? <BuyerDashboard user={user} /> : <ProviderDashboard user={user}/>}
          </motion.div>
        </AnimatePresence>
      </main>
      <AuthModal
        open={authModalOpen}
        onOpenChange={setAuthModalOpen}
        onLogin={handleLogin}
      />
      {user && <KycModal
        open={kycModalOpen}
        onOpenChange={setKycModalOpen}
        onSubmit={handleKycSubmit}
        status={user.kycStatus}
      />}
    </div>
  );
}
