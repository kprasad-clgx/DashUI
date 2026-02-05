import { BasePage } from '../basePage/enterpriseBasePage.po.js';
export class IndividualPage extends BasePage {
  constructor(page) {
    super(page);
    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    this.createIndividualQuickLink = page
      .locator('#ctl00_ctl44_QuickMenudDiv')
      .getByText('Individual', { exact: true });

    // Personal Information Fields
    this.firstNameInput = page.locator('#ctl00_ContentPlaceHolder1_txtFirstName');
    this.lastNameInput = page.locator('#ctl00_ContentPlaceHolder1_txtLastName');
    this.mainPhoneInput = page.locator('#ctl00_ContentPlaceHolder1_txtMainPhone');
    this.companyInput = page.locator('#ctl00_ContentPlaceHolder1_ddlParentComp_Input');
    this.companyDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ddlParentComp_DropDown > div.rcbScroll.rcbWidth > ul > li:nth-child(2)',
    );
    this.contactTypeDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlContactType_Input');
    this.contactTypeDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ddlContactType_DropDown > div > ul > li:nth-child(2)',
    );

    // Contact Information Fields
    this.addressInput = page.locator('#ctl00_ContentPlaceHolder1_txtAddress');
    this.zipCodeInput = page.locator('#ctl00_ContentPlaceHolder1_ctl07_ZipCodeTextBox');
    this.emailInput = page.locator('#ctl00_ContentPlaceHolder1_txtEmail');
    this.countryDropdown = page.locator('#ctl00_ContentPlaceHolder1_ctl07_CountryComboBox_Input');
    this.countryDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ctl07_CountryComboBox_DropDown > div.rcbScroll.rcbWidth > ul > li.rcbHovered',
    );
    this.stateDropdown = page.locator('#ctl00_ContentPlaceHolder1_ctl07_StateComboBox_Input');
    this.stateDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ctl07_StateComboBox_DropDown > div.rcbScroll.rcbWidth > ul > li:nth-child(1)',
    );
    this.countyDropdown = page.locator(
      '#ctl00_ContentPlaceHolder1_ctl07_RegionCountyComboBox_Input',
    );
    this.countyDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ctl07_RegionCountyComboBox_DropDown > div.rcbScroll.rcbWidth > ul > li:nth-child(1)',
    );
    this.cityInput = page.locator('#ctl00_ContentPlaceHolder1_ctl07_CityTextBox');

    // Marketing Fields
    this.referralTypeDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlReferralType');
    this.referralTypeDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ddlReferralType_DropDown > div > ul > li:nth-child(4)',
    );
    this.rankDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlRank');
    this.rankDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ddlRank_DropDown > div > ul > li:nth-child(2)',
    );

    this.byVolumeDropdown = page.locator('#ctl00_ContentPlaceHolder1_ByVolumeRadComboBox');
    this.byVolumeDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ByVolumeRadComboBox_DropDown > div > ul > li:nth-child(2)',
    );

    this.byDollarAmountDropdown = page.locator(
      '#ctl00_ContentPlaceHolder1_DollarAmountRadComboBox',
    );
    this.byDollarAmountDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_DollarAmountRadComboBox_DropDown > div > ul > li.rcbHovered',
    );
    this.groupAndRoutesDropdown = page.locator('#ctl00_ContentPlaceHolder1_ddlGroups');
    this.groupAndRoutesDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ddlGroups_DropDown > div > ul > li.rcbHovered',
    );

    this.salesStatusDropdown = page.locator('#ctl00_ContentPlaceHolder1_SalesStatusRadComboBox');
    this.salesStatusDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_SalesStatusRadComboBox_DropDown > div > ul > li:nth-child(3)',
    );

    this.salesStageDropdown = page.locator('#ctl00_ContentPlaceHolder1_SalesStageRadComboBox');
    this.salesStageDropdownOption = page.locator(
      '#ctl00_ContentPlaceHolder1_SalesStageRadComboBox_DropDown > div > ul > li.rcbHovered',
    );

    // save button
    this.saveButton = page.locator('#ctl00_ContentPlaceHolder1_Button3');
  }

  // Fills personal information fields
  async fillPersonalInformation(individualData) {
    await this.firstNameInput.waitFor({ state: 'visible' });
    await this.firstNameInput.fill(individualData.firstName);
    await this.lastNameInput.fill(individualData.lastName);
    await this.mainPhoneInput.fill(individualData.mainPhone);
    await this.companyInput.click();
    await this.companyDropdownOption.click();
    await this.contactTypeDropdown.click();
    await this.contactTypeDropdownOption.click();
  }
  // Fills contact information fields
  async fillContactInformation(individualData) {
    await this.addressInput.waitFor({ state: 'visible' });
    await this.addressInput.fill(individualData.address);
    await this.emailInput.fill(individualData.email);
  }

  async fillMarketingInformation() {
    await this.referralTypeDropdown.click();
    await this.referralTypeDropdownOption.click();
    await this.rankDropdown.click();
    await this.rankDropdownOption.click();
    await this.byVolumeDropdown.click();
    await this.byVolumeDropdownOption.click();
    await this.byDollarAmountDropdown.click();
    await this.byDollarAmountDropdownOption.click();
    await this.groupAndRoutesDropdown.click();
    await this.groupAndRoutesDropdownOption.click();
    await this.salesStatusDropdown.click();
    await this.salesStatusDropdownOption.click();
    await this.salesStageDropdown.click();
    await this.salesStageDropdownOption.click();
  }
  // Clicks the save button to create the individual
  async saveIndividual() {
    await this.saveButton.click();
  }
  /**
   * Creates a new individual by filling all sections and saving.
   * @param {Object} personalData - Data for personal info section
   * @param {Object} contactData - Data for contact info section
   */
  async createIndividual(personalData, contactData) {
    await this.fillPersonalInformation(personalData);
    await this.fillContactInformation(contactData);
    await this.fillMarketingInformation();
    await this.saveIndividual();
  }
}
