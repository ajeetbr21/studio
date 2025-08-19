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
import { Smartphone, KeyRound } from 'lucide-react';

export default function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [step, setStep] = React.useState(1);
  const [phone, setPhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const { toast } = useToast();

  const handleSendOtp = () => {
    // Mock OTP sending
    console.log(`Sending OTP to ${phone}`);
    toast({
      title: "OTP Sent!",
      description: "A one-time password has been sent to your phone.",
    });
    setStep(2);
  };

  const handleVerifyOtp = () => {
    // Mock OTP verification
    if (otp === '123456') {
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      onOpenChange(false);
      setStep(1);
    } else {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: "Invalid OTP. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center">
            {step === 1 ? 'Login or Sign Up' : 'Enter OTP'}
          </DialogTitle>
          <DialogDescription className="text-center font-body">
            {step === 1
              ? 'Enter your phone number to continue.'
              : `We've sent a 6-digit OTP to ${phone}.`}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {step === 1 ? (
            <div className="relative">
              <Smartphone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="phone"
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10 font-body"
              />
            </div>
          ) : (
            <div className="relative">
              <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="otp"
                placeholder="6-Digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="pl-10 font-body tracking-widest text-center"
                maxLength={6}
              />
            </div>
          )}
        </div>
        <Button
          onClick={step === 1 ? handleSendOtp : handleVerifyOtp}
          className="w-full font-headline text-lg"
        >
          {step === 1 ? 'Send OTP' : 'Verify & Continue'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
