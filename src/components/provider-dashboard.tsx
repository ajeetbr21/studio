
"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import ServiceCard from '@/components/service-card';
import type { Service, User } from '@/lib/types';
import { PlusCircle } from 'lucide-react';
import ServiceForm from '@/components/service-form';
import { useToast } from '@/hooks/use-toast';
import AnalyticsDashboard from './analytics-dashboard';
import { collection, query, where, onSnapshot, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from './ui/skeleton';

export default function ProviderDashboard({ user }: { user: User | null }) {
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingService, setEditingService] = React.useState<Service | null>(null);
  const { toast } = useToast();

  React.useEffect(() => {
    if (!user) {
        setLoading(false);
        return;
    };
    
    setLoading(true);
    const q = query(collection(db, "services"), where("providerId", "==", user.id));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const servicesData: Service[] = [];
      querySnapshot.forEach((doc) => {
        servicesData.push({ id: doc.id, ...doc.data() } as Service);
      });
      setServices(servicesData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSaveService = async (serviceData: Partial<Service>) => {
    if (!user) return;

    if (editingService) {
      // Update existing service
      const serviceRef = doc(db, "services", editingService.id);
      await updateDoc(serviceRef, serviceData);
      toast({ title: 'Service Updated', description: `"${serviceData.title}" has been updated.` });
    } else {
      // Create new service
      await addDoc(collection(db, "services"), {
        ...serviceData,
        providerId: user.id,
        provider: user.name || user.email,
        createdAt: serverTimestamp()
      });
      toast({ title: 'Service Created', description: `"${serviceData.title}" has been added.` });
    }
    setEditingService(null);
    setIsFormOpen(false);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsFormOpen(true);
  };

  const handleDelete = async (serviceId: string) => {
    await deleteDoc(doc(db, "services", serviceId));
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
  
  if (loading) {
     return <Skeleton className="h-64 w-full" />;
  }
  
  if (!user) {
     return (
        <div className="text-center py-20 border-2 border-dashed rounded-xl bg-card/30">
            <h3 className="font-headline text-2xl">Please Log In</h3>
            <p className="font-body text-muted-foreground mb-6 text-lg">You need to be logged in to manage your services.</p>
        </div>
     )
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
