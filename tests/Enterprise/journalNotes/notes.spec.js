import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { NotesPage } from '../../../pageObjects/enterprise/journalNotes/NotesPage.po.js';

test('Verify Notes page elements and grid', async ({ authenticatedPage }) => {
  const notesPage = new NotesPage(authenticatedPage);

  await notesPage.navigateTo('Journal Notes', 'Notes');
  await notesPage.waitForGridToLoad();

  await test.step('Verify grid headers', async () => {
    for (const locator of Object.values(notesPage.headers)) {
      await expect.soft(locator).toBeVisible();
    }
  });

  await test.step('Verify action buttons', async () => {
    for (const locator of Object.values(notesPage.buttons)) {
      await expect.soft(locator).toBeVisible();
    }
  });

  await test.step('Verify grid data and structure', async () => {
    const rowCount = await notesPage.getGridRowCount();
    expect(rowCount).toBeGreaterThan(0);

    // Dynamic check for all defined cells in the first row
    const fieldNames = ['JobNumber', 'Customer', 'AddedBy', 'Notes', 'DateEnter', 'Visibility'];
    for (const field of fieldNames) {
      await expect.soft(notesPage.getFirstRowCell(field)).toBeVisible();
    }
  });
});
