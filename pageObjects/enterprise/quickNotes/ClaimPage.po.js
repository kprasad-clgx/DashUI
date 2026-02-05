import { BasePage } from '../basePage/enterpriseBasePage.po.js';

// Page object for the Provider Create Claim screen
export class CreateClaimPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // --- Navigation ---
    this.quickNotesIcon = page.locator('#RAD_SLIDING_PANE_ICON_ctl00_ctl44_QuickMenuSlidingPane');
    this.createClaimQuickLink = page.getByText('Claim', { exact: true });
    this.createClaimLink = page.getByRole('img', { name: 'Create Claim' });

    // --- Dropdown Arrows (For Telerik Helper) ---
    // Using robust suffix selectors [id$="..."] to handle dynamic parents.
    this.reportedByArrow = page.locator('[id$="DropDown_ReportedBY_Arrow"]');
    this.providerArrow = page.locator('[id$="DropDown_ProviderOffice_Arrow"]');
    this.clientArrow = page.locator('[id$="DropDown_Client_Arrow"]');

    // --- Customer Info ---
    this.customerArrow = page.locator('[id$="DropDown_Customer_Arrow"]');
    this.customerInput = page.locator('[id$="DropDown_Customer_Input"]');

    this.customerFirstName = page.locator('[id$="TextBox_FirstName"]');
    this.customerLastName = page.locator('[id$="TextBox_LastName"]');
    this.emailInput = page.locator('[id$="TextBox_Email"]'); // Validation target

    // --- Internal Participants (Specific IDs for unique rows) ---
    this.estimatorArrow = page.locator(
      '[id$="InternalParticipantsList_ctl00_EstimatorComboBox_Arrow"]',
    );
    this.coordinatorArrow = page.locator(
      '[id$="InternalParticipantsList_ctl01_EstimatorComboBox_Arrow"]',
    );
    this.accountingArrow = page.locator(
      '[id$="InternalParticipantsList_ctl04_EstimatorComboBox_Arrow"]',
    );

    // --- Loss Info ---
    this.lossCategoryArrow = page.locator('[id$="DropDown_LossCatgory_Arrow"]');
    this.dateOfLossInput = page.locator('[id$="DatePicker_DateOffLoss_dateInput"]');
    this.waterMitigationCheckbox = page.locator('[id$="CheckBox_RequiredServices_31"]');
    this.lossDescriptionInput = page.locator('[id$="TextBox_LossDescription"]');
    this.yearBuiltInput = page.locator('[id$="YearBuiltTextBox"]');
    this.sameAsCustomerCheckbox = page.locator('[id$="CheckBox_SameIndividualAddress"]');

    // --- Program (Inside Grid) ---
    this.programGrid = page.locator('[id$="Grid_JobInformation"]');

    // --- Buttons & Panels ---
    this.saveButton = page.locator('[id$="Button_SaveAndGoToSlideBoardBottom"]');
    this.createClaimButton = page.locator('[id$="Button_CreateJob"]'); // Submit button
    this.jobInfoPanel = page.locator('#JobInfoPanel');

    // ...existing code...

    // --- Spinner (Matches your working Job Page) ---
    this.generalSpinner = page.locator('img[src*="image003.gif"]');

    // --- Other Phone Number ---
    this.otherPhoneNumberInput = page.locator('[id$="ProviderCreateClaim_TextBox_Other"]');
  }
  async fillOtherPhoneNumber(phoneNumber) {
    await this.otherPhoneNumberInput.fill(phoneNumber);
  }

  /**
   * Waits for the general loading spinner to disappear (processing complete)
   * Copied from your working CreateJobPage logic.
   */
  async waitForProcessing(timeout = 10000) {
    try {
      await this.generalSpinner.first().waitFor({ state: 'visible', timeout: 5000 });
    } catch {
      // Spinner may not appear, that's fine
    }
    // If it appeared, wait for it to hide
    await this.generalSpinner.first().waitFor({ state: 'hidden', timeout });
  }

  async openQuickNotesCreateClaim() {
    await this.quickNotesIcon.click();
    await this.createClaimQuickLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  async openCreateClaim() {
    // Wait for the link to be visible and enabled
    await this.createClaimLink.waitFor({ state: 'visible', timeout: 20000 });
    await this.createClaimLink.click();
    await this.page.waitForLoadState('networkidle');
  }

  /** * STANDARD TELERIK SELECT
   * Mimics the logic from CreateJobPage.
   */
  async selectTelerikOption(arrowLocator, optionText) {
    const arrowId = await arrowLocator.getAttribute('id');
    const inputId = arrowId.replace('_Arrow', '_Input');
    const inputLocator = this.page.locator(`[id="${inputId}"]`);

    // Strategy 1: Type & Tab (Preferred/Faster)
    // Always use click-and-select logic for estimator and coordinator
    await arrowLocator.click();
    const dropdownId = arrowId.replace('_Arrow', '_DropDown');
    const specificDropdown = this.page.locator(`[id="${dropdownId}"]`);
    await specificDropdown.waitFor({ state: 'visible' });
    // Wait for dropdown options to load (not just 'Loading, Please wait...')
    let allItems = [];
    for (let i = 0; i < 50; i++) {
      // up to 10s
      allItems = await specificDropdown.locator('.rcbItem, li').allTextContents();
      if (
        allItems.length > 0 &&
        !allItems.includes('Loading, Please wait...') &&
        !allItems.includes('Loading...')
      )
        break;
      await this.page.waitForTimeout(200);
    }
    if (
      allItems.length === 0 ||
      allItems.includes('Loading, Please wait...') ||
      allItems.includes('Loading...')
    ) {
      throw new Error(
        `Dropdown options did not load in time. Searched for '${optionText}'. Final options: ${JSON.stringify(allItems)}`,
      );
    }
    // Find all items that match the requested text exactly
    const matchingLocators = await specificDropdown
      .locator('.rcbItem, li')
      .filter({ hasText: optionText, exact: true })
      .elementHandles();
    let item;
    if (matchingLocators.length === 0) {
      throw new Error(
        `Dropdown item '${optionText}' not found. Options: ${JSON.stringify(allItems)}`,
      );
    } else if (matchingLocators.length === 1) {
      item = specificDropdown
        .locator('.rcbItem, li')
        .filter({ hasText: optionText, exact: true })
        .first();
    } else {
      // If multiple matches, select the last one
      item = specificDropdown
        .locator('.rcbItem, li')
        .filter({ hasText: optionText, exact: true })
        .nth(matchingLocators.length - 1);
    }
    const isAttached = await item.evaluate((el) => !!el);
    if (!isAttached) {
      throw new Error(
        `Dropdown item '${optionText}' is not attached to the DOM. Options: ${JSON.stringify(allItems)}`,
      );
    }
    await item.scrollIntoViewIfNeeded();
    try {
      await item.click();
    } catch {
      // If overlay intercepts pointer events, try to close overlays and retry
      await this._closeTelerikOverlays();
      await item.click();
    }
    // Wait for dropdown to close
    await specificDropdown.waitFor({ state: 'hidden', timeout: 2000 }).catch(() => {});
  }

  /**
   * Attempts to close any Telerik overlays that may be intercepting pointer events.
   */
  async _closeTelerikOverlays() {
    await this.page.keyboard.press('Escape');
    const bodyLocator = this.page.locator('body');
    await bodyLocator.waitFor({ state: 'visible' });
    await bodyLocator.click();

    // Wait a short moment for overlays to disappear
    await this.page.waitForTimeout(300);
  }

  // --- Wrapper Methods to maintain your existing API ---

  async selectReportedBy(value) {
    await this.selectTelerikOption(this.reportedByArrow, value);
  }

  async selectProvider(value) {
    await this.selectTelerikOption(this.providerArrow, value);
  }

  async selectClient() {
    // Specific logic for Client (Selecting 5th option as per your requirement)
    await this.clientArrow.click();

    // Calculate dropdown ID dynamically
    const arrowId = await this.clientArrow.getAttribute('id');
    const dropdownId = arrowId.replace('_Arrow', '_DropDown');
    const dropdown = this.page.locator(`[id="${dropdownId}"]`);

    await dropdown.waitFor({ state: 'visible' });
    // Click 5th option
    await dropdown.locator('ul.rcbList > li').nth(4).click();
    await dropdown.waitFor({ state: 'hidden' });
  }

  async selectCustomer(customerData) {
    // 1. Prepare Locators
    const dropdownId = (await this.customerArrow.getAttribute('id')).replace('_Arrow', '_DropDown');
    const listLocator = this.page.locator(`[id="${dropdownId}"]`);

    // 2. Type FIRST NAME to trigger search
    await this.customerInput.click();
    await this.customerInput.clear();
    await this.customerInput.type(customerData.firstName, { delay: 100 });

    // 3. Wait for Dropdown List
    await listLocator.waitFor({ state: 'visible', timeout: 8000 });

    // 4. Click the Matching Customer (Format: Last, First)
    const matchText = `${customerData.lastName}, ${customerData.firstName}`;
    const targetItem = listLocator.locator('.rcbItem, li').filter({ hasText: matchText }).first();

    await targetItem.click();

    // 5. Wait for dropdown to close
    await listLocator.waitFor({ state: 'hidden' });

    // 6. Wait for processing (spinner)
    await this.waitForProcessing();
  }

  async assertCustomerName(customerData) {
    // Wait for the fields to actually have the value
    await this.page.waitForFunction(
      (args) => {
        const input = document.querySelector(args.selector);
        return input && input.value.trim().toUpperCase() === args.expectedValue.toUpperCase();
      },
      { selector: '[id$="TextBox_FirstName"]', expectedValue: customerData.firstName },
      { timeout: 10000 },
    );
  }
  // ...existing code...

  async checkSameAsIndividualAddress() {
    await this.sameAsCustomerCheckbox.click();
    // Wait for the address copy spinner
    await this.waitForProcessing();
  }

  async selectEstimator(value) {
    await this.selectTelerikOption(this.estimatorArrow, value);
  }

  async selectCoordinator(value) {
    await this.selectTelerikOption(this.coordinatorArrow, value);
  }

  async selectAccounting(value) {
    await this.selectTelerikOption(this.accountingArrow, value);
  }

  async selectLossCategory(value) {
    await this.selectTelerikOption(this.lossCategoryArrow, value);
  }

  async setDateOfLoss(date) {
    await this.dateOfLossInput.click();
    await this.dateOfLossInput.fill(date);
    await this.dateOfLossInput.press('Tab');
  }

  async selectYearBuilt(year) {
    await this.yearBuiltInput.fill(year.toString());
    await this.yearBuiltInput.press('Tab');
  }

  async selectWaterMitigation() {
    await this.waterMitigationCheckbox.scrollIntoViewIfNeeded();
    const wasChecked = await this.waterMitigationCheckbox.isChecked();
    if (!wasChecked) {
      try {
        await this.waterMitigationCheckbox.check();
      } catch (e) {
        // Fallback: try click if check() fails
        await this.waterMitigationCheckbox.click({ force: true });
      }
      // Wait a moment and re-check state
      await this.page.waitForTimeout(300);
      const nowChecked = await this.waterMitigationCheckbox.isChecked();
      if (!nowChecked) {
        throw new Error('Water Mitigation checkbox could not be checked');
      }
    }
  }

  async enterLossDescription(text) {
    await this.lossDescriptionInput.fill(text);
  }

  async saveClaim() {
    // Sometimes buttons need a scroll
    await this.saveButton.scrollIntoViewIfNeeded();
    await this.saveButton.click();
    await this.waitForProcessing(); // Wait for post-save reload/spinner
  }

  // Handle Dynamic Grid Program Dropdown (Post-Save Action)
  async selectProgram() {
    // 1. Wait for Grid to appear
    await this.programGrid.waitFor({ state: 'visible', timeout: 15000 });

    // 2. Find Input inside Grid (First row program input)
    const programInput = this.programGrid.locator('input[id$="DropDown_Program_Input"]').first();
    await programInput.waitFor({ state: 'visible' });

    // 3. Open Dropdown
    await programInput.click();

    // 4. Calculate Dropdown ID dynamically
    const inputId = await programInput.getAttribute('id');
    const dropdownId = inputId.replace('_Input', '_DropDown');
    const dropdownList = this.page.locator(`[id="${dropdownId}"]`);

    // 5. Select First Option
    await dropdownList.waitFor({ state: 'visible' });
    const firstOption = dropdownList.locator('ul.rcbList > li').first();

    if (await firstOption.isEnabled()) {
      await firstOption.click();
    }

    await dropdownList.waitFor({ state: 'hidden' });
    await this.waitForProcessing();
  }

  async createClaim() {
    await this.createClaimButton.scrollIntoViewIfNeeded();
    await this.createClaimButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async expectJobNumber() {
    // Wait for the panel to appear
    await this.jobInfoPanel.waitFor({ state: 'visible', timeout: 30000 });

    // Extract text from the specific cell inside the panel
    const jobNumberText = await this.jobInfoPanel
      .locator('tr > td:nth-child(2) span')
      .first()
      .textContent();
    const cleanedText = jobNumberText ? jobNumberText.trim() : '';

    if (!cleanedText) {
      throw new Error('Job number is empty or not found');
    }

    return cleanedText;
  }

  // --- Main Orchestrator ---
  async createNewClaim(claimDetails, customerData) {
    // We assume the page is already open (via Test)

    await this.selectReportedBy(claimDetails.reportedBy);
    await this.selectProvider(claimDetails.office);
    await this.selectClient(); // 5th option logic

    // Customer Logic
    await this.selectCustomer(customerData);
    await this.assertCustomerName(customerData);
    await this.checkSameAsIndividualAddress();

    // Internal Participants
    await this.selectEstimator(claimDetails.estimator);
    await this.selectCoordinator(claimDetails.coordinator);

    // Loss Details
    await this.setDateOfLoss(claimDetails.dateOfLoss);
    await this.selectLossCategory(claimDetails.lossCategory);
    await this.selectWaterMitigation();
    await this.enterLossDescription(claimDetails.lossDescription);

    // Save (Grid appears)
    await this.saveClaim();

    // Select Program from new Grid
    await this.selectProgram();

    // Final Create
    await this.createClaim();
    return await this.expectJobNumber();
  }
}
