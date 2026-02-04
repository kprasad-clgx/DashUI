import { test } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Automate Filter options for Pending, Warning and Overdue jobs', async ({
  authenticatedPage,
}) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Search for the job using the robust utility
  await searchJobNumber(authenticatedPage, jobNumber);

  // Wait for job slideboard page to load
  await authenticatedPage.waitForLoadState('networkidle');

  // Click Compliance Tasks tab
  await jobSlideboardPage.clickComplianceTasksTab();

  // Test and select each filter option, then export
  for (const status of ['Pending', 'Overdue', 'Warning', 'Overdue']) {
    await jobSlideboardPage.selectTaskStatusFilter(status);
    await jobSlideboardPage.clickExportToExcel();
  }

  // Select status option (radio button 2)
  await jobSlideboardPage.selectStatusOption(2);

  // Test Completed filter
  await jobSlideboardPage.selectTaskStatusFilter('Completed');
  await jobSlideboardPage.clickExportToExcel();

  // Test Completed Late
  await jobSlideboardPage.selectTaskStatusFilter('Completed Late');
  await jobSlideboardPage.clickExportToExcel();

  // Test Rejected
  await jobSlideboardPage.selectTaskStatusFilter('Rejected');
});
