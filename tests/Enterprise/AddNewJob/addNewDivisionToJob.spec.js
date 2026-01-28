import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { CreateJobCloseJobPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createJobCloseJob.po.js';
import AddNewDivisionToJobPage from '../../../pageObjects/enterprise/addNewJob/addNewDivisionToJob.po.js';
import createJobData from '../../../testData/enterprise/enterpriseJobData.json' with { type: 'json' };
import DashboardNotesTabPage from '../../../pageObjects/enterprise/dashboardEvans/notesTab.po.js';
import { CreateJobDeleteJobPage } from '../../../pageObjects/enterprise/closeAndDeleteJobAndClaim/createJobDeleteJob.po.js';

const { newJobData } = createJobData;

test('Add New Division to Job, Delete Newly Created Job and Assert Cannot Copy Notes To New Job', async ({
  authenticatedPage,
}) => {
  const page = authenticatedPage;
  const createJobPage = new CreateJobCloseJobPage(page);
  const addNewDivisionPage = new AddNewDivisionToJobPage(page);
  const notesTabPage = new DashboardNotesTabPage(page);
  const deleteJobPage = new CreateJobDeleteJobPage(page);

  // Navigate to Create Job
  await createJobPage.clickCreateJobButton();

  // Fill Job Form
  await createJobPage.selectRandomLossCategoryExceptFirst();
  await createJobPage.selectCustomer(
    newJobData.customerName,
    newJobData.customerFirstName,
    newJobData.customerLastName,
  );
  await createJobPage.checkSameAsCustomerAddress(
    newJobData.customerFirstName,
    newJobData.customerLastName,
  );
  await createJobPage.checkWaterMitigation();
  await createJobPage.fillLossDescription(newJobData.lossDescription);

  // Click on Save and Go to Job Slideboard
  await createJobPage.clickSaveBtnAndGoToSlideBoard();

  await page.waitForLoadState('networkidle');

  // Wait for page to fully load by waiting for the Add New Division button
  await expect(await addNewDivisionPage.verifyAddNewJobLinkButtonVisible()).toBeVisible({
    timeout: 30000,
  });

  // Click the Add New Job button to open the modal
  await addNewDivisionPage.clickAddNewJobLinkButton();

  // Wait for the modal to open by waiting for the modal wrapper to be visible
  await expect(await addNewDivisionPage.verifyModalWrapperVisible()).toBeVisible({
    timeout: 15000,
  });

  // Get the header locator inside the modal and wait for it to appear
  await expect(await addNewDivisionPage.verifyModalHeader()).toBeVisible({
    timeout: 5000,
  });

  // Assert the header text
  await expect(await addNewDivisionPage.verifyModalHeader()).toHaveText('Add New Division');

  // Wait for the iframe inside the modal to be attached and visible
  await expect(await addNewDivisionPage.verifyIframeBodyVisible()).toBeVisible({ timeout: 15000 });

  // Click the division dropdown inside the iframe
  await addNewDivisionPage.clickDivisionDropdownArrow();

  // Wait for the dropdown options to load (at least the first option should be visible)
  await expect(await addNewDivisionPage.waitForDivisionDropdownOptions()).toBeVisible({
    timeout: 5000,
  });

  // Select "Aircraft Restoration" from the dropdown
  await addNewDivisionPage.selectAircraftRestoration();

  // Click the Save button inside the iframe
  await expect(await addNewDivisionPage.verifySaveButtonVisible()).toBeVisible({ timeout: 15000 });
  await addNewDivisionPage.clickSaveButton();

  // Wait for the modal to close (wait for the modal wrapper to be hidden)
  await expect(await addNewDivisionPage.waitForModalToClose()).toBeHidden({
    timeout: 15000,
  });
  await page.waitForLoadState('networkidle');

  //  Wait for the tabs to be loaded and visible before counting
  await expect(await addNewDivisionPage.waitForTabsVisible()).toBeVisible({
    timeout: 15000,
  });

  // Assert that the last tab has the class 'rtsLast' (newly added division)
  const lastTab = await addNewDivisionPage.verifyLastTabAdded();
  await expect(lastTab).toHaveClass(/rtsLast/);
  await expect(lastTab).toBeVisible({ timeout: 15000 });

  // Assert that the last tab text is "Aircraft Restoration"
  await expect(await addNewDivisionPage.verifyLastTabText('Aircraft Restoration')).toHaveText(
    'Aircraft Restoration',
  );

  // Click the last tab and wait for it to be selected
  await addNewDivisionPage.clickLastTab();
  await expect(await addNewDivisionPage.verifyLastTabSelected()).toHaveClass(/rtsSelected/, {
    timeout: 20000,
  });

  // Wait for page to load and division content to appear
  await page.waitForLoadState('networkidle');
  await addNewDivisionPage.waitForDivisionContentLoaded();

  // Additional wait to ensure all division-specific data is loaded
  await page.waitForLoadState('networkidle');

  // Naviate to Compliance Tab to delete the newly created job
  await notesTabPage.navigateToComplianceTab();

  // Now reject all compliance tasks
  await createJobPage.rejectAllComplianceTasks();

  // Delete the job
  await deleteJobPage.deleteJob();

  await page.waitForLoadState('networkidle');

  // Verify job assignment link is visible
  await expect(await deleteJobPage.verifyJobAssignmentLinkVisible()).toBeVisible();

  // Navigate to Notes tab
  await notesTabPage.navigateToNotesTab();

  // Click grid first checkbox
  await notesTabPage.clickGridFirstCheckBox();

  // Verify Copy Notes button is enabled after selecting a note
  await notesTabPage.verifyCopyNotesButtonEnabled();

  // Click Copy Notes button
  await notesTabPage.clickCopyNotesButton();

  // Verify Copy Notes modal is visible
  await expect(await notesTabPage.verifyCopyNotesModalVisible()).toBeVisible();

  // Verify iframe inside the modal is visible
  await expect(await notesTabPage.verifyCopyNotesIframeVisible()).toBeVisible();

  // Assert modal header is visible and correct
  await expect(await notesTabPage.verifyModalHeader()).toHaveText(/Copy Note/);

  // Assert the select all checkbox is visible and click it
  await expect(await notesTabPage.verifySelectAllCheckboxVisible()).toBeVisible();
  await notesTabPage.clickSelectAllCheckbox();

  // Assert the Send button is visible and disabled
  await expect(await notesTabPage.verifySendButtonDisabled()).toBeDisabled();

  // Verify Cancel button is visible and click it
  await expect(await notesTabPage.verifyCancelButtonVisible()).toBeVisible();
  await notesTabPage.clickCancelButton();
});
