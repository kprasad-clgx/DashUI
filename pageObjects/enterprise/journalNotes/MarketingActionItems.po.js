import { generateUniqueDescription } from '../../../utils/helpers.js';
import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class MarketingActionItemsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // --- LOCATORS ---
    this.addNewRecordBtn = page.locator('#buttonAddRecord');

    // Grid Container
    this.gridContainer = page.locator('#grid');

    // Action Item Filter Input
    this.actionItemFilterInput = page.getByRole('textbox', { name: 'Action Items' });

    // First Row Task Description Cell
    this.firstRowTaskDescription = page.locator('#grid tbody tr:first-child td:nth-child(6)');
    // Modal Locator
    this.taskModal = page.locator('.modal-content, iframe[name*="RadWindow"], .RadWindow');

    // Loading Mask
    this.loadingMask = page.locator('.k-loading-mask');
  }

  //Clicks "Add New Record" and waits for the Task Modal to appear.
  async clickAddNewRecord() {
    await this.addNewRecordBtn.waitFor({ state: 'visible' });
    await this.addNewRecordBtn.click();
    await this.taskModal.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  //Generates a unique description string.
  generateUniqueDescription(prefix, testType = 'Marketing') {
    return generateUniqueDescription(prefix, testType);
  }

  async searchAndVerifyTask(uniqueDescription) {
    const timestamp = uniqueDescription.split(' ').pop();

    // Wait for grid to be ready
    await this.gridContainer.waitFor({ state: 'visible' });

    // Interact with the Filter Input
    await this.actionItemFilterInput.waitFor({ state: 'visible' });
    await this.actionItemFilterInput.click();
    await this.actionItemFilterInput.fill('');
    await this.actionItemFilterInput.pressSequentially(timestamp, { delay: 100 });

    // Trigger Search
    await this.actionItemFilterInput.press('Enter');

    // Wait for loading mask to disappear
    await this.loadingMask.waitFor({ state: 'hidden', timeout: 30000 });

    // Wait for the first row task description to be visible and have text
    await this.firstRowTaskDescription.waitFor({ state: 'visible', timeout: 5000 });

    // Check if the result has appeared with the unique description
    const actualText = await this.firstRowTaskDescription.textContent();
    console.log(`First row text: ${actualText}`);

    if (!actualText || !actualText.includes(uniqueDescription)) {
      throw new Error(
        `Grid filter failed! Expected first row to contain "${uniqueDescription}" but found "${actualText || 'no text'}"`,
      );
    }
  }
}
