// Assertion helpers
import { expect } from '@playwright/test';

export const AddIndividualCustomerLocators = {
  addNewBtn: '#ctl00_ContentPlaceHolder1_individualControl_buttonAddRecordIndividual',
  firstNameInput: '#ctl00_ContentPlaceHolder1_txtFirstName',
  lastNameInput: '#ctl00_ContentPlaceHolder1_txtLastName',
  phoneInput: '#ctl00_ContentPlaceHolder1_txtMainPhone',
  contactTypeDropdown: '#ctl00_ContentPlaceHolder1_ddlContactType_Input',
  contactTypeList: 'ul.rcbList li.rcbItem',
  saveBtn: '#ctl00_ContentPlaceHolder1_btnSaveAndBack',
  address: '#ctl00_ContentPlaceHolder1_txtAddress',
  zipCodeInput: '#ctl00_ContentPlaceHolder1_ctl07_ZipCodeTextBox',
  city: '#ctl00_ContentPlaceHolder1_ctl07_CityTextBox',
};

class AddIndividualCustomerPage {
  constructor(page) {
    this.page = page;
  }

  // Actions
  async hoverContactManager() {
    const contactManagerBtn = this.page.getByText('Contact Manager', {
      exact: true,
    });
    await contactManagerBtn.hover();
  }

  async clickIndividualsMenu() {
    const individualsLink = this.page.getByRole('link', {
      name: 'Individuals',
    });
    await individualsLink.waitFor({ state: 'visible', timeout: 10000 });
    await individualsLink.click();
  }

  async clickAddNewIndividual() {
    await this.page.locator(AddIndividualCustomerLocators.addNewBtn).click();
  }

  async enterFirstName(firstName) {
    await this.page.locator(AddIndividualCustomerLocators.firstNameInput).fill(firstName);
  }

  async enterLastName(lastName) {
    await this.page.locator(AddIndividualCustomerLocators.lastNameInput).fill(lastName);
  }

  async enterAddress(address) {
    await this.page.locator(AddIndividualCustomerLocators.address).fill(address);
  }

  async enterZipCode(zip) {
    await this.page.locator(AddIndividualCustomerLocators.zipCodeInput).fill(zip);
  }

  async enterPhone(phone) {
    await this.page.locator(AddIndividualCustomerLocators.phoneInput).fill(phone);
  }

  async selectContactTypeCustomer(contactType) {
    const dropdown = this.page.locator(AddIndividualCustomerLocators.contactTypeDropdown);
    await dropdown.click();
    await this.page
      .locator(AddIndividualCustomerLocators.contactTypeList)
      .filter({ hasText: new RegExp(`^${contactType}$`) })
      .first()
      .click();
  }

  async clickSaveIndividual() {
    await this.page.locator(AddIndividualCustomerLocators.saveBtn).click();
    await this.page.waitForLoadState('networkidle');
  }

  // ==================== Assertion Methods ====================
  async assertFirstName(expected) {
    await expect(this.page.locator(AddIndividualCustomerLocators.firstNameInput)).toHaveValue(
      expected,
    );
  }

  async assertLastName(expected) {
    await expect(this.page.locator(AddIndividualCustomerLocators.lastNameInput)).toHaveValue(
      expected,
    );
  }

  async assertPhone(expected) {
    await expect(this.page.locator(AddIndividualCustomerLocators.phoneInput)).toHaveValue(expected);
  }

  async assertContactType(expected) {
    await expect(this.page.locator(AddIndividualCustomerLocators.contactTypeDropdown)).toHaveValue(
      expected,
    );
  }

  async assertCity(expected) {
    await expect(this.page.locator(AddIndividualCustomerLocators.city)).toHaveValue(expected);
  }

  async assertSavedUrl() {
    await expect(this.page).toHaveURL(/ContactManager\.aspx\?Active=Individual\d+/);
  }
}

export default AddIndividualCustomerPage;
