import { test } from '../../../fixtures/enterpriseFixtures.js';
import { generateUniqueName } from '../../../utils/helpers.js';
import { ChecklistPage } from '../../../pageObjects/enterprise/manageChecklist/ChecklistPage.po.js';

test('Add New Checklist', async ({ authenticatedPage }) => {
  const checklistPage = new ChecklistPage(authenticatedPage);
  const uniqueName = generateUniqueName('Checklist');
  // 1. Navigate
  await checklistPage.navigateTo('More...', 'Manage Checklists');
  // 2. Add
  await checklistPage.addNewChecklist(uniqueName);
  // 3. Verify
  await checklistPage.verifyChecklist(uniqueName);
});
