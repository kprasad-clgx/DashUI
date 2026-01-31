import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { ReportsPage } from '../../../pageObjects/enterprise/reports/reports.po.js';
import testData from '../../../testData/enterprise/jobReceivedReportData.json' with { type: 'json' };

test.describe('Job Received Report', () => {
  for (const data of testData) {
    test(`Job Received Report - ${data.startDate} to ${data.endDate}`, async ({
      authenticatedPage,
    }) => {
      const page = authenticatedPage;
      const reportsPage = new ReportsPage(page);

      // 1. Navigate
      await reportsPage.navigateToReports();

      // 2. Open report and CAPTURE the new popup window
      const reportNewPage = await reportsPage.openJobsReceivedReport();

      // 3. Pass the captured window to the method that fills the form
      const download = await reportsPage.createJobReceivedReport(
        reportNewPage,
        data.startDate,
        data.endDate,
      );

      // 4. Verification
      expect(download).toBeTruthy();
      expect(download.suggestedFilename()).toBe('JobsReceived_Report.xls');

      // 5. Cleanup: Close the popup so the next iteration starts clean
      await reportNewPage.close();
    });
  }
});
