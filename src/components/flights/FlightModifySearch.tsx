import React from 'react';
import { Modal } from '@/components/ui';
import { FlightSearchForm } from '@/components/search/FlightSearchForm';

interface FlightModifySearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FlightModifySearch({ isOpen, onClose }: FlightModifySearchProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Modify Search"
      size="xl"
    >
      <div className="pt-2">
        <FlightSearchForm />
      </div>
    </Modal>
  );
}
