import { expect } from '@playwright/test';

// Environment-specific expected username
// Production: NextGear, Other environments: Admin
const EXPECTED_USERNAME = process.env.NODE_ENV === 'prod' 
  ? 'NextGear' 
  : 'Admin';

class LoggedInUserNamePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Validate logged in user name
   * @param {string} userNameLocator - Locator for user name element
   * @param {string} expectedName - Expected user name (default: "Admin")
   */
    async validateLoggedInUserName(userNameLocator, expectedName = EXPECTED_USERNAME) {
      const loggedInUserName = this.page.locator(userNameLocator);
      await expect(loggedInUserName).toHaveText(expectedName);
  }
}

export default LoggedInUserNamePage;
