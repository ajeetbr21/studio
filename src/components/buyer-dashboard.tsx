"use client";

import * as React from 'react';
import ServiceCard from '@/components/service-card';
import ServiceFilters from '@/components/service-filters';
import { MOCK_SERVICES } from '@/lib/mock-data';
import type { Service } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function BuyerDashboard() {
  const [filteredServices, setFilteredServices] =
    React.useState<Service[]>(MOCK_SERVICES);

  const { toast } = useToast();

  const handleBookNow = (service: Service) => {
    console.log('Booking service:', service.title);
    toast({
      title: 'Booking Confirmed!',
      description: `You have successfully booked "${service.title}".`,
    });
  };

  return (
    <div className="flex flex-col gap-6">
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
              onBookNow={() => handleBookNow(service)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
          <h3 className="font-headline text-xl">No Services Found</h3>
          <p className="font-body text-muted-foreground">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
