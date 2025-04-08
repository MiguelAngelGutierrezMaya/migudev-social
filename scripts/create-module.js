import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleRoot = path.join(__dirname, '../src');

// Get module name from command line
const moduleName = process.argv[2];

if (!moduleName) {
  console.error('Please provide a module name');
  process.exit(1);
}

// Convert module name to kebab-case for directory name
const moduleDir = moduleName.toLowerCase().replace(/\s+/g, '-');

// Create directories
const dirs = [
  path.join(moduleRoot, 'controllers', `${moduleDir}Controller.ts`),
  path.join(moduleRoot, 'services', `${moduleDir}Service.ts`),
  path.join(moduleRoot, 'routes', `${moduleDir}Routes.ts`)
];

// Templates
const controllerTemplate = `import { Request, Response } from 'express';
import ${moduleName}Service from '@services/${moduleDir}Service.js';

/**
 * Controller for handling ${moduleName} operations
 */
class ${moduleName}Controller {
  /**
   * Example method
   * @param req - Express request object
   * @param res - Express response object
   */
  async exampleMethod(req: Request, res: Response): Promise<void> {
    try {
      const result = await ${moduleName}Service.exampleMethod();
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default new ${moduleName}Controller();
`;

const serviceTemplate = `/**
 * Service for ${moduleName} operations
 */
class ${moduleName}Service {
  /**
   * Example method
   * @returns A sample response
   */
  async exampleMethod(): Promise<{ message: string }> {
    // Implement business logic here
    return { message: 'Example service method' };
  }
}

export default new ${moduleName}Service();
`;

const routesTemplate = `import express from 'express';
import ${moduleName}Controller from '@controllers/${moduleDir}Controller.js';

const router = express.Router();

router.get('/${moduleDir}', ${moduleName}Controller.exampleMethod);

export default router;
`;

// Create files with templates
try {
  fs.writeFileSync(dirs[0], controllerTemplate);
  fs.writeFileSync(dirs[1], serviceTemplate);
  fs.writeFileSync(dirs[2], routesTemplate);
  
  console.log(`Module ${moduleName} created successfully with the following files:`);
  dirs.forEach(dir => console.log(`- ${dir}`));
  
  console.log(`\nTo use this module, add the following line to your src/app.ts file:`);
  console.log(`import ${moduleDir}Routes from '@routes/${moduleDir}Routes.js';`);
  console.log(`app.use('/', ${moduleDir}Routes);`);
} catch (error) {
  console.error('Error creating module:', error);
  process.exit(1);
} 