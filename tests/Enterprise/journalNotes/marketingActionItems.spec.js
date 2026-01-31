import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { TaskPage } from '../../../pageObjects/enterprise/quickNotes/TaskPage.po.js';
import { MarketingActionItemsPage } from '../../../pageObjects/enterprise/journalNotes/MarketingActionItems.po.js';
import marketingActionItemData from '../../../testData/enterprise/journalNotes/marketingActionItemData.json' with { type: 'json' };

test('Create Marketing Action Items from Journal Notes', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const taskPage = new TaskPage(page);
  const marketingActionItem = new MarketingActionItemsPage(page);

  // Navigate to Journal Notes > Marketing Action Items
  await marketingActionItem.navigateTo('Journal Notes', 'Marketing Action Items');

  // Open Modal
  await marketingActionItem.clickAddNewRecord();

  // Generate description once and store it
  const uniqueDescription = marketingActionItem.generateUniqueDescription(
    marketingActionItemData.taskDescriptionPrefix,
    'Marketing Action Item',
  );

  await taskPage.fillCompany();
  // await taskPage.fillIndividual();
  await taskPage.fillActivity(marketingActionItemData.activity);
  await taskPage.fillAmount(marketingActionItemData.amount);
  await taskPage.assignResource(marketingActionItemData.resourceAssigned);

  //use the string variable we generated
  await taskPage.fillTaskDescription(uniqueDescription);

  await taskPage.fillDates();

  // Save and Wait for Modal Close
  await taskPage.saveTask();

  await page.waitForLoadState('networkidle');

  // wait for the Grid to be the active view again
  await expect(marketingActionItem.gridContainer).toBeVisible({ timeout: 5000 });

  // Verify (Using Robust Retry Logic)
  await marketingActionItem.searchAndVerifyTask(uniqueDescription);
});
