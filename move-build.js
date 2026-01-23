const fs = require('fs');
const path = require('path');

function copyRecursive(src, dest) {
  const stat = fs.lstatSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    const items = fs.readdirSync(src);
    items.forEach(item => {
      copyRecursive(path.join(src, item), path.join(dest, item));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

const distPath = path.join(__dirname, 'dist', 'angular-portfolio');
const browserPath = path.join(distPath, 'browser');

// Check if browser folder exists
if (fs.existsSync(browserPath)) {
  console.log('Moving files from browser folder to dist root...');
  
  // Get all files and folders in browser directory
  const items = fs.readdirSync(browserPath);
  
  // Copy each item to dist root
  items.forEach(item => {
    const sourcePath = path.join(browserPath, item);
    const destPath = path.join(distPath, item);
    
    // Remove destination if it exists
    if (fs.existsSync(destPath)) {
      if (fs.lstatSync(destPath).isDirectory()) {
        fs.rmSync(destPath, { recursive: true, force: true });
      } else {
        fs.unlinkSync(destPath);
      }
    }
    
    // Copy the item
    copyRecursive(sourcePath, destPath);
    console.log(`Moved: ${item}`);
  });
  
  // Remove browser folder after copying
  fs.rmSync(browserPath, { recursive: true, force: true });
  console.log('Removed browser folder');
  console.log('Build files are now in dist root!');
} else {
  console.log('No browser folder found, nothing to move.');
}
