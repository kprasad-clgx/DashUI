// Locators
const EnterpriseLoginPageLocators = {
  companyId: '#txtDashId',
  usernameInput: '#txtUserName',
  passwordInput: '#txtPassword',
  logInButton: '#btnLogIn',
  logoutButton: '#ctl00_lnkLogOut',
};

import { config } from '../../../config/environment.config.js';

class EnterpriseLoginPage {
  constructor(page) {
    this.page = page;
    this.url = config.enterprise.baseUrl;

    if (!this.url) {
      throw new Error(
        `\n❌ Enterprise login URL is not configured!\n` +
          `   Current TEST_ENV: ${config.env}\n` +
          `   Expected variable: ${config.env.toUpperCase()}_ENTERPRISE_LOGIN_URL\n\n` +
          `📝 Please check your .env file and ensure it's properly configured.\n` +
          `💡 See README.md for setup instructions.\n`,
      );
    }
  }

  async navigate() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  }

  async login(companyId, username, password) {
    await this.page
      .locator(EnterpriseLoginPageLocators.companyId)
      .waitFor({ state: 'visible', timeout: 60000 }); // Wait up to 60s for visibility
    await this.page.locator(EnterpriseLoginPageLocators.companyId).fill(companyId);
    await this.page.locator(EnterpriseLoginPageLocators.usernameInput).fill(username);
    await this.page.locator(EnterpriseLoginPageLocators.passwordInput).fill(password);

    // Click login and wait for successful redirect
    const loginButton = this.page.locator(EnterpriseLoginPageLocators.logInButton);
    await loginButton.waitFor({ state: 'visible' });

    // Click the button (this will automatically wait for navigation)
    await loginButton.click();

    // Wait for successful redirect away from login page
    await this.page.waitForURL(
      (url) => {
        const urlString = url.toString();
        return !urlString.includes('Login.aspx') || urlString.includes('uPostLogin.aspx');
      },
      { timeout: 60000 },
    );

    // Wait a moment for the page to stabilize after login
    await this.page.waitForLoadState('domcontentloaded', { timeout: 30000 });
  }

  async enterCompanyId(companyId) {
    await this.page.locator(EnterpriseLoginPageLocators.companyId).fill(companyId);
  }

  async enterUsername(username) {
    await this.page.locator(EnterpriseLoginPageLocators.usernameInput).fill(username);
  }

  async enterPassword(password) {
    await this.page.locator(EnterpriseLoginPageLocators.passwordInput).fill(password);
  }

  async clickLoginButton() {
    await this.page.locator(EnterpriseLoginPageLocators.logInButton).click();
  }

  async logout() {
    await this.page.locator(EnterpriseLoginPageLocators.logoutButton).waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await this.page.locator(EnterpriseLoginPageLocators.logoutButton).click();
    await this.page.waitForURL(/Login/i, { timeout: 10000 });
  }
}

export default EnterpriseLoginPage;
export { EnterpriseLoginPageLocators };
