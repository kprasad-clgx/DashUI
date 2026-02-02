import { test } from '../../../fixtures/enterpriseFixtures.js';
import DirectEmailMarketingPage from '../../../pageObjects/enterprise/Marketing/directEmailMarketing.po.js';

test('Direct Email Marketing Page validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const directEmailMarketingPage = new DirectEmailMarketingPage(page);

  // Navigate to Direct Email Marketing page via menu
  await directEmailMarketingPage.navigateToDirectEmailMarketing();

  // Assertions using POM methods
  await directEmailMarketingPage.assertPageLabel();
  await directEmailMarketingPage.assertBackToDashboardButton();
  await directEmailMarketingPage.assertGridHeaders([
    'File Name',
    'Added By',
    'Added Date',
    'Updated By',
    'Updated Date',
  ]);
  await directEmailMarketingPage.assertButtonRow([
    'Add New E-mail Template',
    'Save Template',
    'Reset Editor',
    'Preview',
    'Rename File',
    'Delete File',
    'Clear Selection',
    'Upload to Franchisee',
  ]);
});
