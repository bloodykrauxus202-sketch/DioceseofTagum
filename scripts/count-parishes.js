const fs = require('fs');
const dir = './src/lib/data/gkk-chunks';
const counts = {};

fs.readdirSync(dir).forEach(f => {
  const content = fs.readFileSync(dir + '/' + f, 'utf8');
  const lines = content.split('\n');
  lines.forEach(l => {
    const m = l.match(/parish:\s*['"`]([^'"`]*)['"`]/);
    if (m) {
      counts[m[1]] = (counts[m[1]] || 0) + 1;
    }
  });
});

const pd = fs.readFileSync('./src/lib/data/parish-directory.ts', 'utf8');
// Only match the 'name:' property, avoiding 'priestName:' or 'shortName:'
const pMatch = pd.match(/(?<!priest|short)name:\s*['"`]([^'"`]+)['"`]/g) || [];
const canonical = pMatch.map(s => s.replace(/(?<!priest|short)name:\s*['"`]|['"`]/g, '').trim());

console.log(`Original Parishes Found: ${Object.keys(counts).length}`);

console.log('\\n--- ZEROS (Canonical parishes with 0 matches) ---');
let zeroCount = 0;
canonical.forEach(c => {
  if (!counts[c]) {
    console.log(c);
    zeroCount++;
  }
});
if (zeroCount === 0) console.log("NONE! Perfect mapping achieved.");

console.log('\\n--- TOP UNRECOGNIZED PARISH STRINGS ---');
const unrecognized = Object.keys(counts).filter(k => !canonical.includes(k) && k !== '');
if (unrecognized.length === 0) console.log("NONE! Every single GKK matches exactly.");
unrecognized.sort((a,b)=>counts[b]-counts[a]).slice(0, 30).forEach(k => {
  console.log(`${counts[k]} -> "${k}"`);
});

