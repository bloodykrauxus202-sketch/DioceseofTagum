import fs from 'fs';
import path from 'path';

const exactMapping: Record<string, string> = {
  // Variations from GKK data -> Canonical Parish Directory Name
  "Asuncion - Our Lady of the Assumption Parish": "Our Lady of Assumption Parish",
  "Maragusan - San Vicente Ferrer Parish": "San Vicente Ferrer Parish",
  "New Bataan - San Antonio de Padua Parish": "San Antonio de Padua Parish",
  "Monkayo - San Ignacio de Loyola Parish": "San Ignacio de Loyola Parish",
  "Sawata - San Isidro Labrador Parish": "San Isidro Labrador Parish",
  "Monkayo-Babag- N. Señora del Pilar Quasi-Parish": "Nuestra Señora del Pilar Quasi-parish",
  "Panabo - Cagangohan/Gredu - San Agustin Parish": "San Augustine Parish",
  "Compostela - Señor Santiago Apostol Parish": "Señor Santiago Apostol Parish",
  "Monkayo-Pasian- San Vicente Ferrer Q-Parish": "San Vicente Ferrer Quasi-parish",
  "Dujali - San Jose Parish": "San Jose Parish",
  "Montevista - San Jose Parish": "San Jose Parish",
  "Laak - Aguinaldo - San Isidro Labrador Parish": "San Isidro Labrador Parish",
  "Maragusan - Mapawa - Santo Rosario Q-Parish": "Birhen sa Sto. Rosario Parish",
  "Sto. Tomas - San Miguel Parish": "San Miguel Parish",
  "Mawab - San Roque Parish": "San Roque Parish",
  "Sto. Tomas - La Libertad - Nuestra Señora dela Salvacion Q-Parish": "Nuestra Señora de la Salvacion Quasi-parish",
  "Compostela - Gabi - San Francisco Javier Quasi-Parish": "San Francisco Javier Quasi-parish",
  "Mabini - Santo Niño Parish": "Sto. Niño Parish",
  "Kapalong - San Isidro Labrador Parish": "San Isidro Labrador Parish",
  "Laak - Holy Family Parish": "Sagrada Familia Parish",
  "Carmen- Our Lady of Mt. Carmel Parish": "Our Lady of Mt. Carmel Parish",
  "Tagum - Apokon Highway  - Sacred Heart of Jesus Q-Parish": "Sacred Heart of Jesus Quasi-parish",
  "Monkayo - Union - San Isidro Labradorr Quasi-Parish": "San Isidro Labrador Quasi-parish",
  "Kapatagan - San Agustin Quasi-Parish": "San Agustin Quasi-parish",
  "New Bataan - Camanlangan - San Isidro Labrador Chapel": "San Isidro Labrador Quasi-parish",
  "Maco - Diocesan Shrine of our Mother of Perpetual Help Parish": "Diocesan Shrine of Our Mother of Perpetual Help Parish",
  "Laak - Melale - Sto Niño Chapel": "Sto. Niño Quasi-parish",
  "Panabo - Manay - San Isidro Labrador Parish": "San Isidro Labrador Parish",
  "Pantukan - Fuentes - San Antonio de Padua Chapel": "San Antonio de Padua Quasi-parish",
  "Elizalde - Immaculate Conception Q-Parish": "Immaculate Conception Quasi-parish",
  "Sto Tomas - Kimamon - N. S. de la Candelaria Parish": "Nuestra Señora de la Candelaria Parish",
  "St. Therese of the Child Jesus": "Sta. Teresita sa Batang Hesus Parish"
};

const chunksDir = path.join(__dirname, 'src/lib/data/gkk-chunks');
const chunkFiles = fs.readdirSync(chunksDir).filter(f => f.endsWith('.ts'));

let totalReplacements = 0;

for (const file of chunkFiles) {
  const filePath = path.join(chunksDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  let fileChanges = 0;

  for (const [oldName, exactTarget] of Object.entries(exactMapping)) {
    // Check various string literal syntaxes cautiously
    const singleQ = \`parish: '\${oldName}'\`;
    const doubleQ = \`parish: "\${oldName}"\`;
    const backtickQ = \`parish: \\\`\${oldName}\\\`\`;
    
    // Safety check: ensure target name doesn't have quotes inside
    const replacement = \`parish: '\${exactTarget.replace(/'/g, "\\\\'")}'\`;

    if (content.includes(singleQ)) {
      content = content.split(singleQ).join(replacement);
      fileChanges++;
    }
    if (content.includes(doubleQ)) {
      content = content.split(doubleQ).join(replacement);
      fileChanges++;
    }
    if (content.includes(backtickQ)) {
      content = content.split(backtickQ).join(replacement);
      fileChanges++;
    }
  }

  if (fileChanges > 0) {
    fs.writeFileSync(filePath, content);
    totalReplacements += fileChanges;
    console.log(\`Updated \${fileChanges} distinct matches in \${file}\`);
  }
}

console.log(\`\\nDone! Replaced \${totalReplacements} misaligned parish entries using strict mapping.\`);
