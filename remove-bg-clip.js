const fs = require('fs');
const path = require('path');

const directories = ['./app', './components'];

function removeBackgroundClip(content) {
  // Regex to remove inline background-clip styles and replace with standard color
  let newContent = content;

  // Pattern 1: Inline styles with backgroundClip in React components
  // It usually looks like:
  // background: "linear-gradient(...", 
  // WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
  // We'll try a regex that matches the whole block or we can just replace WebkitBackgroundClip line and the gradient.
  
  // Actually, a simpler way is to replace WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent"
  // with just color: "#1976D2" and remove the background property if it's there.
  
  newContent = newContent.replace(/background:\s*["'`]linear-gradient[^"'`]*["'`],\s*(WebkitBackgroundClip:\s*["'`]text["'`],?\s*)?(backgroundClip:\s*["'`]text["'`],?\s*)?color:\s*["'`]transparent["'`]/g, 'color: "#1976D2"');

  newContent = newContent.replace(/background:\s*var\(--gradient-[^)]+\),\s*WebkitBackgroundClip:\s*["'`]text["'`],\s*backgroundClip:\s*["'`]text["'`],\s*color:\s*["'`]transparent["'`]/g, 'color: "#1976D2"');

  newContent = newContent.replace(/WebkitBackgroundClip:\s*["'`]text["'`],\s*backgroundClip:\s*["'`]text["'`],\s*color:\s*["'`]transparent["'`]/g, 'color: "#1976D2"');

  // Also replace any lingering WebkitBackgroundClip
  newContent = newContent.replace(/WebkitBackgroundClip:\s*["'`]text["'`]/g, '');
  newContent = newContent.replace(/backgroundClip:\s*["'`]text["'`]/g, '');
  
  return newContent;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = removeBackgroundClip(content);
      
      if (newContent !== content) {
        fs.writeFileSync(fullPath, newContent, 'utf8');
        console.log(`Updated inline backgroundClip in ${fullPath}`);
      }
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Update .text-gold class in globals.css
      if (content.includes('.text-gold {') && content.includes('background-clip: text')) {
        content = content.replace(/\.text-gold\s*\{[^}]*\}/, '.text-gold {\n  color: #1976D2;\n}');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated CSS background-clip in ${fullPath}`);
      }
    }
  }
}

directories.forEach(processDirectory);
console.log('Background clip removal complete.');
