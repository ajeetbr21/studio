
"use client";

import * as React from 'react';
import Header from '@/components/header';
import BuyerDashboard from '@/components/buyer-dashboard';
import ProviderDashboard from '@/components/provider-dashboard';
import type { Role, User } from '@/lib/types';
import { AnimatePresence, motion } from 'framer-motion';
import AuthModal from '@/components/auth-modal';
import KycModal from '@/components/kyc-modal';
import { useToast } from '@/hooks/use-toast';
import { auth, db } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function Home() {
  const [role, setRole] = React.useState<Role>('buyer');
  const [user, setUser] = React.useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = React.useState(false);
  const [kycModalOpen, setKycModalOpen] = React.useState(false);
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUser(docSnap.data() as User);
        } else {
          // Create a new user document if it doesn't exist
          const newUser: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email!,
            name: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            kycStatus: 'not-started',
          };
          await setDoc(userRef, newUser);
          setUser(newUser);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleKycSubmit = async (details: {
    front: File | null;
    back: File | null;
  }) => {
    console.log('KYC Submitted (Demo Mode):', details);
    if (user) {
      const updatedUser = { ...user, kycStatus: 'verified' as const };
      const userRef = doc(db, "users", user.id);
      await setDoc(userRef, updatedUser, { merge: true });
      setUser(updatedUser); 
      toast({
        title: 'KYC Verified!',
        description: 'Your account is now fully verified.',
      });
    }
    setKycModalOpen(false);
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
  };
  
  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

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
        onLoginSuccess={() => setAuthModalOpen(false)}
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
