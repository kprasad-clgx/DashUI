/**
 * @typedef {import('@playwright/test').Page} Page
 */

const AddNewDivisionToClaimPageLocators = {
  addNewJobButton: 'a#CreateNewJobButton:has-text("Add New Division +")',
  addEditJobHeader: '.Heading_blue_new',
  adminDivisionDropdown: '#ctl00_ContentPlaceHolder1_DivisionComboBox_Input',
  divisionDropdownItems: '#ctl00_ContentPlaceHolder1_DivisionComboBox_DropDown .rcbItem',
  divisionCheckboxPanel:
    '#ctl00_ContentPlaceHolder1_ctl00_ContentPlaceHolder1_DivisionCheckBoxPanel',
  saveButton: '#ctl00_ContentPlaceHolder1_SaveJobButton',
  modal: '#ctl00_ContentPlaceHolder1_ProgramsModalPopup_foregroundElement',
  modalHeader: '#ctl00_ContentPlaceHolder1_Label_ProgramTitle',
  programDropdownArrow: '#ctl00_ContentPlaceHolder1_ProgramComboBox_Arrow',
  programDropdownItems: '#ctl00_ContentPlaceHolder1_ProgramComboBox_DropDown .rcbItem',
  modalSaveButton: '#ctl00_ContentPlaceHolder1_SaveProgramButton',
  tabContainers: 'div.rtsLevel.rtsLevel1',
  tabsLocator: 'ul.rtsUL > li.rtsLI',
};

class AddNewDivisionToClaimPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Verify Add New Job button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyAddNewJobButtonVisible() {
    return this.page.locator(AddNewDivisionToClaimPageLocators.addNewJobButton);
  }

  /**
   * Click Add New Job button and wait for navigation
   */
  async clickAddNewJobButton() {
    const addNewJobButton = this.page.locator(AddNewDivisionToClaimPageLocators.addNewJobButton);
    await addNewJobButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify Add/Edit Job header is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyAddEditJobHeaderVisible() {
    return this.page.locator(AddNewDivisionToClaimPageLocators.addEditJobHeader, {
      hasText: 'Add/Edit Job',
    });
  }

  /**
   * Click Admin Division dropdown
   */
  async clickAdminDivisionDropdown() {
    const adminDivisionDropdown = this.page.locator(
      AddNewDivisionToClaimPageLocators.adminDivisionDropdown,
    );
    await adminDivisionDropdown.click();
  }

  /**
   * Wait for division dropdown items to be visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async waitForDivisionDropdownItems() {
    const firstItem = this.page
      .locator(AddNewDivisionToClaimPageLocators.divisionDropdownItems)
      .first();
    return firstItem;
  }

  /**
   * Select a random item from the division dropdown
   */
  async selectRandomDivisionItem() {
    const items = await this.page
      .locator(AddNewDivisionToClaimPageLocators.divisionDropdownItems)
      .all();
    const randomIndex = Math.floor(Math.random() * items.length);
    await items[randomIndex].click();
  }

  /**
   * Verify division checkbox panel is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyDivisionCheckboxPanelVisible() {
    return this.page.locator(AddNewDivisionToClaimPageLocators.divisionCheckboxPanel);
  }

  /**
   * Click first checkbox in the division panel
   */
  async clickFirstDivisionCheckbox() {
    const divisionCheckboxPanel = this.page.locator(
      AddNewDivisionToClaimPageLocators.divisionCheckboxPanel,
    );
    const firstCheckbox = divisionCheckboxPanel.locator('input[type="checkbox"]').first();
    await firstCheckbox.click();
  }

  /**
   * Click Save button
   */
  async clickSaveButton() {
    const saveButton = this.page.locator(AddNewDivisionToClaimPageLocators.saveButton);
    await saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify modal is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyModalVisible() {
    return this.page.locator(AddNewDivisionToClaimPageLocators.modal);
  }

  /**
   * Verify modal header is visible and has correct text
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyModalHeader() {
    const modalLocator = this.page.locator(AddNewDivisionToClaimPageLocators.modal);
    return modalLocator.locator(AddNewDivisionToClaimPageLocators.modalHeader);
  }

  /**
   * Click program dropdown arrow to show options
   */
  async clickProgramDropdownArrow() {
    const modalLocator = this.page.locator(AddNewDivisionToClaimPageLocators.modal);
    const programDropdownArrow = modalLocator.locator(
      AddNewDivisionToClaimPageLocators.programDropdownArrow,
    );
    await programDropdownArrow.click();
  }

  /**
   * Wait for program dropdown items to be visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async waitForProgramDropdownItems() {
    const firstProgramOption = this.page
      .locator(AddNewDivisionToClaimPageLocators.programDropdownItems)
      .first();
    return firstProgramOption;
  }

  /**
   * Select first program option from the dropdown
   */
  async selectFirstProgramOption() {
    const firstProgramOption = this.page
      .locator(AddNewDivisionToClaimPageLocators.programDropdownItems)
      .first();
    await this.page.waitForTimeout(200);
    await firstProgramOption.click();
  }

  /**
   * Verify modal save button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyModalSaveButtonVisible() {
    const modalLocator = this.page.locator(AddNewDivisionToClaimPageLocators.modal);
    return modalLocator.locator(AddNewDivisionToClaimPageLocators.modalSaveButton);
  }

  /**
   * Click modal save button
   */
  async clickModalSaveButton() {
    const modalLocator = this.page.locator(AddNewDivisionToClaimPageLocators.modal);
    const modalSaveButton = modalLocator.locator(AddNewDivisionToClaimPageLocators.modalSaveButton);
    await modalSaveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Verify last tab has the class 'rtsLast' (newly added division)
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyLastTabAdded() {
    const tabContainers = this.page.locator(AddNewDivisionToClaimPageLocators.tabContainers);
    const lastTabContainer = tabContainers.last();
    const tabsLocator = lastTabContainer.locator(AddNewDivisionToClaimPageLocators.tabsLocator);
    return tabsLocator.last();
  }

  /**
   * Wait for tabs to be visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async waitForTabsVisible() {
    const tabContainers = this.page.locator(AddNewDivisionToClaimPageLocators.tabContainers);
    const lastTabContainer = tabContainers.last();
    const tabsLocator = lastTabContainer.locator(AddNewDivisionToClaimPageLocators.tabsLocator);
    return tabsLocator.first();
  }
}

export default AddNewDivisionToClaimPage;
