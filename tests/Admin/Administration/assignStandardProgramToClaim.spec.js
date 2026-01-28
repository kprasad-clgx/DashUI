import { expect, test } from '../../../fixtures/adminFixtures.js';
import { getRandomNumber } from '../../../utils/randomNumber.js';
import standardProgramData from '../../../testData/admin/Adminstration/standardProgram.json' with { type: 'json' };
import CreateClaimPage from '../../../pageObjects/admin/dashAdmin/createNewClaim.po.js';
import { AssignStandardProgramPage } from '../../../pageObjects/admin/adminstration/assignStandardProgram.po.js';
import claimData from '../../../testData/admin/Adminstration/claimDataStandardProgram.json' with { type: 'json' };
import StandardProgramPage from '../../../pageObjects/admin/adminstration/standardProgram.po.js';

const { standardProgram } = standardProgramData;
let programName = `Program${getRandomNumber(1, 100000)}`;

test('Assign Newly Created Standard Program to Claim', async ({ authenticatedPage }) => {
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

  // Select Water Mitigation and residential category
  await standardProgramPage.selectWaterMitigation(modalIframe);
  await standardProgramPage.selectResidentialCategory(modalIframe);

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

  // Flow of creating a new claim to assign the standard program
  const createClaimPage = new CreateClaimPage(page);
  const assignStandardProgramPage = new AssignStandardProgramPage(page);

  // Click on create new claim
  await createClaimPage.clickCreateClaimBtn();

  // Complete claim creation workflow
  await createClaimPage.createClaimWork(claimData.claimDetails);

  // Verify Assign Program modal and get iframe
  const { assignProgramModal, assignProgramIframe } =
    await assignStandardProgramPage.verifyAssignProgramModal();

  // Verify Please Assign Program label
  await assignStandardProgramPage.verifyPleaseAssignProgramLabel(assignProgramIframe);

  // Verify Choose Program dropdown
  await assignStandardProgramPage.verifyChooseProgramDropdown(assignProgramIframe);

  // Select the program by name - MAKE SURE you pass assignProgramIframe here
  await assignStandardProgramPage.selectProgramByName(assignProgramIframe, programName);

  // Click assign program button
  await assignStandardProgramPage.clickAssignProgramButton(assignProgramIframe);

  // Wait for modal to close - pass assignProgramModal here
  await assignStandardProgramPage.waitForModalToClose(assignProgramModal);

  // Verify assigned program
  await assignStandardProgramPage.verifyAssignedProgram(programName);

  //
});
