import { test } from '../../../fixtures/enterpriseFixtures.js';
import ComplianceTaskTabPage from '../../../pageObjects/enterprise/dashboardEvans/complianceTaskTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Compliance Tasks Tab Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const complianceTaskTabPage = new ComplianceTaskTabPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);

  // Navigate to Compliance Tasks tab
  await complianceTaskTabPage.navigateToComplianceTasksTab();

  // Validate Compliance Manager label
  await complianceTaskTabPage.assertComplianceManagerLabel();

  // Array of Feedback grid headers
  const feedbackGridHeaders = [
    'Owner',
    'Job Name',
    'Assignee',
    'Action Title',
    'Description',
    'Required Action',
    'Associated Completion Date',
    'Due In',
    'Due Date',
    'Pause Date',
    'Completed Date',
    'Rejected By',
    'Priority',
    'Exception Reason',
    'Pause Reason',
    'Review Status',
    'Exception Reason Note',
    'CompletionIntervalInMinutes',
    'Completed',
  ];

  // Validate each header in the Feedback grid
  await complianceTaskTabPage.assertGridHeaders(feedbackGridHeaders);

  // Assert export to Excel button is visible
  await complianceTaskTabPage.assertExportToExcelButton();

  // Download and assert Excel file
  await complianceTaskTabPage.downloadAndAssertExcel();

  // Assert refresh button is visible
  await complianceTaskTabPage.assertRefreshButton();
});
