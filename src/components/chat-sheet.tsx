"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SendHorizonal, Phone } from 'lucide-react';
import type { Service } from '@/lib/types';

export default function ChatSheet({
  open,
  onOpenChange,
  service,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service: Service | null;
}) {
  if (!service) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col p-0 bg-card/80 backdrop-blur-sm">
        <SheetHeader className="p-6 pb-2">
          <div className="flex items-center gap-4">
             <Avatar>
              <AvatarImage src={`https://placehold.co/40x40.png`} alt={service.provider} />
              <AvatarFallback>{service.provider.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <SheetTitle className="font-headline">{service.provider}</SheetTitle>
              <SheetDescription className="font-body">
                Regarding: {service.title}
              </SheetDescription>
            </div>
            <Button size="icon" variant="ghost" className="ml-auto">
              <Phone className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>
        <ScrollArea className="flex-1 px-6">
          <div className="space-y-4 py-4">
            {/* Mock chat messages */}
            <div className="flex items-end gap-2">
              <p className="max-w-xs rounded-lg bg-secondary text-secondary-foreground p-3 font-body">
                Hi! I have a question about the 'Modern Web App' service.
              </p>
            </div>
            <div className="flex items-end gap-2 justify-end">
              <p className="max-w-xs rounded-lg bg-primary text-primary-foreground p-3 font-body">
                Hello! I'm happy to help. What's your question?
              </p>
            </div>
             <div className="flex items-end gap-2">
              <p className="max-w-xs rounded-lg bg-secondary text-secondary-foreground p-3 font-body">
                What is the estimated delivery time?
              </p>
            </div>
          </div>
        </ScrollArea>
        <div className="p-4 bg-background/50 border-t">
          <div className="relative">
            <Input placeholder="Type a message..." className="pr-12 font-body" />
            <Button size="icon" className="absolute top-1/2 right-1 -translate-y-1/2 h-8 w-10">
              <SendHorizonal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
