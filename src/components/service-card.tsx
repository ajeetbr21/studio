"use client";

import * as React from 'react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, MessageSquare, Edit, Trash2, Tag, DollarSign, User } from 'lucide-react';
import type { Service, Role } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import ReviewSummarizer from './review-summarizer';
import ChatSheet from './chat-sheet';

interface ServiceCardProps {
  service: Service;
  role: Role;
  onBookNow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function ServiceCard({
  service,
  role,
  onBookNow,
  onEdit,
  onDelete,
}: ServiceCardProps) {
  const [isChatOpen, setChatOpen] = React.useState(false);
  const reviewsText = service.reviews.map(r => r.text);

  return (
    <>
      <Dialog>
        <Card className="flex flex-col overflow-hidden bg-card/60 backdrop-blur-xl shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1 border-border/20 rounded-xl">
          <CardHeader className="p-0">
            <DialogTrigger asChild>
              <div className="relative cursor-pointer">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  width={400}
                  height={250}
                  className="w-full h-48 object-cover"
                  data-ai-hint={service.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 p-4">
                  <CardTitle className="font-headline text-xl text-primary-foreground">
                    {service.title}
                  </CardTitle>
                </div>
              </div>
            </DialogTrigger>
            <div className="p-4 pb-0">
               <CardDescription className="font-body flex items-center gap-2">
                 <User className="w-4 h-4" /> {service.provider}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-1">
             <div className="flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-muted-foreground"/>
                <Badge variant="secondary" className='font-body'>{service.category}</Badge>
            </div>
             <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-4 h-4"/>
                <span className="font-body font-bold text-foreground text-lg">${service.price}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            {role === 'buyer' ? (
              <>
                <Button onClick={onBookNow} className="w-full font-headline">Book Now</Button>
                <Button variant="outline" size="icon" onClick={() => setChatOpen(true)}>
                  <MessageSquare />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onEdit} variant="outline" className="w-full font-headline">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button onClick={onDelete} variant="destructive" size="icon">
                  <Trash2 />
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
        
        <DialogContent className="max-w-2xl w-full h-[90vh] flex flex-col bg-card/80 backdrop-blur-sm p-0">
            <DialogHeader className="p-6 pb-2">
                <DialogTitle className="font-headline text-3xl">{service.title}</DialogTitle>
                <DialogDescription className="font-body flex items-center gap-4">
                    <span><User className="inline-block mr-2 h-4 w-4"/>{service.provider}</span>
                    <span className="flex items-center gap-1"><Tag className="inline-block mr-2 h-4 w-4"/>{service.category}</span>
                    <span className="text-lg font-bold text-primary">${service.price}</span>
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1">
              <div className="px-6 pb-6">
                <Image src={service.imageUrl} alt={service.title} width={800} height={400} className="rounded-lg mb-4 h-64 w-full object-cover" data-ai-hint={service.imageHint} />
                <p className="font-body text-foreground/80">{service.description}</p>
                <ReviewSummarizer reviews={reviewsText} />
                <div>
                  <h3 className="font-headline text-xl mt-6 mb-2">Reviews</h3>
                  <div className="space-y-4">
                    {service.reviews.map(review => (
                       <div key={review.id} className="border-t pt-4">
                        <div className="flex items-center justify-between">
                            <p className="font-body font-bold">{review.author}</p>
                            <div className="flex items-center gap-1 text-accent">
                                {Array.from({length: review.rating}).map((_, i) => <Star key={i} className="h-4 w-4 fill-current"/>)}
                                {Array.from({length: 5 - review.rating}).map((_, i) => <Star key={i} className="h-4 w-4"/>)}
                            </div>
                        </div>
                        <p className="font-body text-muted-foreground">{review.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
        </DialogContent>
      </Dialog>
      <ChatSheet open={isChatOpen} onOpenChange={setChatOpen} service={service} />
    </>
  );
}
