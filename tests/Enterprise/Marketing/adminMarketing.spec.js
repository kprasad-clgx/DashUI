import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import AdminMarketingPage from '../../../pageObjects/enterprise/Marketing/adminMarketing.po.js';

test('Admin Marketing Page validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const adminMarketingPage = new AdminMarketingPage(page);

  // Navigate to Admin Marketing page via menu
  await adminMarketingPage.navigateToAdminMarketing();

  // Assert Marketing Dashboard Page Title is visible and correct
  await expect(await adminMarketingPage.verifyDashboardTitleVisible()).toBeVisible();
  await expect(await adminMarketingPage.verifyDashboardTitleVisible()).toHaveText(
    'Marketing Dashboard',
  );

  // Array of labels to validate in Marketing Dashboard section
  const labelsToValidate = [
    'Jobs Received Today',
    'My Referrals Today',
    'No Source Jobs',
    'My Clients Lacking Interaction',
    'Referral Tracker',
    'Direct E-mail Marketing',
  ];
  // Assert all dashboard labels are visible
  await adminMarketingPage.verifyDashboardLabelsVisible(labelsToValidate);

  // Assert Admin Marketing Header is visible and correct
  await expect(await adminMarketingPage.verifyAdminMarketingHeaderVisible()).toBeVisible();
  await expect(await adminMarketingPage.verifyAdminMarketingHeaderVisible()).toHaveText(
    'Admin Marketing',
  );

  // Array of labels to verify in Admin Marketing section
  const adminMarketingLabels = [
    'Marketing Campaign Builder',
    'Marketing Activities',
    'Development Quotas',
    'Ranks',
    'Referral Type',
    'Marketing Groups and Routes',
  ];
  // Assert all Admin Marketing section labels are visible
  await adminMarketingPage.verifyAdminMarketingLabelsVisible(adminMarketingLabels);
});
