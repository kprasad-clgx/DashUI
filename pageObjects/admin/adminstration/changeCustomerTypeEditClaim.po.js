/**
 * @typedef {Object} RoleBasedSecurityLocatorsType
 * @property {string} administrationMenu
 * @property {string} roleBasedSecurityOption
 * @property {string} updateRoleButton
 * @property {string} expandClaimsManagement
 * @property {string} changeCustomerTypeCheckbox
 * @property {string} adminEditClaimButton
 * @property {string} switchCustomerTypeLabel
 */

import { expect } from '@playwright/test';

/** @type {RoleBasedSecurityLocatorsType} */
const RoleBasedSecurityLocators = {
  administrationMenu:
    '#ctl00_RadMenu1 .rmRootGroup > li.rmItem > a.rmLink.rmRootLink > span.rmText.rmExpandDown',
  roleBasedSecurityOption: '#ctl00_RadMenu1 .rmSlide ul.rmGroup li.rmItem a.rmLink span.rmText',
  updateRoleButton: '#ctl00_ContentPlaceHolder1_SaveButton',
  expandClaimsManagement: '#ctl00_ContentPlaceHolder1_SecurityRoleTreen0',
  changeCustomerTypeCheckbox: '#ctl00_ContentPlaceHolder1_SecurityRoleTreen3CheckBox',
  adminEditClaimButton: '#ctl00_ContentPlaceHolder1_ClaimInformationControl_EditClaimButton',
  switchCustomerTypeLabel: '#ctl00_ContentPlaceHolder1_lblSwitchCustomerType',
};

class RoleBasedSecurityPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Role Based Security Management page
   */
  async navigateToRoleBasedSecurity() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');

    // Hover over the "Administration" top menu
    const administrationMenu = this.page.locator(RoleBasedSecurityLocators.administrationMenu, {
      hasText: 'Administration',
    });
    await administrationMenu.hover();

    // Select Role Based Security Option in dropdown
    const roleBasedSecurityOption = this.page.locator(
      RoleBasedSecurityLocators.roleBasedSecurityOption,
      { hasText: 'Role Based Security Management' },
    );
    await roleBasedSecurityOption.waitFor({
      state: 'visible',
      timeout: 5000,
    });
    await roleBasedSecurityOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get Update Role button locator
   * @returns {import('@playwright/test').Locator}
   */
  getUpdateRoleButton() {
    return this.page.locator(RoleBasedSecurityLocators.updateRoleButton);
  }

  /**
   * Verify Update Role button is visible
   */
  async verifyUpdateRoleButton() {
    const button = this.getUpdateRoleButton();
    await button.waitFor({ state: 'visible' });
    return button;
  }

  /**
   * Expand Claims Management section
   */
  async expandClaimsManagement() {
    const expandButton = this.page.locator(RoleBasedSecurityLocators.expandClaimsManagement);
    await expandButton.waitFor({ state: 'visible' });
    await expect(expandButton).toBeVisible();
    await expandButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  /**
   * Get Change Customer Type checkbox locator
   * @returns {import('@playwright/test').Locator}
   */
  getChangeCustomerTypeCheckbox() {
    return this.page.locator(RoleBasedSecurityLocators.changeCustomerTypeCheckbox);
  }

  /**
   * Enable Change Customer Type permission
   */
  async enableChangeCustomerType() {
    const checkbox = this.getChangeCustomerTypeCheckbox();
    await checkbox.waitFor({ state: 'visible' });
    await this.page.waitForLoadState('domcontentloaded');
    await expect(checkbox).toBeVisible();
    // Check if the checkbox is already checked
    const isChecked = await checkbox.isChecked();
    if (!isChecked) {
      await checkbox.check();
    }
    return checkbox;
  }

  /**
   * Click Update Role button
   */
  async clickUpdateRoleButton() {
    const button = this.getUpdateRoleButton();
    // Wait for a page reload after clicking the button
    await Promise.all([this.page.waitForLoadState('load', { timeout: 20000 }), button.click()]);
  }

  /**
   * Get Admin Edit Claim button locator
   * @returns {import('@playwright/test').Locator}
   */
  getAdminEditClaimButton() {
    return this.page.locator(RoleBasedSecurityLocators.adminEditClaimButton);
  }

  /**
   * Click Admin Edit Claim button
   */
  async clickAdminEditClaimButton() {
    const button = this.getAdminEditClaimButton();
    await button.waitFor({ state: 'visible' });
    await button.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get Switch Customer Type label locator
   * @returns {import('@playwright/test').Locator}
   */
  getSwitchCustomerTypeLabel() {
    return this.page.locator(RoleBasedSecurityLocators.switchCustomerTypeLabel);
  }

  /**
   * Verify Switch Customer Type label is visible and has correct text
   */
  async verifySwitchCustomerTypeLabel() {
    const label = this.getSwitchCustomerTypeLabel();
    await label.waitFor({ state: 'visible' });
    return label;
  }
}

export default RoleBasedSecurityPage;
