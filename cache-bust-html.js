const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'dist', 'index.html');

if (fs.existsSync(indexPath)) {
  let content = fs.readFileSync(indexPath, 'utf8');
  const timestamp = Date.now();
  
  // Replace .js" and .css" with .js?v=[timestamp]" and .css?v=[timestamp]"
  content = content.replace(/\.js"/g, `.js?v=${timestamp}"`);
  content = content.replace(/\.css"/g, `.css?v=${timestamp}"`);
  
  fs.writeFileSync(indexPath, content, 'utf8');
  console.log(`Successfully cache-busted index.html with timestamp ?v=${timestamp}`);
} else {
  console.warn('Could not find dist/index.html to append cache-busters.');
}
