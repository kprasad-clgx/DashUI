import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DashboardDatesTabPage from '../../../pageObjects/enterprise/dashboardEvans/datesTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Dates Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const dashboardDatesTabPage = new DashboardDatesTabPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);

  // Navigate to Dates tab
  await dashboardDatesTabPage.navigateToDatesTab();

  // Verify Date of Loss label is visible
  await expect(await dashboardDatesTabPage.verifyDateOfLossLabelVisible()).toBeVisible();

  // Click on Date of loss Current Date Select button
  await dashboardDatesTabPage.clickDateOfLossCurrentDateSelectButton();

  // Verify Date Received label is visible
  await expect(await dashboardDatesTabPage.verifyDateReceivedLabelVisible()).toBeVisible();

  // Click on Date Contacted Current Date Select button
  await dashboardDatesTabPage.clickDateOfLossCurrentDateSelectButton();

  // Click on Date Inspected Current Date Select button
  await dashboardDatesTabPage.clickDateContactedCurrentDateSelectButton();

  // Verify Date of Work Authorization label is visible
  await expect(
    await dashboardDatesTabPage.verifyDateOfWorkAuthorizationLabelVisible(),
  ).toBeVisible();

  // Click on Date of Work Authorization Current Date Select button
  await dashboardDatesTabPage.clickDateOfWorkAuthorizationCurrentDateSelectButton();

  // Verify Date Estimate Sent label is visible
  await expect(await dashboardDatesTabPage.verifyDateEstimateSentLabelVisible()).toBeVisible();

  // Click on Date Estimate Sent Current Date Select button
  await dashboardDatesTabPage.clickDateEstimateSentCurrentDateSelectButton();

  // Click on Date Estimate Approved Current Date Select button
  await dashboardDatesTabPage.clickDateEstimateSentCurrentDateSelectButton();

  // Click on Date Inventoried Current Date Select button
  await dashboardDatesTabPage.clickDateInventoriedCurrentDateSelectButton();

  // Verify Target Start Date label is visible
  await expect(await dashboardDatesTabPage.verifyTargetStartDateLabelVisible()).toBeVisible();

  // Click on Target Start Date Current Date Select button
  await dashboardDatesTabPage.clickTargetStartDateCurrentDateSelectButton();

  // Verify Target Start Date input is visible
  await expect(await dashboardDatesTabPage.verifyTargetStartDateInputVisible()).toBeVisible();

  // Click on Target Start Date Current Date Select button
  await dashboardDatesTabPage.clickTargetStartDateCurrentDateSelectButton();

  // Verify Provider Reason for Closing label is visible
  await expect(
    await dashboardDatesTabPage.verifyProviderReasonForClosingLabelVisible(),
  ).toBeVisible();

  // Verify Put on Hold Job button is visible
  await expect(await dashboardDatesTabPage.verifyPutOnHoldJobButtonVisible()).toBeVisible();

  // Verify Into Production Date label is visible
  await expect(await dashboardDatesTabPage.verifyIntoProductionDateLabelVisible()).toBeVisible();

  // Click on Into Production Date Current Date Select button
  await dashboardDatesTabPage.clickIntoProductionDateCurrentDateSelectButton();

  // Verify Date Started label is visible
  await expect(await dashboardDatesTabPage.verifyDateStartedLabelVisible()).toBeVisible();

  // Click on Date Started Current Date Select button
  await dashboardDatesTabPage.clickDateStartedCurrentDateSelectButton();

  // Verify Date of Majority Completed label is visible
  await expect(await dashboardDatesTabPage.verifyDateCompletedLabelVisible()).toBeVisible();

  // Click on Date of Majority Completed Current Date Select button
  await dashboardDatesTabPage.clickDateCompletedCurrentDateSelectButton();

  // Verify Date Target label is visible
  await expect(await dashboardDatesTabPage.verifyDateTargetLabelVisible()).toBeVisible();

  // Date of Target Completed Current date select button
  await dashboardDatesTabPage.clickDateTargetCurrentDateSelectButton();

  // Verify Date Invoiced label is visible
  await expect(await dashboardDatesTabPage.verifyDateInvoicedLabelVisible()).toBeVisible();

  // Date invoiced Current date select button
  await dashboardDatesTabPage.clickDateInvoicedCurrentDateSelectButton();

  // Verify Date Paid label is visible
  await expect(await dashboardDatesTabPage.verifyDatePaidLabelVisible()).toBeVisible();

  // Click on Date Paid Current Date Select button
  await dashboardDatesTabPage.clickDatePaidCurrentDateSelectButton();

  // Date Paid Current date select button
  await dashboardDatesTabPage.clickDatePaidCurrentDateSelectButton();

  // Date Closed Current date select button
  await dashboardDatesTabPage.clickDateClosedCurrentDateSelectButton();

  // Verify Save button is visible
  const saveDatesButton = await dashboardDatesTabPage.verifySaveDatesButtonVisible();
  await expect(saveDatesButton).toBeVisible();

  // Verify Save button is button type
  await expect(saveDatesButton).toHaveAttribute('type', 'button');
});
