/**
 * @typedef {Object} requiredFieldForClosingLocatorsType
 * @property {string} administrationMenu
 * @property {string} roleBasedSecurityOption
 * @property {string} updateRoleButton
 * @property {string} expandClaimsManagement
 * @property {string} changeCustomerTypeCheckbox
 * @property {string} adminEditClaimButton
 * @property {string} switchCustomerTypeLabel
 * @property {string} requiredFieldsForClosingHeading
 * @property {string} addNewRequiredFieldButton
 * @property {string} deleteSelectedButton
 * @property {string} addNewRequiredFieldModalHeader
 * @property {string} requiredFieldLabel
 * @property {string} modalCloseButton
 */

import { expect } from '@playwright/test';

/** @type {requiredFieldForClosingLocatorsType} */
const requiredFieldForClosingLocators = {
  administrationMenu:
    '#ctl00_RadMenu1 .rmRootGroup > li.rmItem > a.rmLink.rmRootLink > span.rmText.rmExpandDown',
  requiredFieldsForClosingOption: '#ctl00_RadMenu1 .rmSlide ul.rmGroup li.rmItem a.rmLink span.rmText',
  requiredFieldsForClosingHeading: 'span.Heading_blue_rftc',
  addNewRequiredFieldButton: 'input[value="Add New Required Field"].buttonCore.primaryButton',
  deleteSelectedButton: 'input[value="Delete Selected"].buttonCore.tertiaryButton',
  addNewRequiredFieldModalHeader: 'h5#NewFieldModel___BV_modal_title_.modal-title',
  requiredFieldLabel: 'label:has-text("Required Field:")',
  modalCloseButton: '#NewFieldModel___BV_modal_header_ button.close',
};

class RequiredFieldForClosingPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to Required Fields For Closing page
   */
  async navigateToRequiredFieldsForClosing() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');

    // Hover over the "Administration" top menu
    const administrationMenu = this.page.locator(requiredFieldForClosingLocators.administrationMenu, {
      hasText: 'Administration',
    });
    await administrationMenu.hover();

    // Select Required Fields For Closing Option in dropdown
    const requiredFieldsForClosingOption = this.page.locator(
      requiredFieldForClosingLocators.requiredFieldsForClosingOption,
      { hasText: 'Required Fields For Closing' },
    );
    await requiredFieldsForClosingOption.waitFor({
      state: 'visible',
      timeout: 15000,
    });
    await requiredFieldsForClosingOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Assert the Required Fields For Closing heading is visible
   */
  async assertRequiredFieldsForClosingHeading() {
    const heading = this.page.locator(requiredFieldForClosingLocators.requiredFieldsForClosingHeading);
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText('Required Fields For Closing');
  }

  /**
   * Assert the Add New Required Field button is visible
   */
  async assertAddNewRequiredFieldButton() {
    const button = this.page.locator(requiredFieldForClosingLocators.addNewRequiredFieldButton);
    await expect(button).toBeVisible();
    await expect(button).toHaveValue('Add New Required Field');
  }

  /**
   * Assert the Delete Selected button is visible
   */
  async assertDeleteSelectedButton() {
    const button = this.page.locator(requiredFieldForClosingLocators.deleteSelectedButton);
    await expect(button).toBeVisible();
    await expect(button).toHaveValue('Delete Selected');
  }

  /**
   * Click the Add New Required Field button
   */
  async clickAddNewRequiredFieldButton() {
    const button = this.page.locator(requiredFieldForClosingLocators.addNewRequiredFieldButton);
    await button.click();
  }

  /**
   * Assert the Add New Required Field modal header is visible
   */
  async assertAddNewRequiredFieldModalHeader() {
    const header = this.page.locator(requiredFieldForClosingLocators.addNewRequiredFieldModalHeader);
    await expect(header).toBeVisible();
    await expect(header).toHaveText('Add New Required Field');
  }

  /**
   * Assert the Required Field label is present in the modal
   */
  async assertRequiredFieldLabel() {
    const label = this.page.locator(requiredFieldForClosingLocators.requiredFieldLabel);
    await expect(label).toBeVisible();
    await expect(label).toHaveText('Required Field:');
  }

  /**
   * Click the modal close button
   */
  async clickModalCloseButton() {
    const button = this.page.locator(requiredFieldForClosingLocators.modalCloseButton);
    await button.click();
  }
 
}

export default RequiredFieldForClosingPage;
