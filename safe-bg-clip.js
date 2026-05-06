const fs = require('fs');
const path = require('path');

const dir = './components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx')) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Safely remove background clips
    let newContent = content;
    
    // Matches: background: "linear-gradient(...)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
    newContent = newContent.replace(/background:\s*["'`]linear-gradient\([^)]+\)["'`],\s*WebkitBackgroundClip:\s*["'`]text["'`],\s*backgroundClip:\s*["'`]text["'`],\s*color:\s*["'`]transparent["'`]/g, 'color: "#1976D2"');
    
    // Matches with backgroundSize and animation
    newContent = newContent.replace(/background:\s*["'`]linear-gradient\([^)]+\)["'`],\s*backgroundSize:\s*["'`][^"'`]+["'`],\s*animation:\s*["'`][^"'`]+["'`],\s*WebkitBackgroundClip:\s*["'`]text["'`],\s*backgroundClip:\s*["'`]text["'`],\s*color:\s*["'`]transparent["'`]/g, 'color: "#1976D2"');
    
    // Matches: background: "var(--gradient-...)", etc
    newContent = newContent.replace(/background:\s*["'`]var\(--gradient-[^"'`]+\)["'`],\s*WebkitBackgroundClip:\s*["'`]text["'`],\s*backgroundClip:\s*["'`]text["'`],\s*color:\s*["'`]transparent["'`]/g, 'color: "#1976D2"');
    
    if (newContent !== content) {
      fs.writeFileSync(fullPath, newContent, 'utf8');
      console.log(`Fixed backgroundClip safely in ${fullPath}`);
    }
  }
});
