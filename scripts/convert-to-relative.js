import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, '../src');

// Function to recursively get all TypeScript files
function getAllTsFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      results = results.concat(getAllTsFiles(fullPath));
    } else if (file.endsWith('.ts')) {
      results.push(fullPath);
    }
  }
  
  return results;
}

// Function to convert a path alias to a relative path
function convertAliasToRelative(currentFilePath, importPath) {
  // Remove the extension for path calculation
  const currentFileDir = path.dirname(currentFilePath);
  
  // Handle @/* alias
  if (importPath.startsWith('@/')) {
    const targetPath = path.join(srcDir, importPath.slice(2));
    return path.relative(currentFileDir, targetPath);
  }
  
  // Handle @config/* alias
  if (importPath.startsWith('@config/')) {
    const targetPath = path.join(srcDir, 'config', importPath.slice(8));
    return path.relative(currentFileDir, targetPath);
  }
  
  // Handle @controllers/* alias
  if (importPath.startsWith('@controllers/')) {
    const targetPath = path.join(srcDir, 'controllers', importPath.slice(13));
    return path.relative(currentFileDir, targetPath);
  }
  
  // Handle @services/* alias
  if (importPath.startsWith('@services/')) {
    const targetPath = path.join(srcDir, 'services', importPath.slice(10));
    return path.relative(currentFileDir, targetPath);
  }
  
  // Handle @routes/* alias
  if (importPath.startsWith('@routes/')) {
    const targetPath = path.join(srcDir, 'routes', importPath.slice(8));
    return path.relative(currentFileDir, targetPath);
  }
  
  // Handle @types/* alias
  if (importPath.startsWith('@types/')) {
    const targetPath = path.join(srcDir, 'types', importPath.slice(7));
    return path.relative(currentFileDir, targetPath);
  }
  
  return importPath;
}

// Function to process a single file
function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  
  // Find all import statements
  const importRegex = /import\s+(?:{[^}]*}\s+from\s+)?['"]([^'"]+)['"]/g;
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    const importPath = match[1];
    
    if (importPath.startsWith('@')) {
      const relativePath = convertAliasToRelative(filePath, importPath);
      
      // Ensure the path starts with ./ or ../
      const formattedPath = relativePath.startsWith('.') 
        ? relativePath 
        : `./${relativePath}`;
      
      // Replace the import path
      content = content.replace(
        new RegExp(`import\\s+(?:{[^}]*}\\s+from\\s+)?['"]${importPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}['"]`), 
        (importStmt) => importStmt.replace(importPath, formattedPath)
      );
      
      modified = true;
    }
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated imports in ${path.relative(process.cwd(), filePath)}`);
  }
}

// Get all TypeScript files and process them
const allFiles = getAllTsFiles(srcDir);
console.log(`Found ${allFiles.length} TypeScript files`);

for (const file of allFiles) {
  processFile(file);
}

console.log('Done converting path aliases to relative paths!'); 