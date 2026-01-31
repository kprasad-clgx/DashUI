import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class ChecklistPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // --- Main Page Locators ---
    this.addNewChecklistButton = page.getByRole('button', { name: 'Add New Checklist' });
    this.filterNameInput = page.getByRole('textbox', { name: 'Checklist Name', exact: false });
    this.gridRow = page.locator('tr.k-master-row');
  }

  /**
   * Opens the Designer, performs actions, saves, and closes it.
   */
  async addNewChecklist(uniqueName) {
    // 1. Trigger the Popup
    const [popup] = await Promise.all([
      this.page.context().waitForEvent('page'),
      this.addNewChecklistButton.click(),
    ]);

    // 2. Initialize a temporary Page Object for the Popup
    const designer = new ChecklistDesignerPage(popup);
    await designer.page.waitForLoadState('domcontentloaded');

    // 3. Perform Actions on the Popup
    await designer.fillFormFields();
    await designer.saveAndNameChecklist(uniqueName);

    // 4. Close and cleanup
    await popup.close();

    // 5. Ensure Main page is active/refreshed
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyChecklist(uniqueName) {
    // Wait for grid to be visible
    await this.page.locator('.k-grid-content').first().waitFor({ state: 'visible' });

    // Filter
    await this.filterNameInput.click();
    await this.filterNameInput.fill(uniqueName);
    await this.page.keyboard.press('Enter');

    // Wait for the grid to update row specifically containing the text
    const specificRow = this.gridRow.filter({ hasText: uniqueName });
    await specificRow.first().waitFor({ state: 'visible', timeout: 10000 });
  }
}

/**
 * Internal Helper Class for the Popup Window
 * This keeps locators scoped strictly to the new window.
 */
class ChecklistDesignerPage {
  constructor(page) {
    this.page = page;

    // --- Ribbon Items ---
    this.formFieldTab = page.getByText('Form Fields', { exact: true });
    this.documentSignature = page.getByText('Document Signature', { exact: true });
    this.jobTab = page.getByText('Job', { exact: true });
    this.internalParticipants = page.getByText('Internal Participants', { exact: true });

    // --- Form Elements ---
    this.comboBoxBtn = page.locator('#ribbonTabFormFields_btnInsertComboBoxField');
    this.dateFieldBtn = page.getByTitle('Insert Date Form Field');

    // Using loose text matching for signatures is safer in case of whitespace
    this.accountantSigReq = page.locator('text=Accountant Signature (Req.)');
    this.lossType = page.locator('text=Type of loss');
    this.jobNumber = page.locator('text=Job Number');
    this.jobStatus = page.locator('text=Job Status');
    this.accountingPerson = page.getByText('Accounting Person', { exact: true });

    // --- Save Elements ---
    this.topSaveBtn = page.getByRole('button', { name: 'SAVE' });
    this.documentNameInput = page.locator('#DocumentName');
    this.finalSaveBtn = page.getByRole('button', { name: 'Save Checklist' });
  }

  async clickRibbonItem(locator) {
    await locator.click();
    await this.page.waitForTimeout(500);
  }

  async fillFormFields() {
    // Tab: Form Fields
    await this.clickRibbonItem(this.formFieldTab);
    await this.clickRibbonItem(this.comboBoxBtn);
    await this.clickRibbonItem(this.dateFieldBtn);

    // Tab: Document Signature
    await this.clickRibbonItem(this.documentSignature);
    await this.clickRibbonItem(this.accountantSigReq);

    // Tab: Job
    await this.clickRibbonItem(this.jobTab);
    await this.clickRibbonItem(this.lossType);
    await this.clickRibbonItem(this.jobNumber);
    await this.clickRibbonItem(this.jobStatus);

    // Tab: Internal Participants
    await this.clickRibbonItem(this.internalParticipants);
    await this.clickRibbonItem(this.accountingPerson);
  }

  async saveAndNameChecklist(name) {
    // Click Top Save
    await this.topSaveBtn.click();

    // Wait for the modal input to appear
    await this.documentNameInput.waitFor({ state: 'visible' });
    await this.documentNameInput.fill(name);

    // Wait 5 seconds before final save
    await this.page.waitForTimeout(5000);

    // Final Save
    await this.finalSaveBtn.click();

    // Wait 5 seconds after final save click
    await this.page.waitForTimeout(5000);

    // Wait for the save operation to complete (loader or network)
    await this.page.waitForLoadState('networkidle');
  }
}
