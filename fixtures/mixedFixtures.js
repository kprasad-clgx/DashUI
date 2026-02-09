import { test as base } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { config } from '../config/environment.config.js';
import { setupWalkMeRemoval, setupNavigationWalkMeRemoval } from '../utils/walkmeRemover.js';

/**
 * Custom fixture for tests that need BOTH admin and enterprise authentication
 * Creates separate browser contexts for each role
 * PARALLEL-SAFE: Each page gets isolated notification handling
 */
export const test = base.extend({
  // Admin context with admin authentication
  adminContext: async ({ browser }, use) => {
    const authPath = path.join(process.cwd(), '.auth', 'admin.json');
    
    // Verify auth file exists
    if (!fs.existsSync(authPath)) {
      throw new Error(`Admin auth file not found at ${authPath}. Run global-setup first.`);
    }
    
    const adminContext = await browser.newContext({
      storageState: authPath,
    });
    await use(adminContext);
    await adminContext.close();
  },

  // Enterprise context with enterprise authentication
  enterpriseContext: async ({ browser }, use) => {
    const authPath = path.join(process.cwd(), '.auth', 'enterprise.json');
    
    // Verify auth file exists
    if (!fs.existsSync(authPath)) {
      throw new Error(`Enterprise auth file not found at ${authPath}. Run global-setup first.`);
    }
    
    const enterpriseContext = await browser.newContext({
      storageState: authPath,
    });
    await use(enterpriseContext);
    await enterpriseContext.close();
  },

  // Admin page
  adminPage: async ({ adminContext }, use) => {
    const page = await adminContext.newPage();
    await page.goto(config.admin.baseUrl, { timeout: 60000 }); // Reduced timeout to 60s
    await page.waitForLoadState('domcontentloaded'); // Faster than networkidle

    // 🔧 Remove WalkMe overlays with continuous monitoring
    await setupWalkMeRemoval(page);
    setupNavigationWalkMeRemoval(page);

    await use(page);
    await page.close();
  },

  // Enterprise page
  enterprisePage: async ({ enterpriseContext }, use) => {
    const page = await enterpriseContext.newPage();
    await page.goto(config.enterprise.baseUrl, { timeout: 60000 }); // Reduced timeout to 60s
    await page.waitForLoadState('domcontentloaded'); // Faster than networkidle

    // 🔧 Remove WalkMe overlays with continuous monitoring
    await setupWalkMeRemoval(page);
    setupNavigationWalkMeRemoval(page);

    await use(page);
    await page.close();
  },
});

export { expect } from '@playwright/test';
