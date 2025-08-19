
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

  const handleLogin = (loginUser: Partial<User>) => {
    // Mock user creation/login
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: loginUser.email || 'user@example.com',
      name: loginUser.name,
      photoURL: loginUser.photoURL,
      kycStatus: 'not-started', // Start with not-started status
    };
    setUser(newUser);
    setAuthModalOpen(false);
    // KYC is now optional, so we don't automatically open the modal.
    // A user can choose to open it from their profile/dashboard.
  };

  const handleKycSubmit = (details: {
    front: File | null;
    back: File | null;
  }) => {
    console.log('KYC Submitted (Demo Mode):', details);
    if (user) {
      setUser({ ...user, kycStatus: 'verified' }); // Instantly set to verified for demo
      toast({
        title: 'KYC Verified!',
        description: 'Your account is now fully verified.',
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
        onKycClick={() => setKycModalOpen(true)}
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
