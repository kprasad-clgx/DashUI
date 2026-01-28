import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import BizDevDashboardPage from '../../../pageObjects/enterprise/Marketing/bizDevDashboard.po.js';

test('Biz Dev Dashboard Page validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  // Instantiate the page object for Biz Dev Dashboard
  const bizDevDashboardPage = new BizDevDashboardPage(page);

  // Navigate to Biz Dev Dashboard page via menu
  await bizDevDashboardPage.navigateToBizDevDashboard();

  // Assert Biz Dev Dashboard Page Label is visible and correct
  await expect(await bizDevDashboardPage.verifyPageLabelVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyPageLabelVisible()).toHaveText('Biz Dev Dashboard');

  // Array of labels for Dashboard
  const dashboardLabels = [
    'Jobs Received Today',
    'Referrals Today',
    'No Source Jobs',
    'Clients Lacking Interaction',
    'Referral Tracker',
  ];
  // Assert all dashboard labels are visible
  await bizDevDashboardPage.verifyDashboardLabelsVisible(dashboardLabels);

  // Assert Employee selector label, value, and set button are visible and correct
  await expect(await bizDevDashboardPage.verifyEmployeeLabelVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyEmployeeLabelVisible()).toContainText('Employee');
  await expect(await bizDevDashboardPage.verifyEmployeeValueVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyEmployeeValueVisible()).toHaveText(
    'All Items Selected',
  );
  await expect(await bizDevDashboardPage.verifyEmployeeSetButtonVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyEmployeeSetButtonVisible()).toHaveValue('Set');

  // Assert Division selector label, value, and set button are visible and correct
  await expect(await bizDevDashboardPage.verifyDivisionLabelVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyDivisionLabelVisible()).toContainText('Division');
  await expect(await bizDevDashboardPage.verifyDivisionValueVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyDivisionValueVisible()).toHaveText(
    'All Items Selected',
  );
  await expect(await bizDevDashboardPage.verifyDivisionSetButtonVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyDivisionSetButtonVisible()).toHaveValue('Set');

  // Assert Office selector label, value, and set button are visible and correct
  await expect(await bizDevDashboardPage.verifyOfficeLabelVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyOfficeLabelVisible()).toContainText('Office');
  await expect(await bizDevDashboardPage.verifyOfficeValueVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyOfficeValueVisible()).toHaveText(
    'All Items Selected',
  );
  await expect(await bizDevDashboardPage.verifyOfficeSetButtonVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyOfficeSetButtonVisible()).toHaveValue('Set');

  // Assert "Time Frame" label is visible and correct
  await expect(await bizDevDashboardPage.verifyTimeFrameLabelVisible()).toBeVisible();
  await expect(await bizDevDashboardPage.verifyTimeFrameLabelVisible()).toContainText('Time Frame');

  // Select "This Month" from Time Frame dropdown
  await bizDevDashboardPage.selectTimeFrame('This Month');

  // Assert "This Month" is selected after reload
  await expect(await bizDevDashboardPage.verifyTimeFrameSelected('This Month')).toHaveValue(
    'This Month',
  );

  // Select random employee from dropdown
  const selectedEmployee = await bizDevDashboardPage.selectRandomEmployee();

  // Assert the selected employee is shown in the dropdown
  await expect(await bizDevDashboardPage.verifyEmployeeSelected(selectedEmployee)).toHaveValue(
    selectedEmployee,
  );

  // Wait for network to stabilize
  await bizDevDashboardPage.waitForNetworkIdle();
});
