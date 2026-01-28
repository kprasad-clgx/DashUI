import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DataQualityDashboardPage from '../../../pageObjects/enterprise/dashboardPD/dataQualityDashboard.po.js';
import EmployeeSecuritySettingsPage from '../../../pageObjects/enterprise/administrationFG/employeeSecuritySettings.po.js';

test('Data Quality Dashboard Page, Check When user is not authorized to view Gross Profit', async ({
  authenticatedPage,
}) => {
  const page = authenticatedPage;
  const dataQualityDashboardPage = new DataQualityDashboardPage(page);
  const employeeSecuritySettingsPage = new EmployeeSecuritySettingsPage(page);

  // Navigate to Employee Security Settings page from Administration menu
  await employeeSecuritySettingsPage.navigateToEmployeeSecuritySettings();

  // Click Security Card
  await page.locator('div.card_33:has(.sectionHeaderText:has-text("Security"))').click();
  await page.waitForLoadState('networkidle');

  await page
    .locator('a#ctl00_ContentPlaceHolder1_tvAccessn114 img[alt="Expand Dashboards"]')
    .click();
  await page.waitForLoadState('domcontentloaded');

  // Wait for the "Job Dashboard" expand icon to be visible
  await page
    .locator('a#ctl00_ContentPlaceHolder1_tvAccessn116 img[alt="Expand Job Dashboard"]')
    .waitFor({ state: 'visible', timeout: 10000 });

  // Click the "Job Dashboard" expand icon
  await page
    .locator('a#ctl00_ContentPlaceHolder1_tvAccessn116 img[alt="Expand Job Dashboard"]')
    .click();
  await page.waitForLoadState('domcontentloaded');

  // Gross Profit checkbox locator
  const grossProfitCheckbox = page.locator('#ctl00_ContentPlaceHolder1_tvAccessn246CheckBox');

  // Check if the checkbox is visible and save the state
  await grossProfitCheckbox.isVisible();

  // If checked, uncheck it
  if (await grossProfitCheckbox.isChecked()) {
    await grossProfitCheckbox.uncheck();
  }

  // Navigate to Data Quality Dashboard page
  await dataQualityDashboardPage.navigateToDataQualityDashboard();

  // Assert page heading
  await dataQualityDashboardPage.assertPageHeading();

  // Assert date filter panel is visible
  await dataQualityDashboardPage.assertDatePanelVisible();

  // Assert all category labels are visible
  await dataQualityDashboardPage.assertAllCategoryLabelsVisible();

  // Locator for the Gross Profit tile (by label)
  const grossProfitTile = page.locator('td.dashboard_Tile >> text=Gross Profit:');

  // Assert that the Gross Profit tile is not visible
  await expect(grossProfitTile).not.toBeVisible();
});
