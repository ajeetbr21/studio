
"use client";

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Briefcase, LayoutGrid, Sparkles, Bell, User, LogOut, ShieldCheck, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Role, User as UserType } from '@/lib/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import KycStatusBadge from './kyc-status-badge';

interface HeaderProps {
  role: Role;
  setRole: (role: Role) => void;
  user: UserType | null;
  onLoginClick: () => void;
  onLogoutClick: () => void;
}

export default function Header({ role, setRole, user, onLoginClick, onLogoutClick }: HeaderProps) {
  return (
    <header className="sticky top-4 z-30 flex h-20 items-center gap-4 border bg-background/80 backdrop-blur-xl px-4 md:px-6 mx-4 md:mx-6 rounded-2xl shadow-lg">
      <Link href="/" className="flex items-center gap-2">
        <Sparkles className="h-8 w-8 text-primary" />
        <h1 className="text-2xl font-headline font-bold">SewaNow</h1>
      </Link>

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
          <Mail className="h-6 w-6" />
           <span className="absolute top-1 right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
            </span>
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-6 w-6" />
          <span className="absolute top-1 right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
        </Button>
        <ThemeToggle />
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className='h-10 w-10 shadow-lg'>
                  <AvatarImage src={`https://placehold.co/40x40.png`} alt="User" />
                  <AvatarFallback>{user.phone.slice(0,2)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 font-body" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">My Account</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.phone}
                  </p>
                </div>
              </DropdownMenuLabel>
               <DropdownMenuItem>
                <KycStatusBadge status={user.kycStatus} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/admin" className='flex items-center'>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Admin Panel
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogoutClick}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={onLoginClick} className="font-headline btn-gradient text-lg h-12 px-8 shadow-lg">Login</Button>
        )}
      </div>
    </header>
  );
}
