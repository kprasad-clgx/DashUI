import { expect } from '@playwright/test';

// Environment-specific expected username
// Production: NextGear, Other environments: Admin
const EXPECTED_USERNAME = process.env.NODE_ENV === 'prod' 
  ? 'NextGear' 
  : 'Admin';

// Expected values for home page validation
const homePageExpectedValues = {
  menuItems: {
    home: 'Home',
    administration: 'Administration',
  },
  user: {
    // Environment-specific: NextGear for prod, Admin for others
    defaultUsername: EXPECTED_USERNAME,
  },
};

// Consolidated locators from adminHomePage and dashAdmin
const AdminHomePageLoc = {
  HomeBtn: "//span[@class='rpText'][normalize-space()='Home']",
  AdministrationBtn: "//span[@class='rpText'][normalize-space()='Administration']",
  LoggedInUserName: '#ctl00_lblLogin',
  MyAccountBtn: '//a[@class="hrefLink"][contains(@href, "aUserPreference.aspx")]',
  LogoutBtn: '#ctl00_lnkLogOut',
  createClaimBtn: '#ctl00_Left1_button_Create_Claim',
};

class DashAdminHomePage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Click Home button
   */
  async clickHomeButton() {
    await this.page.locator(AdminHomePageLoc.HomeBtn).click();
  }

  /**
   * Click Administration button
   */
  async clickAdministrationButton() {
    await this.page.locator(AdminHomePageLoc.AdministrationBtn).click();
  }

  /**
   * Get logged in user name
   */
  async getLoggedInUserName() {
    return await this.page.locator(AdminHomePageLoc.LoggedInUserName).textContent();
  }

  /**
   * Click My Account button
   */
  async clickMyAccountButton() {
    await this.page.locator(AdminHomePageLoc.MyAccountBtn).click();
  }

  /**
   * Click Create Claim button
   */
  async clickCreateClaimBtn() {
    await this.page.locator(AdminHomePageLoc.createClaimBtn).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Click Logout button
   */
  async clickLogoutButton() {
    await this.page.locator(AdminHomePageLoc.LogoutBtn).click();
  }

  /**
   * Validate all home page elements
   */
  async validateAllHomePageElements(homeLocators) {
    // Verify home button
    const homeText = this.page.locator(homeLocators.HomeBtn);
    await expect(homeText).toHaveText(homePageExpectedValues.menuItems.home);

    // Verify Administration button
    const adminText = this.page.locator(homeLocators.AdministrationBtn);
    await expect(adminText).toHaveText(homePageExpectedValues.menuItems.administration);

    // Verify My account button
    const myAccountBtn = this.page.locator(homeLocators.MyAccountBtn);
    await expect(myAccountBtn).toBeVisible();
    await expect(myAccountBtn).toHaveText('My Account');
    await expect(myAccountBtn).toBeEnabled();

    // Verify logged in user name is Admin
    const loggedInUserName = this.page.locator(homeLocators.LoggedInUserName);
    await expect(loggedInUserName).toHaveText(homePageExpectedValues.user.defaultUsername);

    // Verify Logout button text
    const logoutBtn = this.page.locator(homeLocators.LogoutBtn);
    await expect(logoutBtn).toBeVisible();
    await expect(logoutBtn).toHaveText('Logout');
  }
}

export default DashAdminHomePage;
export { AdminHomePageLoc };
