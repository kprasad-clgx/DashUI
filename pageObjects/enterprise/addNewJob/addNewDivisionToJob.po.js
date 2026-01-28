/**
 * @typedef {import('@playwright/test').Page} Page
 */

const AddNewDivisionToJobPageLocators = {
  // Use a robust selector: anchor with id and text
  addNewJobLinkButton: 'a#link_LinkJob:has-text("Add New Division +")',
  modalWrapper: '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common',
  modalHeaderText: 'em',
  modalIframeName: 'iframe[name="RadWindow_Common"]',
  divisionDropdownArrow: '#comboBoxDivision_Arrow',
  divisionDropdownItems: '#comboBoxDivision_DropDown .rcbItem',
  saveButton: '#btnSaveLinkedjob',
  tabContainers: 'div.rtsLevel.rtsLevel1',
  tabsLocator: '#ctl00_ContentPlaceHolder1_dockDivision_C_tabStripDivision ul.rtsUL > li.rtsLI',
};

class AddNewDivisionToJobPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Verify Add New Job link button is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyAddNewJobLinkButtonVisible() {
    return this.page.locator(AddNewDivisionToJobPageLocators.addNewJobLinkButton);
  }

  /**
   * Click Add New Job link button to open modal
   */
  async clickAddNewJobLinkButton() {
    const addNewJobLinkButton = this.page.locator(
      AddNewDivisionToJobPageLocators.addNewJobLinkButton,
    );
    await addNewJobLinkButton.click();
  }

  /**
   * Verify modal wrapper is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyModalWrapperVisible() {
    return this.page.locator(AddNewDivisionToJobPageLocators.modalWrapper);
  }

  /**
   * Verify modal header is visible and has correct text
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyModalHeader() {
    const modalWrapper = this.page.locator(AddNewDivisionToJobPageLocators.modalWrapper);
    return modalWrapper.locator(AddNewDivisionToJobPageLocators.modalHeaderText, {
      hasText: 'Add New Division',
    });
  }

  /**
   * Get modal iframe locator
   * @returns {import('@playwright/test').FrameLocator}
   */
  getModalIframe() {
    const modalWrapper = this.page.locator(AddNewDivisionToJobPageLocators.modalWrapper);
    return modalWrapper.frameLocator(AddNewDivisionToJobPageLocators.modalIframeName);
  }

  /**
   * Verify iframe body is visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyIframeBodyVisible() {
    const modalIframe = this.getModalIframe();
    return modalIframe.locator('body');
  }

  /**
   * Click division dropdown arrow inside iframe
   */
  async clickDivisionDropdownArrow() {
    const modalIframe = this.getModalIframe();
    const divisionDropdownArrow = modalIframe.locator(
      AddNewDivisionToJobPageLocators.divisionDropdownArrow,
    );
    await divisionDropdownArrow.click();
  }

  /**
   * Wait for division dropdown options to be visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async waitForDivisionDropdownOptions() {
    const modalIframe = this.getModalIframe();
    const divisionOptions = modalIframe.locator(
      AddNewDivisionToJobPageLocators.divisionDropdownItems,
    );
    return divisionOptions.first();
  }

  /**
   * Select a random division option from the dropdown
   */
  async selectRandomDivisionOption() {
    const modalIframe = this.getModalIframe();
    const divisionOptions = modalIframe.locator(
      AddNewDivisionToJobPageLocators.divisionDropdownItems,
    );
    const count = await divisionOptions.count();
    if (count === 0) throw new Error('No division options found in dropdown.');
    const randomIndex = Math.floor(Math.random() * count);
    await divisionOptions.nth(randomIndex).click();
  }

  /**
   * Select "Aircraft Restoration" from the division dropdown
   */
  async selectAircraftRestoration() {
    const modalIframe = this.getModalIframe();
    const aircraftOption = modalIframe
      .locator(AddNewDivisionToJobPageLocators.divisionDropdownItems)
      .filter({ hasText: 'Aircraft Restoration' });
    await aircraftOption.click();
  }

  /**
   * Verify save button is visible inside iframe
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifySaveButtonVisible() {
    const modalIframe = this.getModalIframe();
    return modalIframe.locator(AddNewDivisionToJobPageLocators.saveButton);
  }

  /**
   * Click save button inside iframe
   */
  async clickSaveButton() {
    const modalIframe = this.getModalIframe();
    const saveButton = modalIframe.locator(AddNewDivisionToJobPageLocators.saveButton);
    await saveButton.click();
  }

  /**
   * Wait for modal to close (wrapper to be hidden)
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async waitForModalToClose() {
    return this.page.locator(AddNewDivisionToJobPageLocators.modalWrapper);
  }

  /**
   * Wait for tabs to be visible
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async waitForTabsVisible() {
    const tabsLocator = this.page.locator(AddNewDivisionToJobPageLocators.tabsLocator);
    return tabsLocator.first();
  }

  /**
   * Verify last tab has the class 'rtsLast' (newly added division)
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyLastTabAdded() {
    // Directly locate the tab with 'rtsLast' class in the division tab strip
    const lastTab = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockDivision_C_tabStripDivision .rtsLast',
    );
    return lastTab;
  }

  /**
   * Wait for the last tab to be visible
   * @returns {Promise<void>}
   */
  async waitForLastTabVisible() {
    const lastTab = await this.verifyLastTabAdded();
    await lastTab.waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Wait for division content to load after tab selection
   * @returns {Promise<void>}
   */
  async waitForDivisionContentLoaded() {
    // Wait for the Compliance Tasks tab to be visible, which indicates division content is loaded
    await this.page
      .locator('#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs')
      .waitFor({ state: 'visible', timeout: 15000 });
  }

  /**
   * Verify last tab text matches expected division name
   * @param {string} divisionName - Expected division name
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyLastTabText(divisionName) {
    const lastTab = await this.verifyLastTabAdded();
    return lastTab.locator('.rtsTxt');
  }

  /**
   * Click the last tab
   * @returns {Promise<void>}
   */
  async clickLastTab() {
    const lastTab = await this.verifyLastTabAdded();
    await lastTab.locator('a').click();
  }

  /**
   * Verify last tab is selected
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyLastTabSelected() {
    const lastTab = await this.verifyLastTabAdded();
    return lastTab.locator('a');
  }

  /**
   * Get last tab HTML for debugging
   * @returns {Promise<string>}
   */
  async getLastTabHTML() {
    const lastTab = await this.verifyLastTabAdded();
    return await lastTab.innerHTML();
  }
}

export default AddNewDivisionToJobPage;
