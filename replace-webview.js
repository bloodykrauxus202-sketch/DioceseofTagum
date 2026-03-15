const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src', 'app');
const webviewRegex = /import\s+WebView\s+from\s+['"]react-native-webview['"];?/g;
// We need to replace the opening tag <WebView down to /> 
// But since the props can vary, we will match <WebView and everything up to />
const webviewTagRegex = /<WebView([\s\S]*?)\/>/g;

function walk(directory) {
  let results = [];
  const list = fs.readdirSync(directory);
  list.forEach(function (file) {
    file = path.join(directory, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
}

const files = walk(dir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  if (webviewRegex.test(content)) {
    // Replace import
    content = content.replace(webviewRegex, "import MapWebView from '@/components/MapWebView';");
    
    // Replace <WebView ... /> with <MapWebView html={htmlVar} />
    content = content.replace(webviewTagRegex, (match) => {
      // Find the html source variable
      // Usually looks like: source={{ html: mapHtml }} or source={{ html: EMPTY_MAP_HTML }}
      const sourceMatch = match.match(/source=\{\{\s*html:\s*([a-zA-Z0-9_]+)\s*\}\}/);
      if (sourceMatch) {
        const htmlVar = sourceMatch[1];
        return `<MapWebView html={${htmlVar}} />`;
      }
      return match; // If we can't find source={{ html: ... }}, leave it alone
    });
    
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
    changed = true;
  }
});
