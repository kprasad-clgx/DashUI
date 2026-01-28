/**
 * @typedef {Object} EmployeeSecuritySettingsLocatorsType
 * @property {string} administrationMenu
 * @property {string} menuContainer
 * @property {string} employeeSecuritySettingsMenuOption
 * @property {string} groupSecurityTile
 * @property {string} userGroupAccessText
 * @property {string} updateButton
 * @property {string} selectGroupDropdown
 */

/** @type {EmployeeSecuritySettingsLocatorsType} */
const EmployeeSecuritySettingsLocators = {
  administrationMenu: "span:has-text('Administration')",
  menuContainer: 'div.rmSlide[style*="display: block"]',
  employeeSecuritySettingsMenuOption:
    'ul.rmVertical.rmGroup.rmLevel1 li.rmItem a.rmLink span.rmText',
  groupSecurityTile: '#ctl00_ContentPlaceHolder1_EmployeeSettingsDIV .card_34',
  userGroupAccessText: '#ctl00_ContentPlaceHolder1_Label1',
  updateButton: '#ctl00_ContentPlaceHolder1_btnSave',
  selectGroupDropdown: '#ctl00_ContentPlaceHolder1_ddlUser',
};

class EmployeeSecuritySettingsPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Employee Security Settings page through Administration menu
  async navigateToEmployeeSecuritySettings() {
    await this.page.locator(EmployeeSecuritySettingsLocators.administrationMenu).first().hover();
    await this.page
      .locator(EmployeeSecuritySettingsLocators.menuContainer)
      .waitFor({ state: 'visible', timeout: 5000 });
    await this.page
      .locator(EmployeeSecuritySettingsLocators.employeeSecuritySettingsMenuOption, {
        hasText: /^Employee \/ Security Settings$/,
      })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page
      .locator(EmployeeSecuritySettingsLocators.employeeSecuritySettingsMenuOption, {
        hasText: /^Employee \/ Security Settings$/,
      })
      .first()
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Group Security tile is visible
  async verifyGroupSecurityTileVisible() {
    const groupSecurityTile = this.page.locator(EmployeeSecuritySettingsLocators.groupSecurityTile);
    await groupSecurityTile.waitFor({ state: 'visible' });
    return groupSecurityTile;
  }

  async clickGroupSecurityTile() {
    // Wait for the main container to be attached to DOM
    await this.page
      .locator('#ctl00_ContentPlaceHolder1_EmployeeSettingsDIV')
      .waitFor({ state: 'attached', timeout: 25000 });

    // Wait for any visibility state change
    await this.page.waitForTimeout(5000);

    // Find the Group Security card by clicking the header text (more reliable for onclick handlers)
    const card = this.page.locator('.sectionHeaderText:has-text("Group Security")').first();
    await card.waitFor({ state: 'visible', timeout: 15000 });
    await card.scrollIntoViewIfNeeded();
    await card.click({ force: true });
    await this.page.waitForLoadState('networkidle');
  }

  // Verify User Group Access text is visible
  async verifyUserGroupAccessTextVisible() {
    const userGroupAccessText = this.page.locator(
      EmployeeSecuritySettingsLocators.userGroupAccessText,
    );
    await userGroupAccessText.waitFor({ state: 'visible' });
    return userGroupAccessText;
  }

  // Verify User Group Access text has correct content
  async verifyUserGroupAccessTextContent() {
    const userGroupAccessText = this.page.locator(
      EmployeeSecuritySettingsLocators.userGroupAccessText,
    );
    return userGroupAccessText;
  }

  // Verify Update button is disabled by default
  async verifyUpdateButtonDisabled() {
    const updateButton = this.page.locator(EmployeeSecuritySettingsLocators.updateButton);
    return updateButton;
  }

  // Verify Select Group dropdown is visible
  async verifySelectGroupDropdownVisible() {
    const selectGroupDropdown = this.page.locator(
      EmployeeSecuritySettingsLocators.selectGroupDropdown,
    );
    await selectGroupDropdown.waitFor({ state: 'visible' });
    return selectGroupDropdown;
  }

  // Verify Select Group dropdown is enabled
  async verifySelectGroupDropdownEnabled() {
    const selectGroupDropdown = this.page.locator(
      EmployeeSecuritySettingsLocators.selectGroupDropdown,
    );
    return selectGroupDropdown;
  }

  // Select a group option from the dropdown
  async selectGroupOption(optionValue) {
    await this.page
      .locator(EmployeeSecuritySettingsLocators.selectGroupDropdown)
      .selectOption(optionValue);
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Update button is enabled after selection
  async verifyUpdateButtonEnabled() {
    const updateButton = this.page.locator(EmployeeSecuritySettingsLocators.updateButton);
    return updateButton;
  }
}

export default EmployeeSecuritySettingsPage;
