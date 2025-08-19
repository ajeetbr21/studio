"use client";

import * as React from 'react';
import ServiceCard from '@/components/service-card';
import ServiceFilters from '@/components/service-filters';
import { MOCK_SERVICES } from '@/lib/mock-data';
import type { Service, User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export default function BuyerDashboard({ user }: { user: User | null }) {
  const [filteredServices, setFilteredServices] =
    React.useState<Service[]>(MOCK_SERVICES);

  const { toast } = useToast();

  const handleBookNow = (service: Service) => {
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
    toast({
      title: 'Booking Confirmed!',
      description: `You have successfully booked "${service.title}". Payment is now in escrow.`,
    });
  };

  return (
    <div className="flex flex-col gap-6 relative">
      <header>
        <h1 className="text-3xl font-headline tracking-tight">Find Services</h1>
        <p className="text-muted-foreground font-body">
          Search, filter, and book services from top-rated providers.
        </p>
      </header>
      <ServiceFilters
        services={MOCK_SERVICES}
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
