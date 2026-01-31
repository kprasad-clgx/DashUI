import { generateUniqueDescription } from '../../../utils/helpers.js';
import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class JobActionItemsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;

    // --- LOCATORS ---
    this.addNewRecordBtn = page.locator('#buttonAddRecord');

    // Grid Container
    this.gridContainer = page.locator('#grid');

    // Task Column Filter Input
    this.taskFilterInput = page.getByRole('textbox', { name: 'Task' });

    // First Row Task Description Cell
    this.firstRowTaskDescription = page.locator(
      '#grid tbody tr:first-child td[data-field="TaskDescription"]',
    );

    // Modal Locator
    this.taskModal = page.locator('.modal-content, iframe[name*="RadWindow"], .RadWindow');
  }

  async clickAddNewRecord() {
    await this.addNewRecordBtn.waitFor({ state: 'visible' });
    await this.addNewRecordBtn.click();
    await this.taskModal.first().waitFor({ state: 'visible', timeout: 15000 });
  }

  // Generate unique description
  generateUniqueDescription(prefix, testType = 'Job') {
    return generateUniqueDescription(prefix, testType);
  }

  async searchAndVerifyTask(uniqueDescription) {
    // Extract timestamp from the unique description
    const timestamp = uniqueDescription.split(' ').pop();

    // Wait for grid to be ready
    await this.gridContainer.waitFor({ state: 'visible' });

    // Interact with the Filter Input
    await this.taskFilterInput.waitFor({ state: 'visible' });
    await this.taskFilterInput.click();
    await this.taskFilterInput.fill('');
    await this.taskFilterInput.pressSequentially(timestamp, { delay: 100 });

    // Trigger Search
    await this.taskFilterInput.press('Enter');

    // Wait for the Grid to Update
    try {
      await this.firstRowTaskDescription
        .filter({ hasText: uniqueDescription })
        .waitFor({ state: 'visible', timeout: 10000 });
    } catch {
      console.log("First row didn't update immediately, waiting for network idle...");
      await this.page.waitForLoadState('networkidle');
    }

    // Assertion: Get text from the first row and verify
    const actualText = await this.firstRowTaskDescription.textContent();
    console.log(`First row text: ${actualText}`);

    if (!actualText.includes(uniqueDescription)) {
      throw new Error(
        `Grid filter failed! Expected first row to contain "${uniqueDescription}" but found "${actualText}"`,
      );
    }
  }
}
