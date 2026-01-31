import { expect } from '@playwright/test';
import { getRandomNumber } from '../../../utils/randomNumber.js';
import standardProgramData from '../../../testData/admin/Adminstration/standardProgram.json' with { type: 'json' };

const { standardProgram } = standardProgramData;

const CreateClaimLocators = {
  // Create Claim Button
  createClaimBtn: '#ctl00_Left1_button_Create_Claim',

  // Caller Section
  callerDropdownArrow: '#ctl00_ContentPlaceHolder1_ddlCaller_Arrow',
  callerDropdownList: '#ctl00_ContentPlaceHolder1_ddlCaller_DropDown .rcbList',
  callerInput: '#ctl00_ContentPlaceHolder1_ddlCaller_Input',

  // Reported By Section
  reportedByDropdownArrow: '#ctl00_ContentPlaceHolder1_rcbReportedBy_Arrow',
  reportedByDropdownList:
    '#ctl00_ContentPlaceHolder1_rcbReportedBy_DropDown>.rcbScroll>.rcbList>li',

  // Client/Insurance Company Section
  insuranceCompanyDropdownArrow: '#ctl00_ContentPlaceHolder1_ddlInsuranceCompany_Arrow',
  insuranceCompanyInput: '#ctl00_ContentPlaceHolder1_ddlInsuranceCompany_Input',
  insuranceCompanyDropdownList:
    '#ctl00_ContentPlaceHolder1_ddlInsuranceCompany_DropDown>.rcbScroll>.rcbList>li',

  // Customer Information
  firstNameInput: '#ctl00_ContentPlaceHolder1_txtFirstName',
  lastNameInput: '#ctl00_ContentPlaceHolder1_txtLastName',
  addressInput: '#ctl00_ContentPlaceHolder1_txtAddress_Input',
  zipInput: '#ctl00_ContentPlaceHolder1_txtZip',
  cityInput: '#ctl00_ContentPlaceHolder1_txtCity',
  countryInput: '#ctl00_ContentPlaceHolder1_ddlCountry_Input',
  countryDropdownList: '#ctl00_ContentPlaceHolder1_ddlCountry_DropDown>.rcbScroll>.rcbList>li',
  stateInput: '#ctl00_ContentPlaceHolder1_ddlState_Input',
  stateDropdownList: '#ctl00_ContentPlaceHolder1_ddlState_DropDown>.rcbScroll>.rcbList>li',
  mainPhoneInput: '#ctl00_ContentPlaceHolder1_txtMainPhone',
  sameAddressCheckbox: '#ctl00_ContentPlaceHolder1_chkSameAddress',

  // Loss Information
  datePickerButton: '#ctl00_ContentPlaceHolder1_RadDatePicker1_popupButton',
  todayDateCell: 'td.rcToday a',
  sourceOfLossDropdownArrow: '#ctl00_ContentPlaceHolder1_SourceOfLossComboBox_Arrow',
  sourceOfLossDropdownList:
    '#ctl00_ContentPlaceHolder1_SourceOfLossComboBox_DropDown>.rcbScroll>.rcbList>li',
  lossTypeDropdownArrow: '#ctl00_ContentPlaceHolder1_rcbLossType_Arrow',
  lossTypeDropdownList: '#ctl00_ContentPlaceHolder1_rcbLossType_DropDown>.rcbScroll>.rcbList>li',
  waterMitigationCheckbox: '#ctl00_ContentPlaceHolder1_chkDivision_31',
  lossDescriptionInput: '#ctl00_ContentPlaceHolder1_txtLossDescription',
  artRestorationCheckbox: '#ctl00_ContentPlaceHolder1_chkDivision_0',

  // Preferred Provider
  preferredProviderDropdownArrow: '#ctl00_ContentPlaceHolder1_PreferredProviderComboBox_Arrow',
  preferredProviderInput: '#ctl00_ContentPlaceHolder1_PreferredProviderComboBox_Input',
  preferredProviderDropdownList:
    '#ctl00_ContentPlaceHolder1_PreferredProviderComboBox_DropDown .rcbList',
  preferredProviderOptions:
    '#ctl00_ContentPlaceHolder1_PreferredProviderComboBox_DropDown .rcbList > li',

  // Save and Navigation
  saveAndGoToSlideboardButton: '#ctl00_ContentPlaceHolder1_Button_SaveAndGoToSlideBoardBottom',
  saveAndDispatchButton: '#ctl00_ContentPlaceHolder1_Button_SaveAndDispatchBottom',

  // Slideboard - Assign Program
  assignProgramIframe: 'iframe[name="RadWindow_AssignProgram1"]',
  assignProgramButton:
    'input[type="submit"], button[type="submit"], input[value*="Assign"], button:has-text("Assign")',

  // Slideboard - Job Information
  jobReferenceLocator:
    '#ctl00_ContentPlaceHolder1_ClaimInformationControl_ClaimInformationPanel_RadDock1_C_FirstPanel > table > tbody > tr:nth-child(1) > td:nth-child(1) > span:nth-child(2)',
  assignJobButton: 'input[type="button"][value="Assign Job"]',

  // Dispatch
  dispatchButton: '#ctl00_ContentPlaceHolder1_RadDock2_C_PreferedProviderButton',
  dispatchIframe: 'iframe[name="DispatchJobwindow"]',
  attemptCallLink: '#idAttemptCall1',
  finalAssignButton: '#btnSuccess',
  dispatchCloseButton:
    '#RadWindowWrapper_ctl00_DispatchJobwindow ul.rwControlButtons > li > a.rwCloseButton[title="Close"]',
};

class CreateClaimPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Select caller from dropdown
   * @param {string} callerName - The caller name to select
   */
  async selectCaller(callerName) {
    await this.page.locator(CreateClaimLocators.callerDropdownArrow).click();
    const callerDropdownList = this.page.locator(CreateClaimLocators.callerDropdownList);
    await expect(callerDropdownList).toBeVisible({ timeout: 10000 });

    const callerInput = this.page.locator(CreateClaimLocators.callerInput);
    await callerInput.click();

    // Type caller name sequentially
    await this.typeSequentially(callerInput, callerName, 500);

    // Wait for dropdown options to be filtered and visible
    const dropdownOptions = this.page.locator(`${CreateClaimLocators.callerDropdownList} > li`);
    await dropdownOptions.first().waitFor({ state: 'visible', timeout: 15000 });

    // Select matching caller from dropdown that contains the caller name
    const callerOption = dropdownOptions.filter({ hasText: new RegExp(callerName, 'i') });
    await callerOption.first().click();
  }

  /**
   * Select reported by - Random selection from first 10 options
   */
  async selectReportedBy() {
    await this.page.locator(CreateClaimLocators.reportedByDropdownArrow).click();

    // Wait for dropdown list to be visible
    const dropdownOptions = this.page.locator(CreateClaimLocators.reportedByDropdownList);
    await dropdownOptions.first().waitFor({ state: 'visible', timeout: 10000 });

    // Get count of available options (max 10)
    const optionsCount = await dropdownOptions.count();
    const maxOptions = Math.min(optionsCount, 10);

    // Select random option from 0 to maxOptions-1
    const randomIndex = Math.floor(Math.random() * maxOptions);
    await dropdownOptions.nth(randomIndex).click();
  }

  /**
   * Select client/insurance company - Import from claimData.json
   * @param {string} client - The company name to type and select
   */
  /**
   * Select insurance company by typing companyName and picking the second matching option
   * @param {string} client - The company name to type and select
   */
  async selectInsuranceCompany(client) {
    await this.page.locator(CreateClaimLocators.insuranceCompanyDropdownArrow).click();
    const inputLocator = this.page.locator(CreateClaimLocators.insuranceCompanyInput);
    await inputLocator.click();
    await inputLocator.fill('');
    for (const char of client) {
      await inputLocator.focus();
      await inputLocator.type(char);
      await this.page.waitForTimeout(300);
    }
    // Wait for dropdown to appear and select the second matching option
    const dropdownOptions = this.page.locator(CreateClaimLocators.insuranceCompanyDropdownList);
    await dropdownOptions.first().waitFor({ state: 'visible', timeout: 5000 });
    // Filter options that contain the client text (partial match)
    const matchingOptions = dropdownOptions.filter({ hasText: new RegExp(client, 'i') });
    await matchingOptions.waitFor({ state: 'visible', timeout: 5000 });
    await matchingOptions.click();
  }

  /**
   * Fill customer information
   * @param {Object} customerData - Customer data object
   * @returns {Promise<string>} The unique last name used
   */
  async fillCustomerInformation(customerData) {
    const uniqueLastName = `${customerData.lastName}${getRandomNumber(1000, 9999)}`;
    await this.page.locator(CreateClaimLocators.firstNameInput).fill(customerData.firstName);
    await this.page.locator(CreateClaimLocators.lastNameInput).fill(uniqueLastName);
    await this.page.locator(CreateClaimLocators.addressInput).fill(customerData.address);
    await this.page.locator(CreateClaimLocators.zipInput).fill(customerData.zip);
    await this.page.locator(CreateClaimLocators.cityInput).fill(customerData.city);

    // Country
    await this.page.locator(CreateClaimLocators.countryInput).fill(customerData.country);
    await this.page.locator(CreateClaimLocators.countryDropdownList).nth(8).click();

    // State
    await this.page.locator(CreateClaimLocators.stateInput).fill(customerData.state);
    await this.page.locator(CreateClaimLocators.stateDropdownList).nth(4).click();

    await this.page.locator(CreateClaimLocators.mainPhoneInput).fill(customerData.mainPhone);
    return uniqueLastName;
  }

  /**
   * Check same address checkbox
   */
  async checkSameAddress() {
    await this.page.locator(CreateClaimLocators.sameAddressCheckbox).click();
  }

  /**
   * Select loss date - today
   */
  async selectLossDate() {
    await this.page.locator(CreateClaimLocators.datePickerButton).click();
    await this.page.locator(CreateClaimLocators.todayDateCell).first().click();
  }

  /**
   * Select source of loss - 10th option
   */
  async selectSourceOfLoss() {
    await this.page.locator(CreateClaimLocators.sourceOfLossDropdownArrow).click();
    await this.page.locator(CreateClaimLocators.sourceOfLossDropdownList).nth(9).click();
  }

  /**
   * Select loss type - 5th option
   */
  async selectLossType() {
    await this.page.locator(CreateClaimLocators.lossTypeDropdownArrow).click();
    await this.page.locator(CreateClaimLocators.lossTypeDropdownList).nth(4).click();
  }

  /**
   * Select water mitigation division
   */
  async selectWaterMitigation() {
    await this.page.locator(CreateClaimLocators.waterMitigationCheckbox).click();
  }

  /**
   * Select art restoration division
   */
  async selectArtRestoration() {
    await this.page.locator(CreateClaimLocators.artRestorationCheckbox).click();
  }

  /**
   * Fill loss description
   * @param {string} description - Loss description text
   */
  async fillLossDescription(description) {
    await this.page.locator(CreateClaimLocators.lossDescriptionInput).fill(description);
    await this.page.waitForLoadState('networkidle');
  }

  // Utility: Type text into an input field one character at a time, waiting after each keystroke
  async typeSequentially(inputLocator, text, delayMs = 500) {
    await inputLocator.fill(''); // Clear input first
    for (const char of text) {
      await inputLocator.focus(); // Ensure input is focused before typing each char
      await inputLocator.type(char);
      await this.page.waitForTimeout(delayMs);
    }
  }

  /**
   * Select preferred provider by typing provider name from standardProgram.json
   */
  async selectPreferredProvider() {
    const providerInput = this.page.locator(CreateClaimLocators.preferredProviderInput);
    await expect(providerInput).toBeEnabled({ timeout: 15000 });
    await providerInput.click();
    await providerInput.fill('');

    // Wait for dropdown to appear
    const dropdownList = this.page.locator(CreateClaimLocators.preferredProviderDropdownList);
    await expect(dropdownList).toBeVisible({ timeout: 10000 });
    // Now type provider name

    //  await providerInput.fill(standardProgram.providerName);
    await providerInput.click();

    await this.typeSequentially(providerInput, standardProgram.providerName, 500);

    // Wait for the second row ("-Unspecified-") to be loaded before typing
    const secondRow = dropdownList.locator('li.rcbItem').nth(1);
    await expect(secondRow).toHaveText(/-Unspecified-/, { timeout: 30000 });

    // ...existing code...
    const providerOption = dropdownList
      .locator('li.rcbItem')
      .filter({
        has: this.page.locator('td', { hasText: standardProgram.providerName }),
      })
      .first();

    await expect(providerOption).toBeVisible({ timeout: 30000 });
    await providerOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Save and go to slideboard
   */
  async saveAndGoToSlideboard() {
    const button = this.page.locator(CreateClaimLocators.saveAndGoToSlideboardButton);
    await button.waitFor({ state: 'visible', timeout: 15000 });
    await expect(button).toBeEnabled();
    // Retry click up to 3 times if needed
    let clicked = false;
    for (let i = 0; i < 3; i++) {
      try {
        await button.click({ trial: false, timeout: 5000 });
        // Wait for page to load
        await this.page.waitForLoadState('networkidle', { timeout: 10000 });
        clicked = true;
        break;
      } catch (e) {
        console.log(`Click attempt ${i + 1} failed:`, e.message);
        if (i === 2) throw e;
        await this.page.waitForTimeout(1000);
      }
    }
    if (clicked) {
      console.log('Clicked Save and Go to Slideboard button');
    } else {
      throw new Error('Failed to click Save and Go to Slideboard button after retries');
    }
  }

  /**
   * Save and Dispatch job
   */
  async saveAndDispatch() {
    await this.page
      .locator(CreateClaimLocators.saveAndDispatchButton)
      .waitFor({ state: 'visible', timeout: 10000 });
    await expect(this.page.locator(CreateClaimLocators.saveAndDispatchButton)).toBeEnabled();
    await this.page.locator(CreateClaimLocators.saveAndDispatchButton).click();

    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/claim(number|id)/i);
  }

  /**
   * Assign program in iframe
   */
  async assignProgram() {
    // Wait for the iframe to be attached
    const iframe = this.page.locator(CreateClaimLocators.assignProgramIframe);
    await iframe.waitFor({ state: 'attached', timeout: 15000 });
    console.log('Assign Program iframe is attached');

    const assignProgramFrame = this.page.frameLocator(CreateClaimLocators.assignProgramIframe);
    const assignProgramButton = assignProgramFrame
      .locator(CreateClaimLocators.assignProgramButton)
      .first();
    await assignProgramButton.waitFor({ state: 'visible', timeout: 15000 });
    console.log('Assign Program button is visible');
    await assignProgramButton.click();
  }

  /**
   * Get job reference number from slideboard
   * @returns {Promise<string>} Job reference number
   */
  async getJobReference() {
    await expect(this.page).toHaveURL(/jJobSlideBoard\.aspx/i);
    const jobReferenceLocator = this.page.locator(CreateClaimLocators.jobReferenceLocator);
    await jobReferenceLocator.waitFor({ state: 'visible', timeout: 10000 });
    const jobRef = (await jobReferenceLocator.textContent())?.trim();
    return jobRef;
  }

  /**
   * Assign job
   */
  async assignJob() {
    const assignJobButton = this.page.locator(CreateClaimLocators.assignJobButton);
    // Wait for any modal overlay to disappear before clicking
    await this.page.locator('.TelerikModalOverlay').waitFor({ state: 'detached', timeout: 15000 });
    await assignJobButton.waitFor({ state: 'visible', timeout: 10000 });
    await assignJobButton.click();
  }

  /**
   * Dispatch job
   */
  async dispatchJob() {
    const dispatchButton = this.page.locator(CreateClaimLocators.dispatchButton);
    await dispatchButton.waitFor({ state: 'visible', timeout: 10000 });
    await dispatchButton.click();

    const dispatchFrame = this.page.frameLocator(CreateClaimLocators.dispatchIframe);
    const attemptLink = dispatchFrame.locator(CreateClaimLocators.attemptCallLink);
    const finalAssignButton = dispatchFrame.locator(CreateClaimLocators.finalAssignButton);

    await attemptLink.waitFor({ state: 'visible', timeout: 15000 });
    await attemptLink.click();

    await finalAssignButton.waitFor({ state: 'visible', timeout: 15000 });
    await finalAssignButton.click();

    const closeButton = this.page.locator(CreateClaimLocators.dispatchCloseButton);
    await closeButton.waitFor({ state: 'visible', timeout: 10000 });
    await closeButton.click();

    const dispatchIframe = this.page.locator(CreateClaimLocators.dispatchIframe);
    await expect(dispatchIframe).toBeHidden({ timeout: 10000 });
  }

  async clickCreateClaimBtn() {
    await this.page.locator(CreateClaimLocators.createClaimBtn).click();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Veid parameter
   */
  async verifyUrl() {
    await this.page.waitForLoadState('networkidle');
    await expect(this.page).toHaveURL(/claimid=\d+/);
  }

  async createClaimAssertURL(claimData) {
    await this.selectCaller(claimData.customer.callerName);
    await this.selectReportedBy();
    await this.selectInsuranceCompany(claimData.customer.client);
    await this.fillCustomerInformation(claimData.customer);
    await this.checkSameAddress();
    await this.selectLossDate();
    await this.selectSourceOfLoss();
    await this.selectLossType();
    await this.selectWaterMitigation();
    await this.fillLossDescription(claimData.customer.lossDescription);
    await this.selectPreferredProvider();
    await this.saveAndGoToSlideboard();
    await this.verifyUrl();
  }

  async createClaimWork(claimData) {
    await this.selectCaller(claimData.customer.callerName);
    await this.selectReportedBy();
    await this.selectInsuranceCompany(claimData.customer.client);
    await this.fillCustomerInformation(claimData.customer);
    await this.checkSameAddress();
    await this.selectLossDate();
    await this.selectSourceOfLoss();
    await this.selectLossType();
    await this.selectWaterMitigation();
    await this.fillLossDescription(claimData.customer.lossDescription);
    await this.selectPreferredProvider();
    await this.saveAndGoToSlideboard();
  }
  /**
   * Complete full claim creation workflow
   * @param {Object} claimData - Claim data object with customer and lossDescription
   * @returns {Promise<string>} The unique customer last name used for the claim
   */
  async createClaimWorkflow(claimData) {
    await this.selectCaller(claimData.customer.callerName);
    await this.selectReportedBy();
    await this.selectInsuranceCompany(claimData.customer.client);
    const uniqueLastName = await this.fillCustomerInformation(claimData.customer);
    await this.checkSameAddress();
    await this.selectLossDate();
    await this.selectSourceOfLoss();
    await this.selectLossType();
    await this.selectWaterMitigation();
    await this.fillLossDescription(claimData.customer.lossDescription);
    await this.selectPreferredProvider();
    await this.saveAndGoToSlideboard();
    await this.assignProgram();
    await this.assignJob();
    await this.dispatchJob();
    return uniqueLastName;
  }

  /**
   * Complete full claim creation workflow and edit
   * @param {Object} claimData - Claim data object with customer and lossDescription
   */
  async createClaimAndEditWorkFlow(claimData) {
    await this.selectCaller(claimData.customer.callerName);
    await this.selectReportedBy();
    await this.selectInsuranceCompany(claimData.customer.client);
    await this.fillCustomerInformation(claimData.customer);
    await this.checkSameAddress();
    await this.selectLossDate();
    await this.selectSourceOfLoss();
    await this.selectLossType();
    await this.selectWaterMitigation();
    await this.fillLossDescription(claimData.customer.lossDescription);
    await this.selectPreferredProvider();
    await this.saveAndGoToSlideboard();
    await this.assignProgram();
  }
}

export default CreateClaimPage;
