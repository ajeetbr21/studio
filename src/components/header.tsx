
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Briefcase, LayoutGrid, Sparkles } from 'lucide-react';
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
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-headline font-bold">SewaNow</h1>
        </div>

        <div className="flex-1 flex justify-center">
          <div className="bg-muted p-1 rounded-lg flex items-center gap-1 font-headline">
            <Button
              variant={role === 'buyer' ? 'secondary' : 'ghost'}
              className={cn(
                'rounded-md',
                role === 'buyer' && 'bg-background shadow-sm'
              )}
              onClick={() => setRole('buyer')}
            >
              <LayoutGrid className="mr-2 h-4 w-4" />
              Buyer
            </Button>
            <Button
              variant={role === 'provider' ? 'secondary' : 'ghost'}
              className={cn(
                'rounded-md',
                role === 'provider' && 'bg-background shadow-sm'
              )}
              onClick={() => setRole('provider')}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Provider
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button onClick={() => setAuthModalOpen(true)} className="font-headline">Login</Button>
        </div>
      </header>
      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </>
  );
}
