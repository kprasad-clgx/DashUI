import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import DashboardPhotosTabPage from '../../../pageObjects/enterprise/dashboardEvans/photosTab.po.js';
import dashboardAccountingNotesData from '../../../testData/enterprise/enterpriseCompanySettings/DashboardAccountingNotes.json' with { type: 'json' };
import getRandomNumber from '../../../utils/randomNumber.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';

test('Photos Tab Upload and Download Validation', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const photosTabPage = new DashboardPhotosTabPage(page);

  // Search for job by number
  await searchJobNumber(page, dashboardAccountingNotesData.jobNumber);

  // Navigate to Photos tab
  await photosTabPage.navigateToPhotosTab();

  // Verify Add Album button is visible
  await expect(await photosTabPage.verifyAddAlbumButtonVisible()).toBeVisible();

  // Verify Upload Photo button is visible
  await expect(await photosTabPage.verifyUploadPhotoButtonVisible()).toBeVisible();

  // Click Upload Photo button
  await photosTabPage.clickUploadPhotoButton();

  // Verify photo upload modal is open
  await expect(await photosTabPage.verifyPhotoUploadModalOpen()).toBeVisible();

  // Verify Photo upload heading text
  await photosTabPage.verifyPhotoUploadHeadingText('Photo upload');

  // Upload a random file from uploadImages folder
  await photosTabPage.uploadPhotoFiles(photosTabPage.getRandomImagePath());

  await photosTabPage.verifyPhotoUploadHeadingText('Photo upload');
  console.log('Photo upload heading text verified successfully');

  // Click Upload button and verify upload completes
  await photosTabPage.clickUploadButton();

  // Close the photo upload modal
  await photosTabPage.closePhotoUploadModal();

  // Verify 3D Room Models button is visible
  await expect(await photosTabPage.verifyRoomModelsButtonVisible()).toBeVisible();

  // Click on 3D Room Models button
  await photosTabPage.click3DRoomModelsButton();

  // Wait for the popup div to be visible
  await photosTabPage.waitForLinksPopupVisible();

  // Verify header text inside iframe
  await photosTabPage.verifyLinksIframeHeaderText('3D Room Models');

  // Verify cancel image is visible inside iframe
  await expect(await photosTabPage.verifyLinksIframeCancelImgVisible()).toBeVisible();

  // Verify all three buttons are visible inside the iframe
  await expect(await photosTabPage.verifyDocusketchButtonVisible()).toBeVisible();
  await expect(await photosTabPage.verifyMatterportButtonVisible()).toBeVisible();
  await expect(await photosTabPage.verifyHoverButtonVisible()).toBeVisible();

  // Click cancel image inside iframe to close popup
  await photosTabPage.clickLinksIframeCancelImg();

  // Verify popup is hidden
  await photosTabPage.verifyLinksPopupHidden();

  // Verify Manage Photos and Albums button is visible
  await expect(await photosTabPage.verifyManagePhotosAndAlbumsButtonVisible()).toBeVisible();

  // Verify Export Photos for Linked Jobs to PDF button is visible
  await expect(await photosTabPage.verifyExportPhotosToPDFButtonVisible()).toBeVisible();

  // Verify Sort Albums label is visible
  await expect(await photosTabPage.verifySortAlbumsLabelVisible()).toBeVisible();

  // Verify Date Created dropdown is visible
  await expect(await photosTabPage.verifyDateCreatedDropdownVisible()).toBeVisible();

  // Click on add album button
  await photosTabPage.clickAddAlbumButton();

  // Wait for the album modal iframe to be visible
  const albumModalFrame = await photosTabPage.waitForAlbumModalIframe();

  // Verify Create Album button is visible
  await expect(await photosTabPage.verifyCreateAlbumButtonVisible(albumModalFrame)).toBeVisible();

  // Enter album name
  const albumName = `Automate${getRandomNumber(1, 9999)}`;
  await photosTabPage.enterNewAlbumName(albumModalFrame, albumName);

  // Verify Cancel button is visible
  await expect(await photosTabPage.verifyCancelButtonVisible(albumModalFrame)).toBeVisible();

  // Click Create Album button
  await photosTabPage.clickCreateAlbumButtonInModal(albumModalFrame);

  // Verify the iframe is closed
  await photosTabPage.verifyAlbumModalClosed();

  // Click on manage photos and albums button
  await photosTabPage.navigateToManagePhotosAndAlbums();

  await this.page.reload();
  await this.page.waitForLoadState('networkidle');

  // Verify All button is visible in manage photos and albums page
  await expect(await photosTabPage.verifySelectAllButtonVisible()).toBeVisible();

  // Verify All Dry Track button is visible in manage photos and albums page
  await expect(await photosTabPage.verifySelectAllDryTrackButtonVisible()).toBeVisible();

  // Verify All Xactware/Claims Workspace button is visible in manage photos and albums page
  await expect(await photosTabPage.verifySelectAllXactwareButtonVisible()).toBeVisible();

  // Verify None button is visible in manage photos and albums page
  await expect(await photosTabPage.verifySelectNoneButtonVisible()).toBeVisible();

  // Verify Update Album button is visible in manage photos and albums page
  await expect(await photosTabPage.verifyUpdateAlbumButtonVisible()).toBeVisible();

  // Verify Delete Album button is visible in manage photos and albums page
  await expect(await photosTabPage.verifyDeleteAlbumButtonVisible()).toBeVisible();

  // Verify Download Photos button is initially disabled
  await photosTabPage.verifyDownloadPhotosButtonDisabled();

  // Verify Move Photo button is initially disabled
  await photosTabPage.verifyMovePhotoButtonDisabled();

  // Verify Copy Photo button is initially disabled
  await photosTabPage.verifyCopyPhotoButtonDisabled();

  // Verify sort photos label is visible in manage photos and albums page
  await expect(await photosTabPage.verifySortPhotosLabelVisible()).toBeVisible();

  // Verify the new album is created and visible on the page manage photos and albums page
  await expect(await photosTabPage.verifyAlbumCreatedAndVisible(albumName)).toBeVisible();

  // Click on the newly created album
  await photosTabPage.clickOnCreatedAlbum(albumName);

  // Click on Delete Album button
  await photosTabPage.clickDeleteAlbumButton();

  // Click on all button to enable all photos
  await photosTabPage.clickSelectAllButton();

  // Verify download button is enabled after selecting all photos
  await photosTabPage.verifyDownloadPhotosButtonEnabled();

  // Click on Download Photos button
  await photosTabPage.clickDownloadPhotosButton();

  // Click on Back To Slideboard button
  await photosTabPage.clickBackToSlideboardButton();

  // Navigate to Photos tab
  await photosTabPage.navigateToPhotosTab();

  // Assert Auto Generate Photos Tags are present
  await photosTabPage.verifyAutoGeneratePhotoTagsPresent();
});
