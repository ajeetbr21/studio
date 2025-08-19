
"use client";

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import type { Service } from '@/lib/types';

interface ServiceFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  service: Service | null;
  onSave: (service: Partial<Service>) => void;
}

export default function ServiceForm({
  isOpen,
  setIsOpen,
  service,
  onSave,
}: ServiceFormProps) {
  const [formData, setFormData] = React.useState<Partial<Service>>({});

  React.useEffect(() => {
    if (service) {
      setFormData(service);
    } else {
      setFormData({
        title: '',
        description: '',
        category: '',
        price: 0,
        imageUrl: 'https://placehold.co/400x250.png',
        imageHint: 'service technology',
        reviews: [],
      });
    }
  }, [service, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: id === 'price' ? Number(value) : value }));
  };

  const handleSubmit = () => {
    onSave(formData);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-card/80 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">
            {service ? 'Edit Service' : 'Add New Service'}
          </DialogTitle>
          <DialogDescription className="font-body">
            Fill in the details for your service listing.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 font-body">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={formData.title || ''}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input
              id="category"
              value={formData.category || ''}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
           <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price" className="text-right">
              Price ($)
            </Label>
            <Input
              id="price"
              type="number"
              value={formData.price || ''}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={handleSubmit} className="font-headline">
            Save Service
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
