import { test as base } from '@playwright/test';
import { config } from '../config/environment.config.js';
import EnterpriseLoginPage from '../pageObjects/enterprise/loginPage/enterpriseLoginPage.po.js';

/**
 * Custom fixture for Enterprise tests using storage state
 * Session is already authenticated via global setup
 * Automatically re-authenticates if session is invalid
 */
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    // Navigate to base URL to activate the storage state session
    await page.goto(config.enterprise.baseUrl, { timeout: 500000 }); // Increased timeout to 5 minutes
    await page.waitForLoadState('networkidle'); // Changed to 'networkidle' for dynamic content

    // Check if we're on the actual login page (not post-login redirect)
    const currentUrl = page.url();
    const isOnLoginPage =
      currentUrl.includes('Login.aspx') && !currentUrl.includes('uPostLogin.aspx');

    if (isOnLoginPage) {
      console.log('⚠ Session expired or invalid, re-authenticating...');

      // Re-authenticate
      const enterpriseLoginPage = new EnterpriseLoginPage(page);
      await enterpriseLoginPage.login(
        config.enterprise.credentials.companyId,
        config.enterprise.credentials.username,
        config.enterprise.credentials.password,
      );

      // Save new auth state
      await page.context().storageState({ path: '.auth/enterprise.json' });
      console.log('✓ Re-authentication successful');
    }

    // Now page is authenticated and ready to use
    await use(page);
    // No logout needed - session persists across tests
  },
});

export { expect } from '@playwright/test';
