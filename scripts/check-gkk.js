const fs = require('fs');

const dir = './src/lib/data/gkk-chunks';
const files = fs.readdirSync(dir);
const counts = {};

files.forEach(f => {
  const content = fs.readFileSync(dir + '/' + f, 'utf8');
  const lines = content.split('\n');
  lines.forEach(l => {
    if (l.includes('parish: \'') || l.includes('parish: "')) {
      const m = l.match(/parish:\s*['"]([^'"]+)['"]/);
      if (m) {
        counts[m[1]] = (counts[m[1]] || 0) + 1;
      }
    }
  });
});

const pd = fs.readFileSync('./src/lib/data/parish-directory.ts', 'utf8');
const pMatch = pd.match(/name:\s*['"]([^'"]+)['"]/g) || [];
const canonical = pMatch.map(s => s.replace(/name:\s*['"]|['"]/g, ''));

console.log('--- ZEROS ---');
canonical.forEach(c => {
  if (!counts[c]) {
    console.log(c);
  } else if (counts[c] > 500) {
    console.log(`HIGH: ${c} -> ${counts[c]}`);
  }
});

console.log('\n--- TOP 20 UNMATCHED GKK PARISHES ---');
Object.keys(counts)
  .filter(k => !canonical.includes(k))
  .sort((a,b)=>counts[b]-counts[a])
  .slice(0, 20)
  .forEach(k => console.log(`${k} -> ${counts[k]}`));
