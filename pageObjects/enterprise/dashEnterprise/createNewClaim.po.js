import { expect } from '@playwright/test';

// Page object for the Provider Create Claim screen
export class CreateClaimPage {
  constructor(page) {
    this.page = page;
    this.createClaimLink = page.locator('#ctl00_divLastView > a:nth-child(1)');
    this.reportedByInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ReportedBY_Arrow',
    );
    this.reportedByFirstOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ReportedBY_DropDown > div > ul > li:nth-child(1)',
    );
    this.providerInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ProviderOffice_Input',
    );
    this.providerFirstOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ProviderOffice_DropDown > div > ul > li:nth-child(1)',
    );
    this.clientInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_Client_Input',
    );
    this.clientFifthOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_Client_DropDown > div > ul > li:nth-child(5)',
    );
    this.programInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_Grid_JobInformation_ctl00_ctl04_DropDown_Program_Input',
    );
    this.programFirstOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_Grid_JobInformation_ctl00_ctl04_DropDown_Program_DropDown > div > ul > li:nth-child(1)',
    );
    this.customerArrow = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_Customer_Arrow',
    );
    this.customerFirstName = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_TextBox_FirstName',
    );
    this.customerLastName = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_TextBox_LastName',
    );
    this.sameAsCustomerCheckbox = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_CheckBox_SameIndividualAddress',
    );
    this.estimatorInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl00_EstimatorComboBox_Input',
    );
    this.estimatorOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl00_EstimatorComboBox_DropDown > div > ul > li:nth-child(3)',
    );
    this.coordinatorInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl01_EstimatorComboBox_Input',
    );
    this.coordinatorOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl01_EstimatorComboBox_DropDown > div > ul > li:nth-child(3)',
    );
    this.accountingInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl04_EstimatorComboBox_Input',
    );
    this.accountingOption = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl04_EstimatorComboBox_DropDown > div > ul > li:nth-child(3)',
    );
    this.dateOfLossPicker = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DatePicker_DateOffLoss_CalendarPopupButton',
    );
    this.dateOfLossInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DatePicker_DateOffLoss_dateInput',
    );
    this.artRestorationCheckbox = page.locator(
      '#ctl00_ContentPlaceHolder1_JobParentInformation_CheckBox_RequiredServices_0',
    );
    this.lossDescriptionInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_TextBox_LossDescription',
    );
    this.saveButton = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_Button_SaveAndGoToSlideBoardBottom',
    );
    this.createClaimButton = page.locator(
      "input[name='ctl00$ContentPlaceHolder1$ProviderCreateClaim$Button_CreateJob']",
    );
    this.jobInfoPanel = page.locator(
      '#JobInfoPanel > tr > td:nth-child(2) > div:nth-child(1) > span:nth-child(1)',
    );
    this.customerEmail = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_TextBox_Email',
    );
    this.customerPhone = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_TextBox_Phone',
    );
    this.customerAddress = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_TextBox_Address',
    );
    this.referredByInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ReferredBy_Input',
    );
    this.yearBuiltInput = page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_YearBuiltTextBox',
    );
  }

  // Open the Provider Create Claim screen
  async openCreateClaim() {
    await this.createClaimLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Select the first value in the Reported By dropdown
  async selectReportedBy() {
    await this.reportedByInput.click();
    // Wait for "Loading, Please wait" to disappear if present
    const loadingLocator = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ReportedBY_DropDown .rcbLoading',
    );
    if (await loadingLocator.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(loadingLocator).toBeHidden({ timeout: 10000 });
    }
    // Wait for dropdown options to be visible
    const optionsLocator = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ReportedBY_DropDown ul.rcbList > li.rcbItem',
    );
    await expect(optionsLocator.first()).toBeVisible({ timeout: 10000 });
    // Require at least 2 options to select from
    const count = await optionsLocator.count();
    if (count < 2) {
      throw new Error('Reported By dropdown has fewer than 2 options.');
    }
    const randomIndex = Math.floor(Math.random() * count);
    await optionsLocator.nth(randomIndex).click();
  }

  // Select Referred by
  async selectReferredBy() {
    await expect(this.referredByInput).toBeVisible({ timeout: 10000 });
    await this.referredByInput.click();

    // Wait for loading indicator to disappear if present
    const loadingLocator = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ReferredBy_DropDown .rcbLoading',
    );
    if (await loadingLocator.isVisible({ timeout: 2000 }).catch(() => false)) {
      await expect(loadingLocator).toBeHidden({ timeout: 10000 });
    }

    // Wait for the first row to be visible
    const optionsLocator = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_ReferredBy_DropDown ul.rcbList > li.rcbItem',
    );
    await expect(optionsLocator.first()).toBeVisible({ timeout: 10000 });

    // Get the text of the first row
    const selectedText = await optionsLocator.first().textContent();

    // Click the first row
    await optionsLocator.first().click();

    // Return the selected data (trimmed)
    return selectedText?.trim();
  }

  // Select the first value in the Provider Office dropdown
  async selectProvider() {
    await this.providerInput.click();
    await this.providerFirstOption.click();
  }

  // Select a client by choosing the fifth option
  async selectClient() {
    await this.clientInput.click();
    await this.clientFifthOption.click();
  }

  // Utility: Type text into an input field one character at a time, waiting after each keystroke
  async typeSequentially(inputLocator, text, delayMs = 300) {
    for (const char of text) {
      await inputLocator.type(char);
      await this.page.waitForTimeout(delayMs);
    }
  }

  // Select a customer from the dropdown and wait for fields to populate
  async selectCustomer(dropdownText, firstName, lastName) {
    await expect(this.customerArrow).toBeEnabled();
    await this.customerArrow.click();

    // Type the customer name sequentially
    const customerInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_Customer_Input',
    );
    await this.typeSequentially(customerInput, firstName, 300);

    // Wait for dropdown to appear
    const dropdown = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_Customer_DropDown',
    );
    await expect(dropdown).toBeVisible({ timeout: 15000 });

    // Find the first <li> whose first <td> contains the dropdownText
    const customerOption = dropdown
      .locator('ul.rcbList > li')
      .filter({
        has: this.page.locator('td').first().filter({ hasText: firstName }),
      })
      .first();

    await expect(customerOption).toBeVisible({ timeout: 15000 });
    await customerOption.click();

    // Wait for customer data to load (field should not be placeholder)
    await expect(this.customerFirstName).not.toHaveValue('First Name', { timeout: 15000 });
    await expect(this.customerFirstName).toHaveValue(lastName, { timeout: 15000 });
    await expect(this.customerLastName).toHaveValue(firstName, { timeout: 15000 });
  }

  // Fill in the customer's contact information
  async fillCustomerContactInfo(email, phone, address) {
    if (email) await this.customerEmail.fill(email);
    if (phone) await this.customerPhone.fill(phone);
    if (address) await this.customerAddress.fill(address);
  }

  // Check the Same As Individual Address checkbox
  async checkSameAsIndividualAddress() {
    await expect(this.sameAsCustomerCheckbox).toBeVisible();
    await this.sameAsCustomerCheckbox.check();
  }

  // Select an estimator in the internal participants grid (selects 'admin, admin' by text)
  async selectEstimator() {
    await this.estimatorInput.click();
    // Wait for dropdown to be visible
    const dropdown = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl00_EstimatorComboBox_DropDown',
    );
    await dropdown.waitFor({ state: 'visible', timeout: 5000 });
    // Find the <li> with exact text 'admin, admin' (case-insensitive, trimmed)
    const adminOption = dropdown.locator('ul.rcbList > li').filter({ hasText: /^admin, admin$/i });
    await adminOption.first().click();
  }

  // Select a coordinator in the internal participants grid (selects 'admin, admin' by text)
  async selectCoordinator() {
    await this.coordinatorInput.click();
    // Wait for dropdown to be visible
    const dropdown = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl01_EstimatorComboBox_DropDown',
    );
    await dropdown.waitFor({ state: 'visible', timeout: 5000 });
    // Find the <li> with exact text 'admin, admin' (case-insensitive, trimmed)
    const adminOption = dropdown.locator('ul.rcbList > li').filter({ hasText: /^admin, admin$/i });
    await adminOption.first().click();
  }

  // Select an accounting contact in the internal participants grid (selects 'admin, admin' by text)
  async selectAccounting() {
    await this.accountingInput.click();
    // Wait for dropdown to be visible
    const dropdown = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_InternalParticpantsControl_InternalParticipantsList_ctl04_EstimatorComboBox_DropDown',
    );
    await dropdown.waitFor({ state: 'visible', timeout: 5000 });
    // Find the <li> with exact text 'admin, admin' (case-insensitive, trimmed)
    const adminOption = dropdown.locator('ul.rcbList > li').filter({ hasText: /^admin, admin$/i });
    await adminOption.first().click();
  }
  // Set the date of loss using the date picker
  async setDateOfLoss(dateOfLoss) {
    await this.dateOfLossPicker.click();
    await this.dateOfLossInput.fill(dateOfLoss);
    // Click outside to close the dropdown
    await this.page.locator('body').click();
  }

  // Select Loss Category - Random (Except First)
  async selectRandomLossCategoryExceptFirst() {
    const lossCategoryInput = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_LossCatgory_Arrow',
    );
    await lossCategoryInput.click();

    // Corrected dropdown ID and option locator
    const options = this.page.locator(
      '#ctl00_ContentPlaceHolder1_ProviderCreateClaim_DropDown_LossCatgory_DropDown ul.rcbList > li',
    );
    await expect(options.nth(1)).toBeVisible({ timeout: 5000 });

    const count = await options.count();
    if (count <= 1) throw new Error('No selectable options in Loss Category dropdown.');

    const randomIndex = Math.floor(Math.random() * (count - 1)) + 1; // 1 to count-1
    await options.nth(randomIndex).click();
  }

  // Check the Art Restoration required service option
  async selectArtRestoration() {
    await expect(this.artRestorationCheckbox).toBeVisible();
    await this.artRestorationCheckbox.check();
  }

  // Enter a description of the loss
  async enterLossDescription(lossDescription) {
    await this.lossDescriptionInput.fill(lossDescription);
  }

  // Enter year Built
  async enterYearBuilt(yearBuilt) {
    await this.yearBuiltInput.fill(yearBuilt);
  }

  // Click Save and wait for the claim form to settle
  async saveClaim() {
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }
  // Select the first available program in the Program dropdown
  async selectProgram() {
    await this.programInput.click();
    await expect(this.programFirstOption).toBeVisible({ timeout: 5000 });
    await expect(this.programFirstOption).toBeEnabled({ timeout: 5000 });
    await this.programFirstOption.scrollIntoViewIfNeeded();
    await this.programFirstOption.click({ force: false });
    await this.page.waitForLoadState('networkidle');
  }

  // Create the claim by clicking the Create Claim button
  async createClaim() {
    await expect(this.createClaimButton).toBeVisible({ timeout: 10000 });
    await expect(this.createClaimButton).toBeEnabled({ timeout: 10000 });
    await this.createClaimButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Wait for and return the job number from the Job Info panel
  async expectJobNumber() {
    // Wait for network and DOM to settle
    await this.page.waitForLoadState('networkidle');
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');

    // First, try to get job number from URL parameters
    const currentUrl = this.page.url();
    const params = new URL(currentUrl).searchParams;
    let jobNumber = params.get('JobNumber');

    if (jobNumber) {
      return jobNumber;
    }

    // Fallback: Scan page content for job number pattern
    const pageContent = await this.page.locator('body').textContent();
    const jobNumberRegex = /([A-Z]*\d+-\d+-[A-Z0-9]+)/;
    const match = pageContent.match(jobNumberRegex);
    if (match) {
      jobNumber = match[1];
    }

    return jobNumber;
  }

  // Select a random required service checkbox
  async selectRandomRequiredService() {
    // Select the 'Art Restoration' required service by label text
    const label = this.page.locator('label:text("Art Restoration")');
    await expect(label).toBeVisible({ timeout: 5000 });
    // Find the associated checkbox (for/ID relationship or parent/child)
    let checkbox;
    const forAttr = await label.getAttribute('for');
    if (forAttr) {
      checkbox = this.page.locator(`#${forAttr}`);
    } else {
      // Fallback: look for checkbox inside the same parent
      checkbox = label.locator('input[type="checkbox"]');
    }
    await expect(checkbox).toBeVisible({ timeout: 5000 });
    await checkbox.check();
  }

  async getReferredByValue(expectedValue) {
    const referredByLocator = this.page.locator(
      "//div[@class='innerDiv20pct fontRegular' and text()='Referred By']/following-sibling::div[@class='innerDiv30pct fontBold']",
    );
    await expect(referredByLocator).not.toHaveText('N/A', { timeout: 10000 });
    const value = (await referredByLocator.textContent())?.trim();
    await expect(value).toBe(expectedValue);
    return value;
  }

  // Create new Claim flow
  async createNewClaimOnly(claimDetails) {
    await this.openCreateClaim();
    await this.selectReportedBy();
    await this.selectProvider();
    await this.selectClient();
    await this.selectCustomer(
      claimDetails.dropdownText,
      claimDetails.firstName,
      claimDetails.lastName,
    );
    await this.checkSameAsIndividualAddress();
    await this.selectEstimator();
    await this.selectCoordinator();
    await this.selectAccounting();
    await this.selectRandomLossCategoryExceptFirst();
    await this.setDateOfLoss(claimDetails.dateOfLoss);
    await this.selectRandomRequiredService();
    await this.enterLossDescription(claimDetails.lossDescription);
    await this.saveClaim();
    await this.selectProgram();
    await this.createClaim();
  }

  // Run the full create-claim flow and return the job number
  async createNewClaim(claimDetails) {
    await this.openCreateClaim();
    await this.selectReportedBy();
    await this.selectReferredBy();
    await this.selectProvider();
    await this.selectClient();
    await this.selectCustomer(
      claimDetails.dropdownText,
      claimDetails.firstName,
      claimDetails.lastName,
    );
    await this.checkSameAsIndividualAddress();
    await this.selectEstimator();
    await this.selectCoordinator();
    await this.selectAccounting();
    await this.selectRandomLossCategoryExceptFirst();
    await this.selectRandomRequiredService();
    await this.setDateOfLoss(claimDetails.dateOfLoss);
    await this.enterLossDescription(claimDetails.lossDescription);
    await this.saveClaim();
    await this.selectProgram();
    await this.createClaim();
    const jobNumber = await this.expectJobNumber();
    await this.page.waitForLoadState('networkidle');
    return jobNumber;
  }

  async createNewClaimWithReferredBy(claimDetails) {
    await this.openCreateClaim();
    await this.selectReportedBy();
    const referredBy = await this.selectReferredBy();
    await this.selectProvider();
    await this.selectClient();
    await this.selectCustomer(
      claimDetails.dropdownText,
      claimDetails.firstName,
      claimDetails.lastName,
    );
    await this.checkSameAsIndividualAddress();
    await this.selectEstimator();
    await this.selectCoordinator();
    await this.selectAccounting();
    await this.selectRandomLossCategoryExceptFirst();
    await this.selectRandomRequiredService();
    await this.setDateOfLoss(claimDetails.dateOfLoss);
    await this.enterLossDescription(claimDetails.lossDescription);
    await this.yearBuiltInput(claimDetails.yearBuilt);
    await this.saveClaim();
    await this.selectProgram();
    await this.createClaim();
    return referredBy;
  }
}
