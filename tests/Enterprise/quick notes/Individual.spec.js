import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { IndividualPage } from '../../../pageObjects/enterprise/quickNotes/IndividualPage.po.js';
import individualData from '../../../testData/enterprise/quickNotes/createIndividual/individualData.json' with { type: 'json' };
import { generateUniqueName } from '../../../utils/helpers.js';

test('Create Individual from Quick Notes', async ({ authenticatedPage }) => {
  // Initialize page objects
  const individualPage = new IndividualPage(authenticatedPage);

  // Open Quick Notes menu and navigate to Create Individual
  await individualPage.quickNotesIcon.click();
  await individualPage.createIndividualQuickLink.waitFor({ state: 'visible', timeout: 5000 });
  await individualPage.createIndividualQuickLink.click();
  await authenticatedPage.waitForLoadState('networkidle');

  // Generate a unique email
  const uniqueEmail = `${generateUniqueName('jane.smith')}@example.com`;

  // Prepare contact info by merging test data and overriding email
  const contactInfo = {
    ...individualData,
    email: uniqueEmail,
  };

  // Create individual using the complete workflow
  await individualPage.createIndividual(individualData, contactInfo);

  // Assert redirection to the edit page with optional dynamic ID
  await expect(authenticatedPage).toHaveURL(/Marketing\/AddIndividual\.aspx(\?EditId=\d+)?/);
});
