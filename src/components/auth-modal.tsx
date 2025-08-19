"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mail, Lock, LogIn } from 'lucide-react';
import type { User } from '@/lib/types';
import { Separator } from './ui/separator';

const GoogleIcon = () => (
    <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
        <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
        />
        <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
        />
        <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
        />
        <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
        />
    </svg>
);


export default function AuthModal({
  open,
  onOpenChange,
  onLogin,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogin: (user: Partial<User>) => void;
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { toast } = useToast();

  const handleGoogleLogin = () => {
    // Mock Google Login
    toast({
      title: 'Login Successful',
      description: 'Welcome back, Alex!',
    });
    onLogin({
      email: 'alex.doe@example.com',
      name: 'Alex Doe',
      photoURL: `https://placehold.co/40x40.png`,
    });
    resetState();
  };

  const handleEmailLogin = () => {
    // Mock Email/Password Login
    if (!email || !password) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please enter both email and password.',
      });
      return;
    }
    toast({
      title: 'Login Successful',
      description: `Welcome back, ${email}!`,
    });
    onLogin({ email });
    resetState();
  };
  
  const resetState = () => {
     setTimeout(() => {
        setEmail('');
        setPassword('');
      }, 300);
  }

  const handleDialogClose = (isOpen: boolean) => {
    if(!isOpen) {
       resetState();
    }
    onOpenChange(isOpen);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="font-headline text-3xl text-center">
            Welcome to SewaNow
          </DialogTitle>
          <DialogDescription className="text-center font-body text-base">
            Sign in to continue
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4 space-y-4">
            <Button onClick={handleGoogleLogin} variant="outline" className="w-full h-12 text-base font-headline">
                <GoogleIcon /> Continue with Google
            </Button>

            <div className="flex items-center gap-4">
                <Separator className="flex-1" />
                <span className="text-muted-foreground font-body text-sm">OR</span>
                <Separator className="flex-1" />
            </div>

            <div className="space-y-3">
                 <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 font-body h-12"
                    />
                </div>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 font-body h-12"
                    />
                </div>
                 <Button
                    onClick={handleEmailLogin}
                    className="w-full font-headline text-lg btn-gradient h-12"
                    >
                    <LogIn className="mr-2 h-5 w-5" />
                    Login with Email
                </Button>
            </div>
            <p className="text-center text-muted-foreground text-xs font-body">
                By continuing, you agree to our Terms of Service.
            </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
