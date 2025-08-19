"use client";

import * as React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import type { Service } from '@/lib/types';
import { Search, X } from 'lucide-react';

interface ServiceFiltersProps {
  services: Service[];
  onFilterChange: (filteredServices: Service[]) => void;
}

const CATEGORIES = ['All', ...new Set(MOCK_SERVICES.map((s) => s.category))];
const MAX_PRICE = Math.max(...MOCK_SERVICES.map((s) => s.price), 500);

import { MOCK_SERVICES } from '@/lib/mock-data';

export default function ServiceFilters({
  services,
  onFilterChange,
}: ServiceFiltersProps) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [category, setCategory] = React.useState('All');
  const [priceRange, setPriceRange] = React.useState([MAX_PRICE]);

  const applyFilters = React.useCallback(() => {
    let filtered = services;

    if (searchTerm) {
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          s.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category !== 'All') {
      filtered = filtered.filter((s) => s.category === category);
    }

    filtered = filtered.filter((s) => s.price <= priceRange[0]);

    onFilterChange(filtered);
  }, [services, searchTerm, category, priceRange, onFilterChange]);

  React.useEffect(() => {
    applyFilters();
  }, [applyFilters]);
  
  const resetFilters = () => {
    setSearchTerm('');
    setCategory('All');
    setPriceRange([MAX_PRICE]);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg bg-card/50">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 font-body"
        />
      </div>

      <div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="font-body">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat} className="font-body">
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="lg:col-span-1 flex flex-col justify-center gap-2">
         <label className="font-body text-sm text-muted-foreground">
            Max Price: <span className="font-bold text-foreground">${priceRange[0]}</span>
        </label>
        <Slider
          min={0}
          max={MAX_PRICE}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
        />
      </div>

      <div className="flex items-end">
        <Button onClick={resetFilters} variant="ghost" className="w-full font-headline">
          <X className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>
    </div>
  );
}
