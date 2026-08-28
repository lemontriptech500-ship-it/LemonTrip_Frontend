import React from 'react';
import { Input, Select } from '@/components/ui';
import { Traveller, TravellerType } from '@/types/booking';
import { User, Baby } from 'lucide-react';

interface TravellerFormProps {
  index: number;
  traveller: Traveller;
  onChange: (field: keyof Traveller, value: string) => void;
  errors?: Partial<Record<keyof Traveller, string>>;
}

export function TravellerForm({ index, traveller, onChange, errors = {} }: TravellerFormProps) {
  const isInfant = traveller.type === 'infant';
  
  const getTitleOptions = () => {
    if (isInfant || traveller.type === 'child') {
      return [
        { value: '', label: 'Select' },
        { value: 'Master', label: 'Master' },
        { value: 'Miss', label: 'Miss' },
      ];
    }
    return [
      { value: '', label: 'Select' },
      { value: 'Mr', label: 'Mr' },
      { value: 'Mrs', label: 'Mrs' },
      { value: 'Ms', label: 'Ms' },
      { value: 'Dr', label: 'Dr' },
    ];
  };

  const getHeading = () => {
    switch (traveller.type) {
      case 'adult': return `Adult ${index + 1}`;
      case 'child': return `Child ${index + 1}`;
      case 'infant': return `Infant ${index + 1}`;
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)] p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[var(--color-border)]">
        <div className="w-10 h-10 rounded-full bg-[var(--color-surface-secondary)] flex items-center justify-center text-[var(--color-primary)]">
          {isInfant ? <Baby size={20} /> : <User size={20} />}
        </div>
        <div>
          <h3 className="text-lg font-bold text-[var(--color-text-primary)]">{getHeading()}</h3>
          <p className="text-sm text-[var(--color-text-secondary)]">
            {isInfant ? 'Under 2 years old on date of travel' : traveller.type === 'child' ? '2-11 years old on date of travel' : '12+ years old'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Title */}
        <div className="md:col-span-3">
          <Select
            label="Title"
            value={traveller.title}
            onChange={(e) => onChange('title', e.target.value)}
            error={errors.title}
          >
            {getTitleOptions().map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </div>

        {/* First Name */}
        <div className="md:col-span-4">
          <Input
            label="First Name"
            placeholder="As on passport/ID"
            value={traveller.firstName}
            onChange={(e) => onChange('firstName', e.target.value)}
            error={errors.firstName}
          />
        </div>

        {/* Last Name */}
        <div className="md:col-span-5">
          <Input
            label="Last Name"
            placeholder="As on passport/ID"
            value={traveller.lastName}
            onChange={(e) => onChange('lastName', e.target.value)}
            error={errors.lastName}
          />
        </div>

        {/* Date of Birth */}
        <div className="md:col-span-6">
          <Input
            type="date"
            label="Date of Birth"
            max={today}
            value={traveller.dateOfBirth}
            onChange={(e) => onChange('dateOfBirth', e.target.value)}
            error={errors.dateOfBirth}
          />
        </div>

        {/* Gender */}
        <div className="md:col-span-6">
          <Select
            label="Gender"
            value={traveller.gender}
            onChange={(e) => onChange('gender', e.target.value)}
            error={errors.gender}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </div>
      </div>
    </div>
  );
}
