import fs from 'fs';
import path from 'path';
import { parishes } from './src/lib/data/parish-directory';
import { gkkData } from './src/lib/data/gkk-data';

// Map of canonical names from the parish-directory
const canonicalNames = parishes.map(p => p.name);

// Map of unique names currently in gkk-data
const currentGkkParishes = [...new Set(gkkData.map(g => g.parish))];

console.log(`Found ${canonicalNames.length} canonical parishes and ${currentGkkParishes.length} unique GKK parishes.`);

// Let's create a mapping from old -> new
const mapping: Record<string, string> = {};

// Helper to normalize names for comparison
const normalize = (name: string) => name.toLowerCase().replace(/[^a-z0-9]/g, '');

const canonicalNormalized = canonicalNames.map(name => ({ original: name, normalized: normalize(name) }));

for (const gkkName of currentGkkParishes) {
  const normGkk = normalize(gkkName);
  
  // Exact normalized match?
  let match = canonicalNormalized.find(c => c.normalized === normGkk);
  
  // If no exact match, try fuzzy (contains)
  if (!match) {
    match = canonicalNormalized.find(c => normGkk.includes(c.normalized) || c.normalized.includes(normGkk));
  }
  
    // Custom manual mappings based on common discrepancies
  if (!match) {
    if (gkkName === 'St. Therese of the Child Jesus') match = canonicalNormalized.find(c => c.original === 'Sta. Teresita sa Batang Hesus Parish');
    if (gkkName === 'Monkayo - Union - San Isidro Labradorr Quasi-Parish') match = canonicalNormalized.find(c => c.original === 'San Isidro Labrador Quasi-parish' && parishes.find(p => p.name === c.original && p.location.includes('Union')));
    if (gkkName === 'Monkayo-Babag- N. Señora del Pilar Quasi-Parish') match = canonicalNormalized.find(c => c.original === 'Nuestra Señora del Pilar Quasi-parish');
    if (gkkName === 'Monkayo-Pasian- San Vicente Ferrer Q-Parish') match = canonicalNormalized.find(c => c.original === 'San Vicente Ferrer Quasi-parish' && parishes.find(p => p.name === c.original && p.location.includes('Pasian')));
    if (gkkName === 'Maragusan - Mapawa - Santo Rosario Q-Parish') match = canonicalNormalized.find(c => c.original === 'Birhen sa Sto. Rosario Parish');
    if (gkkName === 'Pantukan - Fuentes - San Antonio de Padua Chapel') match = canonicalNormalized.find(c => c.original === 'San Antonio de Padua Quasi-parish' && parishes.find(p => p.name === c.original && p.location.includes('Fuentes')));
    if (gkkName === 'Sto. Tomas - La Libertad - Nuestra Señora dela Salvacion Q-Parish') match = canonicalNormalized.find(c => c.original === 'Nuestra Señora de la Salvacion Quasi-parish');
    if (gkkName === 'Laak - Melale - Sto Niño Chapel') match = canonicalNormalized.find(c => c.original === 'Sto. Niño Quasi-parish' && parishes.find(p => p.name === c.original && p.location.includes('Melale')));
    if (gkkName === 'Elizalde - Immaculate Conception Q-Parish') match = canonicalNormalized.find(c => c.original === 'Immaculate Conception Quasi-parish');
    if (gkkName === 'Panabo - Cagangohan/Gredu - San Agustin Parish') match = canonicalNormalized.find(c => c.original === 'San Augustine Parish');
    if (gkkName === 'Laak - Holy Family Parish') match = canonicalNormalized.find(c => c.original === 'Sagrada Familia Parish');
    if (gkkName === 'Mabini - Santo Niño Parish') match = canonicalNormalized.find(c => c.original === 'Sto. Niño Parish' && parishes.find(p => p.name === c.original && p.location.includes('Mabini')));
    if (gkkName === 'Sto Tomas - Kimamon - N. S. de la Candelaria Parish') match = canonicalNormalized.find(c => c.original === 'Nuestra Señora de la Candelaria Parish');
    if (gkkName === 'New Bataan - Camanlangan - San Isidro Labrador Chapel') match = canonicalNormalized.find(c => c.original === 'San Isidro Labrador Quasi-parish' && parishes.find(p => p.name === c.original && p.location.includes('Camanlangan')));
    if (gkkName === 'Tagum - Apokon Highway  - Sacred Heart of Jesus Q-Parish') match = canonicalNormalized.find(c => c.original === 'Sacred Heart of Jesus Quasi-parish');
    if (gkkName === '') match = { original: '', normalized: '' }; // Ignore empty
    if (gkkName === 'Assumption Academy of Mawab, Inc.') match = { original: gkkName, normalized: gkkName }; // Handled elsewhere
  }

  if (match && match.original !== gkkName) {
    mapping[gkkName] = match.original;
    console.log(`Mapping: "${gkkName}" -> "${match.original}"`);
  } else if (!match) {
    console.log(`WARNING: NO MATCH FOUND FOR: "${gkkName}"`);
  }
}

// Now rewrite the gkk-chunk files
const chunksDir = path.join(__dirname, 'src/lib/data/gkk-chunks');
const chunkFiles = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));

let totalReplaceCount = 0;

for (const file of chunkFiles) {
  const filePath = path.join(chunksDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let replacedInFile = 0;
  
  for (const [oldName, newName] of Object.entries(mapping)) {
    const searchStrs = [
      `parish: '${oldName}'`,
      `parish: "${oldName}"`,
      `parish: \`${oldName}\``
    ];
    
    for (const s of searchStrs) {
      if (content.includes(s)) {
        const replacement = `parish: '${newName}'`; 
        content = content.split(s).join(replacement);
        replacedInFile++;
      }
    }
  }
  
  if (replacedInFile > 0) {
    fs.writeFileSync(filePath, content);
    totalReplaceCount += replacedInFile;
  }
}

console.log(`Rewrote gkk-chunks, replacing ${totalReplaceCount} unique variations.`);
