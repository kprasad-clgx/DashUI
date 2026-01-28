import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function analyzeFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const results = [];

    lines.forEach((line, index) => {
      const lineNum = index + 1;

      // Match import statements
      if (line.trim().startsWith('import ')) {
        const importedItems = [];

        // Default import: import Something from '...'
        const defaultMatch = line.match(/import\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s+from/);
        if (defaultMatch) {
          importedItems.push(defaultMatch[1]);
        }

        // Named imports: import { Item1, Item2 } from '...'
        const namedMatch = line.match(/import\s+\{([^}]+)\}/);
        if (namedMatch) {
          const named = namedMatch[1].split(',').map((item) =>
            item
              .trim()
              .replace(/\s+as\s+.*$/, '')
              .trim(),
          );
          importedItems.push(...named);
        }

        // Check each imported item
        importedItems.forEach((item) => {
          if (item && item !== 'type') {
            // Remove import lines from content for checking
            const contentWithoutImports = lines
              .filter((l) => !l.trim().startsWith('import '))
              .join('\n');

            // Create regex to find usage
            const escapedItem = item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp('\\b' + escapedItem + '\\b', 'g');
            const matches = contentWithoutImports.match(regex);

            if (!matches || matches.length === 0) {
              results.push({
                file: filePath.replace(path.resolve('.'), '.').replace(/\\/g, '/'),
                line: lineNum,
                import: line.trim(),
                unused: item,
              });
            }
          }
        });
      }
    });

    return results;
  } catch (e) {
    console.error(`Error analyzing ${filePath}:`, e.message);
    return [];
  }
}

function scanDirectory(dir) {
  let results = [];

  try {
    const items = fs.readdirSync(dir);

    items.forEach((item) => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        results = results.concat(scanDirectory(fullPath));
      } else if (item.endsWith('.js') && !item.endsWith('.spec.js.backup')) {
        results = results.concat(analyzeFile(fullPath));
      }
    });
  } catch (e) {
    console.error(`Error scanning directory ${dir}:`, e.message);
  }

  return results;
}

console.log('='.repeat(80));
console.log('UNUSED IMPORTS SCAN REPORT');
console.log('='.repeat(80));
console.log('');

console.log('Scanning tests directory...');
const testResults = scanDirectory('tests');
console.log(`Found ${testResults.length} unused imports in tests/`);
console.log('');

console.log('Scanning pageObjects directory...');
const poResults = scanDirectory('pageObjects');
console.log(`Found ${poResults.length} unused imports in pageObjects/`);
console.log('');

const allResults = [...testResults, ...poResults];

console.log('='.repeat(80));
console.log(`TOTAL UNUSED IMPORTS FOUND: ${allResults.length}`);
console.log('='.repeat(80));
console.log('');

// Group by file
const byFile = {};
allResults.forEach((r) => {
  if (!byFile[r.file]) {
    byFile[r.file] = [];
  }
  byFile[r.file].push(r);
});

// Output results grouped by file
Object.keys(byFile)
  .sort()
  .forEach((file) => {
    console.log(`FILE: ${file}`);
    byFile[file].forEach((r) => {
      console.log(`LINE ${r.line}: ${r.import}`);
      console.log(`REASON: ${r.unused} is never used in the file`);
      console.log('');
    });
  });

console.log('='.repeat(80));
console.log('SUMMARY');
console.log('='.repeat(80));
console.log(`Total files with unused imports: ${Object.keys(byFile).length}`);
console.log(`Total unused imports: ${allResults.length}`);
console.log('');

// Save to file
const outputFile = 'UNUSED_IMPORTS_REPORT.txt';
const reportContent = allResults
  .map(
    (r) =>
      `FILE: ${r.file}\nLINE ${r.line}: ${r.import}\nREASON: ${r.unused} is never used in the file\n`,
  )
  .join('\n');

fs.writeFileSync(outputFile, reportContent);
console.log(`Report saved to ${outputFile}`);
