import { BreedsProvider } from './BreedsContext';
import React from 'react';

async function getBreeds() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dog-breeds`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch breeds');
  return res.json();
}

export default async function BreedsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const breeds = await getBreeds();

  return (
    <BreedsProvider breeds={breeds}>
      {children}
    </BreedsProvider>
  );
}
