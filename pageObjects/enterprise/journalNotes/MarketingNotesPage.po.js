import { generateUniqueDescription } from '../../../utils/helpers.js';
import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class MarketingNotesPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // --- 1. MODAL FRAME & WRAPPERS ---
    this.modalWrapper = page.locator('[id*="RadWindowWrapper"]');
    this.notesDialogFrame = page.frameLocator('iframe[name="commonRadWindow"]');

    // --- 2. MODAL INTERNALS (Shared by both Individual & Company) ---
    this.contactSelectInput = this.notesDialogFrame.locator('#RadComboBoxContact_Input');
    this.firstContactOption = this.notesDialogFrame.locator(
      '#RadComboBoxContact_DropDown > div > ul > li:nth-child(1)',
    );

    this.noteTextBox = this.notesDialogFrame.locator('#NoteTextBox');
    this.saveButton = this.notesDialogFrame.locator('#ButtonSave');

    // --- 3. GRID & SEARCH LOCATORS ---
    this.grid = page.locator('#individualNoteGrid');
    this.searchBox = this.grid.locator('.k-filtercell input').first();
    this.gridDataRows = this.grid.locator('tbody tr');
    this.loadingMask = page.locator('.k-loading-mask');

    // --- 4. BUTTONS ---
    this.addIndividualNoteBtn = page.locator('#buttonAddIndividualNote');
    this.addCompanyNoteBtn = page.locator('#buttonAddCompanyNote');
    this.companyNotesTab = page.getByText('Company Notes', { exact: true });
  }

  //  ACTIONS: CREATION

  async clickAddNewRecord() {
    await this.addIndividualNoteBtn.click();
    await this._waitForModalToOpen();
  }

async clickAddCompanyRecord() {
  await this.clickCompanyNotesTab();
  await this.page.waitForLoadState('networkidle');
  await this.addCompanyNoteBtn.click();
  await this._waitForModalToOpen();
}

  // Helper to prevent code duplication
  async _waitForModalToOpen() {
    await this.page.waitForLoadState('domcontentloaded');
    await this.modalWrapper.waitFor({ state: 'visible', timeout: 10000 });
    await this.page.locator('iframe[name="commonRadWindow"]').waitFor({ state: 'visible' });
  }

  async selectIndividual() {
    await this._selectContactOption();
  }

  async selectCompany() {
    await this._selectContactOption();
  }

  // Internal helper for dropdown selection
  async _selectContactOption() {
    await this.contactSelectInput.waitFor({ state: 'visible', timeout: 10000 });
    await this.contactSelectInput.click();
    await this.firstContactOption.waitFor({ state: 'visible', timeout: 5000 });
    await this.firstContactOption.click();
  }

  async enterNoteText(noteText) {
    await this.noteTextBox.fill(noteText);
  }

  async saveNote() {
    await this.saveButton.click();
    // Critical: Wait for modal to vanish to confirm save success
    await this.modalWrapper.waitFor({ state: 'hidden', timeout: 30000 });
    await this.page.waitForLoadState('networkidle');
  }

  //  ACTIONS: NAVIGATION & GRID

  async switchToIndividualNotesTab() {
    await this.page.getByText('Individual Notes', { exact: true }).click();
    await this.page.waitForLoadState('networkidle');
    this.grid = this.page.locator('#individualNoteGrid');
    this.gridDataRows = this.grid.locator('tbody tr');
    this.searchBox = this.grid.locator('.k-filtercell input').first();
  }

  async clickCompanyNotesTab() {
    await this.companyNotesTab.click();
    await this.page.waitForLoadState('networkidle');
    this.grid = this.page.locator('#companyNoteGrid');
    this.gridDataRows = this.grid.locator('tbody tr');
    this.searchBox = this.grid.locator('.k-filtercell input').first();
  }

  async waitForGridRefresh() {
    await this.page.waitForLoadState('networkidle');
    await this.grid.waitFor({ state: 'visible', timeout: 10000 });
    await this.gridDataRows.first().waitFor({ state: 'visible', timeout: 30000 });
  }

  //  SEARCH & VERIFY

  /**
   * SEARCHES for a timestamp/ID and WAITS for the result row.
   * @param {string} uniqueId - The text to search (e.g., "112050")
   */
  async searchAndGetFirstRow(uniqueId) {
    // 1. Find the Search Box
    const activeSearch = this.searchBox;
    await activeSearch.waitFor({ state: 'attached', timeout: 10000 });
    await activeSearch.fill(uniqueId);
    await activeSearch.press('Enter');

    // 3. Wait for Loading Spinner to disappear
    if (await this.loadingMask.isVisible()) {
      await this.loadingMask.waitFor({ state: 'hidden', timeout: 10000 });
    }

    // 4. Wait for the Specific Row to appear
    const specificRow = this.gridDataRows.filter({ hasText: uniqueId });
    await specificRow.waitFor({ state: 'visible', timeout: 15000 });

    // 5. Return the text for assertion
    return await specificRow.locator('td[data-field="Note"]').innerText();
  }

  //  UTILS

  generateUniqueNote(prefix = 'Automated Marketing Note') {
    return generateUniqueDescription(prefix, 'MarketingNote');
  }

  getNoteCellLocator(uniqueNote) {
    return this.page.locator('td[data-field="Note"]').filter({ hasText: uniqueNote });
  }
}
