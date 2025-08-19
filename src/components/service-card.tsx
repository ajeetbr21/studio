
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
import { Star, MessageSquare, Edit, Trash2, Tag, DollarSign, User, Phone, RefreshCw } from 'lucide-react';
import type { Service, Role, User as UserType } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import ReviewSummarizer from './review-summarizer';
import ChatSheet from './chat-sheet';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { db } from '@/lib/firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';


interface ServiceCardProps {
  service: Service;
  role: Role;
  user: UserType | null;
  onBookNow?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onStatusUpdate?: (serviceId: string, status: 'completed') => void;
}

export default function ServiceCard({
  service,
  role,
  user,
  onBookNow,
  onEdit,
  onDelete,
  onStatusUpdate,
}: ServiceCardProps) {
  const [isChatOpen, setChatOpen] = React.useState(false);
  const [isReviewOpen, setReviewOpen] = React.useState(false);
  const [reviewText, setReviewText] = React.useState('');
  const [reviewRating, setReviewRating] = React.useState(5);
  const [reviewPhoto, setReviewPhoto] = React.useState<File | null>(null);

  const reviewsText = service.reviews?.map(r => r.text) || [];
  const { toast } = useToast();

  const handleCall = () => {
    toast({
      title: 'Initiating Call...',
      description: `Connecting you with ${service.provider}.`,
    });
    console.log(`Calling ${service.provider}`);
  };

  const handleStatusUpdate = () => {
    if (onStatusUpdate) {
        onStatusUpdate(service.id, 'completed');
    }
  }
  
  const handleReviewSubmit = async () => {
    if (!reviewText) {
        toast({variant: 'destructive', title: 'Review text cannot be empty'});
        return;
    }
    if (!user) {
        toast({variant: 'destructive', title: 'You must be logged in to leave a review'});
        return;
    }

    try {
        const serviceRef = doc(db, 'services', service.id);
        const newReview = {
            id: doc(db, 'reviews').id, // Generate a new ID
            author: user.name || user.email,
            rating: reviewRating,
            text: reviewText,
            // photoUrl will be handled by backend/upload logic
        };
        await updateDoc(serviceRef, {
            reviews: arrayUnion(newReview)
        });

        toast({
            title: 'Review Submitted!',
            description: 'Thank you for your feedback.',
        });
        setReviewOpen(false);
        setReviewText('');
        setReviewRating(5);
        setReviewPhoto(null);
    } catch (error) {
        console.error("Error submitting review:", error);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to submit review. Please try again.',
        });
    }
  }

  const isServiceCompleted = service.bookingStatus === 'completed';

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
                 <div className="absolute top-2 left-2 flex gap-2">
                  {service.tags?.map((tag, i) => (
                    <Badge key={i} variant={tag.type} className="mr-2 capitalize bg-gradient-to-r from-primary/80 to-accent/80 text-primary-foreground border-none">
                      {tag.name}
                    </Badge>
                  ))}
                   {service.bookingStatus && <Badge variant="outline" className="capitalize backdrop-blur-sm bg-background/50">{service.bookingStatus}</Badge>}
                </div>
                <div className="absolute bottom-0 p-4">
                  <CardTitle className="font-headline text-2xl text-primary-foreground">
                    {service.title}
                  </CardTitle>
                </div>
              </div>
            </DialogTrigger>
            <div className="p-4 pb-0">
               <CardDescription className="font-body flex items-center gap-2 text-base">
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
                <span className="font-body font-bold text-foreground text-2xl">${service.price}</span>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex gap-2">
            {role === 'buyer' ? (
              <>
                <Button onClick={onBookNow} className="w-full font-headline btn-gradient text-lg h-12 shadow-lg" disabled={isServiceCompleted}>
                    {isServiceCompleted ? 'Completed' : 'Book Now'}
                </Button>
                <Button variant="outline" size="icon" className="h-12 w-12" onClick={() => setChatOpen(true)}>
                  <MessageSquare />
                </Button>
                 <Button variant="outline" size="icon" className="h-12 w-12" onClick={handleCall}>
                  <Phone />
                </Button>
              </>
            ) : (
              <>
                <Button onClick={onEdit} variant="outline" className="w-full font-headline text-lg h-12">
                  <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button onClick={onDelete} variant="destructive" size="icon" className="h-12 w-12">
                  <Trash2 />
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
        
        <DialogContent className="max-w-2xl w-full h-[90vh] flex flex-col bg-card/80 backdrop-blur-sm p-0 rounded-2xl">
            <DialogHeader className="p-6 pb-2">
                <DialogTitle className="font-headline text-4xl">{service.title}</DialogTitle>
                <DialogDescription className="font-body flex items-center gap-4 text-base">
                    <span><User className="inline-block mr-2 h-4 w-4"/>{service.provider}</span>
                    <span className="flex items-center gap-1"><Tag className="inline-block mr-2 h-4 w-4"/>{service.category}</span>
                    <span className="text-2xl font-bold text-primary">${service.price}</span>
                </DialogDescription>
            </DialogHeader>
            <ScrollArea className="flex-1">
              <div className="px-6 pb-6">
                <Image src={service.imageUrl} alt={service.title} width={800} height={400} className="rounded-lg mb-6 h-64 w-full object-cover" data-ai-hint={service.imageHint} />
                
                {role === 'provider' && service.bookingStatus && (
                    <Card className='mb-6 bg-secondary/30'>
                        <CardHeader><CardTitle className='font-headline text-xl'>Update Status</CardTitle></CardHeader>
                        <CardContent className='flex items-center gap-4'>
                            <p className='font-body'>Current status: <Badge>{service.bookingStatus}</Badge></p>
                            <Button onClick={handleStatusUpdate}><RefreshCw className='mr-2 h-4 w-4'/> Mark as Complete</Button>
                        </CardContent>
                    </Card>
                )}

                <p className="font-body text-foreground/80 text-lg">{service.description}</p>
                
                {reviewsText.length > 0 && <ReviewSummarizer reviews={reviewsText} />}
                
                <div>
                  <div className='flex justify-between items-center'>
                    <h3 className="font-headline text-3xl mt-8 mb-4">Reviews</h3>
                    {isServiceCompleted && role === 'buyer' && (
                       <Dialog open={isReviewOpen} onOpenChange={setReviewOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <Star className='mr-2 h-4 w-4'/> Leave a Review
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='font-headline'>Rate your experience</DialogTitle>
                            </DialogHeader>
                            <div className='py-4 space-y-4 font-body'>
                                <div className='flex justify-center text-accent gap-2'>
                                     {[...Array(5)].map((_, i) => <Star key={i} onClick={() => setReviewRating(i + 1)} className={`h-8 w-8 cursor-pointer hover:scale-110 transition-transform ${i < reviewRating ? 'fill-current' : ''}`}/>)}
                                </div>
                                <Textarea placeholder="Share your experience..." value={reviewText} onChange={e => setReviewText(e.target.value)}/>
                                <Input type="file" onChange={e => setReviewPhoto(e.target.files?.[0] ?? null)} />
                            </div>
                            <DialogFooter>
                                <Button onClick={handleReviewSubmit} className='btn-gradient'>Submit Review</Button>
                            </DialogFooter>
                        </DialogContent>
                       </Dialog>
                    )}
                  </div>
                  <div className="space-y-6">
                    {service.reviews?.map(review => (
                       <div key={review.id} className="border-t pt-6 border-white/10">
                        <div className="flex items-center justify-between">
                            <p className="font-body font-bold text-lg">{review.author}</p>
                            <div className="flex items-center gap-1 text-accent">
                                {Array.from({length: review.rating}).map((_, i) => <Star key={i} className="h-5 w-5 fill-current"/>)}
                                {Array.from({length: 5 - review.rating}).map((_, i) => <Star key={i} className="h-5 w-5"/>)}
                            </div>
                        </div>
                        <p className="font-body text-muted-foreground mt-1">{review.text}</p>
                        {review.photoUrl && <Image src={review.photoUrl} alt="review photo" width={100} height={100} className="mt-2 rounded-lg" />}
                      </div>
                    ))}
                     {service.reviews?.length === 0 && <p className='text-muted-foreground font-body'>No reviews yet.</p>}
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
