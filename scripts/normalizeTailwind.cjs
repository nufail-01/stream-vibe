const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const exts = ['.js', '.jsx'];
const replacements = [
  [/flex-shrink-0/g, 'shrink-0'],
  [/max-w-screen-xl/g, 'max-w-7xl'],
  [/bg-gradient-to-b/g, 'bg-linear-to-b'],
  [/bg-gradient-to-t/g, 'bg-linear-to-t'],
  [/bg-gradient-to-r/g, 'bg-linear-to-r'],
  [/bg-gradient-to-l/g, 'bg-linear-to-l'],
  [/break-words/g, 'wrap-break-word'],
  [/gap-\[10px\]/g, 'gap-2.5'],
  [/p-\[10px\]/g, 'p-2.5'],
  [/min-h-\[12rem\]/g, 'min-h-48'],
  [/sm:min-h-\[14rem\]/g, 'sm:min-h-56'],
  [/md:min-h-\[16rem\]/g, 'md:min-h-64'],
  [/lg:min-h-\[18rem\]/g, 'lg:min-h-72'],
  [/min-h-\[14rem\]/g, 'min-h-56'],
  [/sm:min-h-\[16rem\]/g, 'sm:min-h-64'],
  [/md:min-h-\[18rem\]/g, 'md:min-h-72'],
  [/min-h-\[20rem\]/g, 'min-h-80'],
  [/sm:min-h-\[24rem\]/g, 'sm:min-h-96'],
  [/md:min-h-\[32rem\]/g, 'md:min-h-128'],
  [/lg:min-h-\[35rem\]/g, 'lg:min-h-140'],
  [/sm:min-h-\[20rem\]/g, 'sm:min-h-80'],
  [/md:min-h-\[22rem\]/g, 'md:min-h-88'],
  [/lg:min-h-\[24rem\]/g, 'lg:min-h-96'],
];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walk(fullPath);
      continue;
    }
    const ext = path.extname(entry.name);
    if (!exts.includes(ext)) continue;
    let content = fs.readFileSync(fullPath, 'utf8');
    let modified = content;
    for (const [find, replace] of replacements) {
      modified = modified.replace(find, replace);
    }
    if (modified !== content) {
      fs.writeFileSync(fullPath, modified, 'utf8');
      console.log('Updated', fullPath);
    }
  }
}
walk(root);
console.log('Normalization complete.');
