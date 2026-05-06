const fs = require('fs');
const path = require('path');

const directories = ['./app', './components'];

const replacements = [
  // Brand Blues -> Light Theme Accent Blues
  { search: /#0077c2/gi, replace: '#1976D2' },
  { search: /#44a8ee/gi, replace: '#90CAF9' },
  { search: /0,119,194/g, replace: '25,118,210' },
  { search: /#0087db/gi, replace: '#0D47A1' },
  
  // Dark text -> New dark text
  { search: /#111827/gi, replace: '#1A1A1A' },
  { search: /#6b7280/gi, replace: '#555555' },
  { search: /#374151/gi, replace: '#333333' },
  
  // Backgrounds
  { search: /#f8fafc/gi, replace: '#F5F7FA' },
  { search: /#f9fafb/gi, replace: '#F5F7FA' },
  
  // Tailwind Text Colors
  { search: /text-gray-900/g, replace: 'text-[#1A1A1A]' },
  { search: /text-gray-800/g, replace: 'text-[#1A1A1A]' },
  { search: /text-gray-700/g, replace: 'text-[#333333]' },
  { search: /text-gray-600/g, replace: 'text-[#555555]' },
  { search: /text-gray-500/g, replace: 'text-[#555555]' },
  { search: /text-gray-400/g, replace: 'text-[#888888]' },
  
  // Tailwind Backgrounds
  { search: /bg-gray-100/g, replace: 'bg-[#F5F7FA]' },
  { search: /bg-gray-50/g, replace: 'bg-[#F5F7FA]' },
  { search: /bg-white/g, replace: 'bg-[#FFFFFF]' },
  
  // Tailwind Borders
  { search: /border-gray-200/g, replace: 'border-[#E3F2FD]' },
  { search: /border-gray-300/g, replace: 'border-[#90CAF9]' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const { search, replace } of replacements) {
        if (search.test(content)) {
          content = content.replace(search, replace);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed theme in ${fullPath}`);
      }
    }
  }
}

directories.forEach(processDirectory);
console.log('Fixed theme for restored files.');
