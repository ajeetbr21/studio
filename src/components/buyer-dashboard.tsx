
"use client";

import * as React from 'react';
import ServiceCard from '@/components/service-card';
import ServiceFilters from '@/components/service-filters';
import type { Service, User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { collection, onSnapshot, query, doc, updateDoc, arrayUnion, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';

export default function BuyerDashboard({ user }: { user: User | null }) {
  const [allServices, setAllServices] = React.useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);

  const { toast } = useToast();
  
  React.useEffect(() => {
    const q = query(collection(db, "services"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const servicesData: Service[] = [];
      querySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() } as Service);
      });
      setAllServices(servicesData);
      setFilteredServices(servicesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleBookNow = async (service: Service) => {
    if (!user) {
        toast({
            variant: 'destructive',
            title: 'Login Required',
            description: 'Please log in to book a service.',
        });
        return;
    }
     if (user.kycStatus !== 'verified') {
        toast({
            variant: 'destructive',
            title: 'KYC Verification Required',
            description: 'Please complete your KYC to book services.',
        });
        return;
    }

    console.log('Booking service:', service.title);
    
    try {
        await addDoc(collection(db, "bookings"), {
            serviceId: service.id,
            serviceTitle: service.title,
            providerId: service.providerId,
            buyerId: user.id,
            buyerName: user.name || user.email,
            price: service.price,
            status: 'requested',
            paymentStatus: 'pending',
            createdAt: serverTimestamp(),
        });

        toast({
          title: 'Booking Requested!',
          description: `Your request for "${service.title}" has been sent.`,
        });

    } catch(error: any) {
        toast({
            variant: 'destructive',
            title: 'Booking Failed',
            description: error.message,
        });
    }

  };

  if (loading) {
    return (
       <div className="flex flex-col gap-6 relative">
          <header>
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </header>
          {/* Filter skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card/50">
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
             <Skeleton className="h-10 w-full" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(4)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[192px] w-full rounded-xl" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                    </div>
                </div>
            ))}
          </div>
       </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 relative">
      <header>
        <h1 className="text-3xl font-headline tracking-tight">Find Services</h1>
        <p className="text-muted-foreground font-body">
          Search, filter, and book services from top-rated providers.
        </p>
      </header>
      <ServiceFilters
        services={allServices}
        onFilterChange={setFilteredServices}
      />
      {filteredServices.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredServices.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              role="buyer"
              user={user}
              onBookNow={() => handleBookNow(service)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="font-headline text-2xl">No Services Found</h3>
          <p className="font-body text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
      <Button className="fixed bottom-8 right-8 h-16 w-16 rounded-full btn-gradient shadow-2xl animate-pulse">
        <Plus className="h-8 w-8" />
      </Button>
    </div>
  );
}
