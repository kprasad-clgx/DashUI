import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ProductionActionItemsPage } from '../../../pageObjects/enterprise/journalNotes/ProductionActionItemsPage.po.js';

test('Verify Production Action Items page elements and grid', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const actionItemsPage = new ProductionActionItemsPage(page);

  await test.step('1. Navigate and Load', async () => {
    await actionItemsPage.navigateTo('Journal Notes', 'Production Action Items');
    await actionItemsPage.waitForGridToLoad();
  });

  await test.step('2. Verify Employee Selection Dropdown', async () => {
    await expect(actionItemsPage.employeeDropdown.input).toBeVisible();
    await expect(actionItemsPage.employeeDropdown.arrow).toBeVisible();
  });

  await test.step('3. Verify Grid Headers', async () => {
    for (const [name, locator] of Object.entries(actionItemsPage.headers)) {
      await expect.soft(locator, `Header '${name}' should be visible`).toBeVisible();
    }
  });

  await test.step('4. Verify Action Buttons', async () => {
    await expect.soft(actionItemsPage.refreshButton, 'Refresh button').toBeVisible();
    await expect.soft(actionItemsPage.exportToExcelButton, 'Export Excel button').toBeVisible();
    await expect.soft(actionItemsPage.clearAllFiltersButton, 'Clear Filters button').toBeVisible();
  });

  await test.step('6. Verify Grid Data Structure', async () => {
    const rowCount = await actionItemsPage.getGridRowCount();
    expect(rowCount).toBeGreaterThan(0);

    const cells = actionItemsPage.getRowCells(0);
    await expect.soft(cells.jobNumber).toBeVisible();
    await expect.soft(cells.customer).toBeVisible();
    await expect.soft(cells.dateReceived).toBeVisible();
    await expect.soft(cells.summary).toBeVisible();
    await expect.soft(cells.task).toBeVisible();
  });
});
