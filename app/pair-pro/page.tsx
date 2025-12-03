"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PairProRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect any /pair-pro visitors to the single /pair page
    router.replace('/pair');
  }, [router]);

  return null;
}