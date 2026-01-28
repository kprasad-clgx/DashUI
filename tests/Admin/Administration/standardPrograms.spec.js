import { test } from '../../../fixtures/adminFixtures.js';
import { getRandomNumber } from '../../../utils/randomNumber.js';
import standardProgramData from '../../../testData/admin/Adminstration/standardProgram.json' with { type: 'json' };
import StandardProgramPage from '../../../pageObjects/admin/adminstration/standardProgram.po.js';

const { standardProgram } = standardProgramData;
let programName = `Program${getRandomNumber(1, 100000)}`;

test('Add New Standard Programs', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const standardProgramPage = new StandardProgramPage(page);

  // Navigate to Standard Programs page
  await standardProgramPage.navigateToStandardPrograms();

  // Verify Standard Programs page is loaded
  await standardProgramPage.verifyStandardProgramsPage();

  // Click Add New Program button
  await standardProgramPage.clickAddNewProgram();

  // Verify Add New Program modal and get iframe
  const modalIframe = await standardProgramPage.verifyAddNewProgramModal();

  // Fill program details
  await standardProgramPage.fillProgramDetails(
    modalIframe,
    programName,
    getRandomNumber(1, 9),
    getRandomNumber(1, 9),
  );

  // Check allow program requirement checkbox
  await standardProgramPage.checkAllowProgramRequirement(modalIframe);

  // Select random division and category
  await standardProgramPage.selectRandomDivision(modalIframe);
  await standardProgramPage.selectRandomCategory(modalIframe);

  // Select all states
  await standardProgramPage.selectAllStates(modalIframe);

  // Save the program
  await standardProgramPage.saveProgram(modalIframe);

  // Search for the newly added program in unpublished grid
  await standardProgramPage.searchUnpublishedProgram(programName);

  // Verify the program exists in unpublished grid
  await standardProgramPage.verifyUnpublishedProgramExists();

  // Click Publish Program
  await standardProgramPage.clickPublishProgram();

  // Verify Publish Program modal and get iframe
  const publishModalIframe = await standardProgramPage.verifyPublishProgramModal();

  // Check publish program checkbox
  await standardProgramPage.checkPublishProgramCheckbox(publishModalIframe);

  // Click Invitees tab
  await standardProgramPage.clickInviteesTab(publishModalIframe);

  // Search for provider
  await standardProgramPage.searchProvider(publishModalIframe, standardProgram.providerName);

  // Select first provider
  await standardProgramPage.selectFirstProvider(publishModalIframe);

  // Publish the program
  await standardProgramPage.publishProgram(publishModalIframe);

  // Navigate to Published tab
  await standardProgramPage.navigateToPublishedTab();

  // Verify export button on published grid
  await standardProgramPage.verifyPublishedExportButton();

  // Search for the published program
  await standardProgramPage.searchPublishedProgram(programName);

  // Verify the program exists in published grid
  await standardProgramPage.verifyPublishedProgramExists();
});
