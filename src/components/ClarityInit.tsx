'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

export default function ClarityInit() {
  useEffect(() => {
    Clarity.init('yn6p74i8ed'); // replace with your actual ID
  }, []);

  return null;
}