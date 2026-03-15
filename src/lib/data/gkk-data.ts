export interface GKK {
  id: number;
  name: string;
  address: string;
  foundingAnniversary: string;
  fiesta: string;
  yearEstablished: number | null;
  coordinates: string;
  zone: string;
  parish: string;
  president: string;
  contactNumber: string;
  population: number | null;
  patronSaint: string;
  vicariate: string;
  history: string;
}

import { gkkChunk1 } from './gkk-chunks/chunk1';
import { gkkChunk2 } from './gkk-chunks/chunk2';
import { gkkChunk3 } from './gkk-chunks/chunk3';
import { gkkChunk4 } from './gkk-chunks/chunk4';

export const gkkData: GKK[] = [
  ...gkkChunk1,
  ...gkkChunk2,
  ...gkkChunk3,
  ...gkkChunk4,
];

export function getGKKById(id: number): GKK | undefined {
  return gkkData.find(g => g.id === id);
}

export function searchGKKs(query: string): GKK[] {
  const q = query.toLowerCase().trim();
  if (!q) return gkkData;
  return gkkData.filter(g =>
    g.name.toLowerCase().includes(q) ||
    g.address.toLowerCase().includes(q) ||
    g.patronSaint.toLowerCase().includes(q) ||
    g.parish.toLowerCase().includes(q) ||
    g.vicariate.toLowerCase().includes(q)
  );
}

export function getGKKsByVicariate(vicariate: string): GKK[] {
  return gkkData.filter(g => g.vicariate === vicariate);
}
