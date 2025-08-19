"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/service-card';
import { MOCK_SERVICES } from '@/lib/mock-data';
import type { Service, User } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import ServiceForm from '@/components/service-form';
import { useToast } from '@/hooks/use-toast';
import AnalyticsDashboard from './analytics-dashboard';

export default function ProviderDashboard({ user }: { user: User | null }) {
  const [services, setServices] = React.useState<Service[]>(
    MOCK_SERVICES.slice(0, 2)
  ); // Assume first 2 services belong to this provider
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<Service | null>(null);
  const { toast } = useToast();

  const handleSaveService = (service: Service) => {
    if (editingService) {
      setServices(services.map((s) => (s.id === service.id ? service : s)));
      toast({ title: 'Service Updated', description: `"${service.title}" has been updated.` });
    } else {
      setServices([...services, { ...service, id: `service-${Date.now()}` }]);
      toast({ title: 'Service Created', description: `"${service.title}" has been added.` });
    }
    setEditingService(null);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDelete = (serviceId: string) => {
    setServices(services.filter((s) => s.id !== serviceId));
    toast({ variant: 'destructive', title: 'Service Deleted', description: 'The service has been removed.' });
  };
  
  const handleAddNew = () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Login Required', description: 'Please log in to add a service.' });
      return;
    }
     if (user.kycStatus !== 'verified') {
        toast({
            variant: 'destructive',
            title: 'KYC Verification Required',
            description: 'Please complete your KYC to add services.',
        });
        return;
    }
    setEditingService(null);
    setIsFormOpen(true);
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-headline tracking-tight">
              Provider Dashboard
            </h1>
            <p className="text-muted-foreground font-body text-lg">
              Manage your services and track your performance.
            </p>
          </div>
        </header>
        
        <AnalyticsDashboard />

        <div className="flex items-center justify-between">
            <h2 className="text-3xl font-headline tracking-tight">Your Services</h2>
            <Button onClick={handleAddNew} className="font-headline btn-gradient shadow-lg">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Service
            </Button>
        </div>

        {services.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                role="provider"
                user={user}
                onEdit={() => handleEdit(service)}
                onDelete={() => handleDelete(service.id)}
              />
            ))}
          </div>
        ) : (
           <div className="text-center py-20 border-2 border-dashed rounded-xl bg-card/30">
            <h3 className="font-headline text-2xl">No Services Yet</h3>
            <p className="font-body text-muted-foreground mb-6 text-lg">Add your first service to get started.</p>
            <Button onClick={handleAddNew} className="font-headline btn-gradient shadow-lg">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Service
            </Button>
          </div>
        )}
      </div>
      <ServiceForm
        isOpen={isFormOpen}
        setIsOpen={setIsFormOpen}
        service={editingService}
        onSave={handleSaveService}
      />
    </>
  );
}
