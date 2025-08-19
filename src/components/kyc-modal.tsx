"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { UploadCloud, CheckCircle, AlertTriangle, Hourglass } from 'lucide-react';
import type { KycStatus } from '@/lib/types';

interface KycModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (details: { front: File | null; back: File | null }) => void;
  status: KycStatus;
}

export default function KycModal({
  open,
  onOpenChange,
  onSubmit,
  status,
}: KycModalProps) {
  const [front, setFront] = React.useState<File | null>(null);
  const [back, setBack] = React.useState<File | null>(null);

  const handleSubmit = () => {
    onSubmit({ front, back });
  };
  
  const StatusDisplay = () => {
    switch(status) {
      case 'verified':
        return <div className='flex flex-col items-center gap-4 text-center p-8 bg-green-500/10 rounded-lg'>
            <CheckCircle className='h-16 w-16 text-green-500'/>
            <h3 className='font-headline text-2xl text-green-500'>KYC Verified</h3>
            <p className='font-body text-muted-foreground'>Your account is fully verified. You can now access all features.</p>
             <Button onClick={() => onOpenChange(false)} className='mt-4'>Done</Button>
        </div>
      case 'pending':
         return <div className='flex flex-col items-center gap-4 text-center p-8 bg-yellow-500/10 rounded-lg'>
            <Hourglass className='h-16 w-16 text-yellow-500'/>
            <h3 className='font-headline text-2xl text-yellow-500'>KYC Pending</h3>
            <p className='font-body text-muted-foreground'>Your documents are under review. This usually takes 24-48 hours.</p>
        </div>
      case 'rejected':
         return <div className='flex flex-col items-center gap-4 text-center p-8 bg-red-500/10 rounded-lg'>
            <AlertTriangle className='h-16 w-16 text-red-500'/>
            <h3 className='font-headline text-2xl text-red-500'>KYC Rejected</h3>
            <p className='font-body text-muted-foreground'>There was an issue with your documents. Please re-upload clear images.</p>
             <Button onClick={handleSubmit} className='mt-4 btn-gradient'>Re-submit Documents</Button>
        </div>
      default:
        return (
             <>
                <DialogHeader>
                    <DialogTitle className="font-headline text-2xl text-center">Verify Your Identity</DialogTitle>
                    <DialogDescription className="text-center font-body">
                        Please upload your Aadhaar card for KYC verification. This is required to use our platform.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 font-body">
                    <div className="grid gap-2">
                        <Label htmlFor="front-upload">Aadhaar Card (Front)</Label>
                        <div className="flex items-center gap-4">
                            <Input id="front-upload" type="file" className="flex-1" onChange={e => setFront(e.target.files?.[0] ?? null)} />
                            <UploadCloud className="h-6 w-6 text-muted-foreground" />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="back-upload">Aadhaar Card (Back)</Label>
                         <div className="flex items-center gap-4">
                            <Input id="back-upload" type="file" className="flex-1" onChange={e => setBack(e.target.files?.[0] ?? null)} />
                            <UploadCloud className="h-6 w-6 text-muted-foreground" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={!front || !back} className="w-full btn-gradient font-headline text-lg">
                        Upload & Verify
                    </Button>
                </DialogFooter>
            </>
        )
    }
  }


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/80 backdrop-blur-sm">
        <StatusDisplay />
      </DialogContent>
    </Dialog>
  );
}
