import { chromium } from '@playwright/test';
import { config } from './config/environment.config.js';
import { browserConfig } from './config/browser.config.js';
import EnterpriseLoginPage from './pageObjects/enterprise/loginPage/enterpriseLoginPage.po.js';
import AdminLoginPage from './pageObjects/admin/adminLoginPage/adminLoginPage.po.js';
import fs from 'fs';

async function globalSetup() {
  console.log('Setting up authentication states...');

  const authDir = '.auth';
  fs.mkdirSync(authDir, { recursive: true });

  // Check if existing auth files are valid
  const shouldRecreateAuth = await shouldRecreateAuthFiles();

  if (shouldRecreateAuth) {
    console.log('✓ Creating fresh authentication files');

    // Setup Enterprise authentication
    const enterpriseBrowser = await chromium.launch();
    const enterpriseContext = await enterpriseBrowser.newContext({
      ...browserConfig,
      storageState: undefined,
    });
    const enterprisePage = await enterpriseContext.newPage();

    const enterpriseLoginPage = new EnterpriseLoginPage(enterprisePage);
    await enterpriseLoginPage.navigate();
    await enterpriseLoginPage.login(
      config.enterprise.credentials.companyId,
      config.enterprise.credentials.username,
      config.enterprise.credentials.password,
    );

    // Login successful, save enterprise authentication state
    await enterpriseContext.storageState({ path: '.auth/enterprise.json' });
    await enterpriseBrowser.close();

    console.log('✓ Enterprise authentication saved');
  } else {
    console.log('✓ Using existing valid authentication files');
  }

  // Setup Admin authentication
  if (shouldRecreateAuth) {
    const adminBrowser = await chromium.launch();
    const adminContext = await adminBrowser.newContext({
      ...browserConfig,
      storageState: undefined,
    });
    const adminPage = await adminContext.newPage();

    const adminLoginPage = new AdminLoginPage(adminPage);
    await adminLoginPage.navigate();
    await adminLoginPage.login(
      config.admin.credentials.username,
      config.admin.credentials.password,
    );

    // Login successful, save admin authentication state
    await adminContext.storageState({ path: '.auth/admin.json' });
    await adminBrowser.close();

    console.log('✓ Admin authentication saved');
  }

  console.log('Authentication setup complete!\n');
}

/**
 * Check if existing auth files are still valid
 * @returns {Promise<boolean>} true if auth should be recreated, false if existing auth is valid
 */
async function shouldRecreateAuthFiles() {
  const enterpriseAuthPath = '.auth/enterprise.json';
  const adminAuthPath = '.auth/admin.json';

  // If either file doesn't exist, recreate
  if (!fs.existsSync(enterpriseAuthPath) || !fs.existsSync(adminAuthPath)) {
    return true;
  }

  // Validate enterprise auth
  try {
    const testBrowser = await chromium.launch({ headless: true });
    const testContext = await testBrowser.newContext({
      storageState: enterpriseAuthPath,
      ...browserConfig,
    });
    const testPage = await testContext.newPage();

    // Try to navigate to protected page
    await testPage.goto(config.enterprise.baseUrl, { timeout: 15000 });

    // Check if we're still logged in (not redirected to login page)
    const currentUrl = testPage.url();
    const isLoggedIn = !currentUrl.includes('Login.aspx') && !currentUrl.includes('login');

    await testBrowser.close();

    // If not logged in, auth files are stale
    return !isLoggedIn;
  } catch (error) {
    // If validation fails, recreate auth
    console.log('⚠ Auth validation failed, recreating...');
    return true;
  }
}

export default globalSetup;
