import { execSync } from 'child_process';

// Run ESLint with auto-fix
console.log('Running ESLint with auto-fix...');
try {
  execSync('pnpm run lint:fix', { stdio: 'inherit' });
  console.log('ESLint completed successfully.');
} catch (error) {
  console.error('ESLint encountered errors:', error.message);
}

// Run Prettier
console.log('Running Prettier...');
try {
  execSync('pnpm run format', { stdio: 'inherit' });
  console.log('Prettier formatting completed successfully.');
} catch (error) {
  console.error('Prettier encountered errors:', error.message);
}

console.log('Code formatting and linting completed.'); 