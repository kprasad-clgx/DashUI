import { test } from '../../../fixtures/enterpriseFixtures.js';
import CreateLeadJobPage from '../../../pageObjects/enterprise/dashboardPD/createLeadJob(Legacy).po.js';

test('Error Page Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const createLeadJobPageInstance = new CreateLeadJobPage(page);

  // Navigate to Accounts Receivable Tracking page
  await createLeadJobPageInstance.navigateToAccountsReceivableTracking();

  // Assert Error Message is visible
  await createLeadJobPageInstance.assertErrorMessageVisible();

  // Assert Try Again button and click it
  await createLeadJobPageInstance.assertAndClickSourceURLButton();

  // Assert Error Message On Navigation
  await createLeadJobPageInstance.assertErrorMessageVisible();
});
