
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Briefcase, LayoutGrid, Sparkles, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Role } from '@/lib/types';
import AuthModal from '@/components/auth-modal';

interface HeaderProps {
  role: Role;
  setRole: (role: Role) => void;
}

export default function Header({ role, setRole }: HeaderProps) {
  const [authModalOpen, setAuthModalOpen] = React.useState(false);

  return (
    <>
      <header className="sticky top-4 z-30 flex h-20 items-center gap-4 border bg-background/80 backdrop-blur-xl px-4 md:px-6 mx-4 md:mx-6 rounded-2xl shadow-lg">
        <div className="flex items-center gap-2">
          <Sparkles className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold">SewaNow</h1>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="bg-muted p-1 rounded-lg flex items-center gap-1 font-headline">
            <Button
              variant={role === 'buyer' ? 'secondary' : 'ghost'}
              className={cn(
                'rounded-md px-6 py-2 text-base transition-all duration-300',
                role === 'buyer' && 'bg-background shadow-sm'
              )}
              onClick={() => setRole('buyer')}
            >
              <LayoutGrid className="mr-2 h-5 w-5" />
              Buyer
            </Button>
            <Button
              variant={role === 'provider' ? 'secondary' : 'ghost'}
              className={cn(
                'rounded-md px-6 py-2 text-base transition-all duration-300',
                role === 'provider' && 'bg-background shadow-sm'
              )}
              onClick={() => setRole('provider')}
            >
              <Briefcase className="mr-2 h-5 w-5" />
              Provider
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-6 w-6" />
                <span className="absolute top-1 right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
            </Button>
          <ThemeToggle />
          <Button onClick={() => setAuthModalOpen(true)} className="font-headline btn-gradient text-lg h-12 px-8 shadow-lg">Login</Button>
        </div>
      </header>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
