import { expect } from '@playwright/test';
import path from 'path';

/**
 * @typedef {Object} PhotosTabLocatorsType
 * @property {string} photosTab
 * @property {string} addAlbumButton
 * @property {string} uploadPhotoButton
 * @property {string} photoModalContent
 * @property {string} photoUploadHeading
 * @property {string} photoUploadClose
 * @property {string} fileUploader
 * @property {string} fileSelectionOutput
 * @property {string} thumbnailImage
 * @property {string} thumbnailName
 * @property {string} descriptionTextarea
 * @property {string} applyToAllButton
 * @property {string} resetAllButton
 * @property {string} removeFileButton
 * @property {string} addFileButton
 * @property {string} uploadButton
 * @property {string} photoCount
 * @property {string} albumSelector
 * @property {string} uploadStatus
 * @property {string} progressBar
 * @property {string} uploadPercentage
 * @property {string} labelMessage
 * @property {string} managePhotosAndAlbumsButton
 * @property {string} selectAllButton
 * @property {string} selectAllDryTrackButton
 * @property {string} selectAllXactwareButton
 * @property {string} selectNoneButton
 * @property {string} updateAlbumButton
 * @property {string} deleteAlbumButton
 * @property {string} downloadPhotosButton
 * @property {string} movePhotoButton
 * @property {string} copyPhotoButton
 * @property {string} sortPhotosLabel
 * @property {string} roomModelsButton
 * @property {string} exportPhotosToPDFButton
 * @property {string} sortAlbumsLabel
 * @property {string} dateCreatedDropdown
 * @property {string} albumModalIframe
 * @property {string} createAlbumButton
 * @property {string} cancelButton
 */

/** @type {PhotosTabLocatorsType} */
const PhotosTabLocators = {
  photosTab: "#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt:has-text('Photos')",
  addAlbumButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Photos_userControl_ctl00_CreateNewAlbumButton',
  uploadPhotoButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Photos_userControl_ctl00_UploadPhotosButton',
  photoModalContent: 'div.photoModalContent',
  photoUploadHeading: '#photoHeadingDiv',
  photoUploadClose: '#photoUploadClose',
  fileUploader: '#fileUploader',
  fileSelectionOutput: '#fileSelectionOutput',
  thumbnailImage: '.selectedOutputThumbnail',
  thumbnailName: '.selectedOutputThumbnailName',
  descriptionTextarea: '.selectedOutputDescription',
  applyToAllButton: '.descriptionApplyAll',
  resetAllButton: '.descriptionResetAll',
  removeFileButton: '.thumbnailRemove',
  addFileButton: '#fileUploadContentBottom',
  uploadButton: '.fileUploadSave',
  photoCount: '#displayPhotoCount',
  albumSelector: '#fileAlbumControl',
  uploadStatus: '#fileUploadStatus',
  progressBar: '#uploadProgress',
  progressBarLight: '#progressBarLight',
  uploadPercentage: '#uploadPercentage',
  labelMessage: '#labelMessage',
  photoUploadBottom: '#photoUploadBottom',
  managePhotosAndAlbumsButton: '#ManagePhotosAndAlbumsButton',
  selectAllButton: '#ctl00_ContentPlaceHolder1_ctl00_SelectAllPhotosButton',
  selectAllDryTrackButton: '#ctl00_ContentPlaceHolder1_ctl00_SelectAllDryTrackPhotosButton',
  selectAllXactwareButton: '#ctl00_ContentPlaceHolder1_ctl00_SelectAllEdiPhotosButton',
  selectNoneButton: '#ctl00_ContentPlaceHolder1_ctl00_SelectNoneButton',
  updateAlbumButton: '#ctl00_ContentPlaceHolder1_ctl00_UpdateAlbumButton',
  deleteAlbumButton: '#ctl00_ContentPlaceHolder1_ctl00_DeleteAlbumButton',
  downloadPhotosButton: '#ctl00_ContentPlaceHolder1_ctl00_DownloadPhotosButton',
  movePhotoButton: '#ctl00_ContentPlaceHolder1_ctl00_MovePhotosButton',
  copyPhotoButton: '#ctl00_ContentPlaceHolder1_ctl00_CopyPhotosButton',
  sortPhotosLabel: '#ctl00_ContentPlaceHolder1_ctl00_SortPhotoLabel',
  roomModelsButton: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Photos_userControl_ctl00_LinksButton',
  exportPhotosToPDFButton: '#GeneratePdfByClaimButton',
  sortAlbumsLabel:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Photos_userControl_ctl00_SortAlbumLabel',
  dateCreatedDropdown:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Photos_userControl_ctl00_SortAlbumComboBox_Input',
  albumModalIframe: 'iframe[name="window_Common"]',
  createAlbumButton: '#SaveButton_input',
  cancelButton: '#CancelButton',
  linksPopup: '#LinksPopup',
  linksIframe: '#LinksIframe',
  linksIframeHeader: '.headerDiv1',
  linksIframeCancelImg: '.cancelImg',
  docusketchButton: '#DocusketchButton',
  matterportButton: '#MatterportButton',
  hoverButton: '#HoverButton',
};

class DashboardPhotosTabPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Get a random image path from the uploadImages folder
   * @returns {string} Full path to a random image
   */
  getRandomImagePath() {
    const availableImages = [
      'Basement2.jpg',
      'Bedroom2.jpg',
      'CommonRoom1.jpg',
      'Garage1.jpg',
      'Home.jpg',
      'Washroom.jpg',
    ];
    const randomImage = availableImages[Math.floor(Math.random() * availableImages.length)];
    const imagePath = path.join(process.cwd(), 'testData', 'uploadImages', randomImage);
    return imagePath;
  }

  // Navigate to Photos tab
  async navigateToPhotosTab() {
    const photosTab = this.page.locator(PhotosTabLocators.photosTab);
    await photosTab.waitFor({ state: 'visible', timeout: 5000 });
    await photosTab.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Add Album button is visible
  async verifyAddAlbumButtonVisible() {
    const addAlbumButton = this.page.locator(PhotosTabLocators.addAlbumButton);
    await addAlbumButton.waitFor({ state: 'visible' });
    return addAlbumButton;
  }

  // Verify Upload Photo button is visible
  async verifyUploadPhotoButtonVisible() {
    const uploadPhotoButton = this.page.locator(PhotosTabLocators.uploadPhotoButton);
    await uploadPhotoButton.waitFor({ state: 'visible' });
    return uploadPhotoButton;
  }

  // Click Upload Photo button
  async clickUploadPhotoButton() {
    const uploadPhotoButton = this.page.locator(PhotosTabLocators.uploadPhotoButton);
    await uploadPhotoButton.waitFor({ state: 'visible' });
    await uploadPhotoButton.click();
  }

  // Verify photo upload modal is open
  async verifyPhotoUploadModalOpen() {
    const photoUploadHeading = this.page.locator(PhotosTabLocators.photoUploadHeading);
    await photoUploadHeading.waitFor({ state: 'visible', timeout: 10000 });
    return photoUploadHeading;
  }

  // Upload photo file(s)
  async uploadPhotoFiles(filePaths) {
    const fileUploader = this.page.locator(PhotosTabLocators.fileUploader).first();
    await fileUploader.setInputFiles(filePaths);
    // Wait for the uploaded photo thumbnail to appear, confirming file processing
    await this.verifyPhotoThumbnailVisible();
  }

  // Verify uploaded photo thumbnail is visible
  async verifyPhotoThumbnailVisible() {
    const thumbnail = this.page.locator(PhotosTabLocators.thumbnailImage).first();
    await thumbnail.waitFor({ state: 'visible', timeout: 10000 });
    return thumbnail;
  }

  // Get uploaded photo name
  async getUploadedPhotoName() {
    const photoName = this.page.locator(PhotosTabLocators.thumbnailName).first();
    await photoName.waitFor({ state: 'visible' });
    return await photoName.textContent();
  }

  // Add description to photo
  async addPhotoDescription(description) {
    const descriptionField = this.page.locator(PhotosTabLocators.descriptionTextarea).first();
    await descriptionField.waitFor({ state: 'visible' });
    await descriptionField.fill(description);
  }

  // Click Apply to All button
  async clickApplyToAllButton() {
    const applyToAllButton = this.page.locator(PhotosTabLocators.applyToAllButton);
    await applyToAllButton.waitFor({ state: 'visible' });
    await applyToAllButton.click();
  }

  // Click Reset All button
  async clickResetAllButton() {
    const resetAllButton = this.page.locator(PhotosTabLocators.resetAllButton);
    await resetAllButton.waitFor({ state: 'visible' });
    await resetAllButton.click();
  }

  // Remove uploaded photo
  async removeUploadedPhoto(index = 0) {
    const removeButton = this.page.locator(PhotosTabLocators.removeFileButton).nth(index);
    await removeButton.waitFor({ state: 'visible' });
    await removeButton.click();
  }

  // Select album from dropdown
  async selectAlbum(albumValue) {
    const albumSelector = this.page.locator(PhotosTabLocators.albumSelector);
    await albumSelector.waitFor({ state: 'visible' });
    await albumSelector.selectOption(albumValue);
  }

  // Get photo count
  async getPhotoCount() {
    const photoCount = this.page.locator(PhotosTabLocators.photoCount);
    await photoCount.waitFor({ state: 'visible' });
    return await photoCount.textContent();
  }

  // Verify photo upload heading text
  async verifyPhotoUploadHeadingText(expectedText = 'Photo upload') {
    const photoUploadHeading = this.page.locator(PhotosTabLocators.photoUploadHeading);
    await photoUploadHeading.waitFor({ state: 'visible', timeout: 10000 });
    const actualText = await photoUploadHeading.textContent();
    if (actualText !== expectedText) {
      throw new Error(`Expected heading text: "${expectedText}", but got: "${actualText}"`);
    }
  }

  // Click Upload button and verify upload completes
  async clickUploadButton() {
    // 1. Wait for the Upload button to be visible
    const uploadButton = this.page.locator(PhotosTabLocators.uploadButton);
    await uploadButton.waitFor({ state: 'visible', timeout: 10000 });

    // 2. Wait for the button to be enabled (not disabled)
    await this.page.waitForFunction(
      (selector) => {
        const btn = document.querySelector(selector);
        return (
          btn &&
          !btn.disabled &&
          btn.textContent.includes('Upload') &&
          btn.textContent.includes('photo(s)')
        );
      },
      PhotosTabLocators.uploadButton,
      { timeout: 15000 },
    );

    // 3. Scroll the button into view in case it's offscreen
    await uploadButton.scrollIntoViewIfNeeded();

    // 4. Log button state for diagnostics before click
    const buttonText = await uploadButton.textContent();
    const isEnabled = await uploadButton.isEnabled();
    const isVisible = await uploadButton.isVisible();
    console.log(
      `Before click: Upload button text: ${buttonText}, enabled: ${isEnabled}, visible: ${isVisible}`,
    );

    // 5. Check for overlays or blockers above the button
    const buttonBox = await uploadButton.boundingBox();
    if (buttonBox) {
      // Check if any element is covering the button at its center
      const overlayElement = await this.page.evaluate(
        ({ x, y }) => {
          const el = document.elementFromPoint(x, y);
          if (!el) return null;
          return el.outerHTML;
        },
        { x: buttonBox.x + buttonBox.width / 2, y: buttonBox.y + buttonBox.height / 2 },
      );
      console.log('Element at button center:', overlayElement);
    } else {
      console.warn('Could not get bounding box for upload button.');
    }

    // 6. Wait for loading overlay to disappear before clicking
    const overlay = this.page.locator('.k-loading-image');
    if (await overlay.isVisible().catch(() => false)) {
      console.log('Waiting for loading overlay to disappear...');
      await overlay.waitFor({ state: 'hidden', timeout: 15000 });
    }

    // 7. Try clicking the button with force
    try {
      await uploadButton.hover();
      await this.page.mouse.move(
        buttonBox.x + buttonBox.width / 2,
        buttonBox.y + buttonBox.height / 2,
      );
      await this.page.mouse.down();
      await this.page.mouse.up();
      await uploadButton.click({ force: true });
      console.log('Upload button clicked successfully (Playwright click + mouse events).');
    } catch (err) {
      console.error('Playwright click and mouse events failed, will try JS click:', err);
      // Only run JS fallback if Playwright click throws
      const jsClickResult = await this.page.evaluate((selector) => {
        const btn = document.querySelector(selector);
        if (btn) {
          // Dispatch mouse events to simulate a real user click
          ['mouseover', 'mousedown', 'mouseup', 'click'].forEach((eventType) => {
            const event = new MouseEvent(eventType, {
              bubbles: true,
              cancelable: true,
              view: window,
            });
            btn.dispatchEvent(event);
          });
          return 'JS mouse events dispatched';
        }
        return 'Button not found for JS click';
      }, PhotosTabLocators.uploadButton);
      console.log('JS click result:', jsClickResult);
    }

    // 7. Log button state after click
    const buttonTextAfter = await uploadButton.textContent();
    const isEnabledAfter = await uploadButton.isEnabled();
    console.log(`After click: Upload button text: ${buttonTextAfter}, enabled: ${isEnabledAfter}`);

    // 8. Wait for the upload completion message to appear
    const uploadMessage = this.page.locator(PhotosTabLocators.uploadPercentage);
    const uploadText = await uploadMessage.textContent().catch(() => '');
    console.log('Upload percentage text after click:', uploadText);
    await uploadMessage.waitFor({ state: 'visible', timeout: 60000 });
  }

  // Close photo upload modal
  async closePhotoUploadModal() {
    const closeButton = this.page.locator(PhotosTabLocators.photoUploadClose);
    await closeButton.waitFor({ state: 'visible' });
    await closeButton.click();
  }

  // Verify modal is closed
  async verifyPhotoUploadModalClosed() {
    const photoModal = this.page.locator(PhotosTabLocators.photoModalContent);
    await photoModal.waitFor({ state: 'hidden', timeout: 5000 });
  }

  // Verify 3D Room Models button is visible
  async verifyRoomModelsButtonVisible() {
    const roomModelsButton = this.page.locator(PhotosTabLocators.roomModelsButton);
    await roomModelsButton.waitFor({ state: 'visible' });
    return roomModelsButton;
  }

  // Click on 3D Room Models button
  async click3DRoomModelsButton() {
    const roomModelsButton = this.page.locator(PhotosTabLocators.roomModelsButton);
    await roomModelsButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Wait for 3D Room Models popup to be visible
  async waitForLinksPopupVisible() {
    const popup = this.page.locator(PhotosTabLocators.linksPopup);
    await popup.waitFor({ state: 'visible', timeout: 10000 });
  }

  // Get the links iframe locator
  async getLinksIframeLocator() {
    await this.page.waitForSelector(PhotosTabLocators.linksIframe, {
      state: 'attached',
      timeout: 10000,
    });
    return this.page.frameLocator(PhotosTabLocators.linksIframe);
  }

  // Verify 3D Room Models header text in iframe
  async verifyLinksIframeHeaderText(expectedText = '3D Room Models') {
    const iframe = await this.getLinksIframeLocator();
    const header = iframe.locator(PhotosTabLocators.linksIframeHeader);
    await expect(header).toHaveText(expectedText);
  }

  // Verify cancel image is visible in iframe
  async verifyLinksIframeCancelImgVisible() {
    const iframe = await this.getLinksIframeLocator();
    const cancelImg = iframe.locator(PhotosTabLocators.linksIframeCancelImg);
    return cancelImg;
  }

  // Verify Docusketch button is visible in iframe
  async verifyDocusketchButtonVisible() {
    const iframe = await this.getLinksIframeLocator();
    const button = iframe.locator(PhotosTabLocators.docusketchButton);
    return button;
  }

  // Verify Matterport button is visible in iframe
  async verifyMatterportButtonVisible() {
    const iframe = await this.getLinksIframeLocator();
    const button = iframe.locator(PhotosTabLocators.matterportButton);
    return button;
  }

  // Verify Hover button is visible in iframe
  async verifyHoverButtonVisible() {
    const iframe = await this.getLinksIframeLocator();
    const button = iframe.locator(PhotosTabLocators.hoverButton);
    return button;
  }

  // Click cancel image to close popup
  async clickLinksIframeCancelImg() {
    const iframe = await this.getLinksIframeLocator();
    const cancelImg = iframe.locator(PhotosTabLocators.linksIframeCancelImg);
    await cancelImg.click();
  }

  // Verify Links popup is hidden
  async verifyLinksPopupHidden() {
    const popup = this.page.locator(PhotosTabLocators.linksPopup);
    await expect(popup).toBeHidden({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Manage Photos and Albums button is visible
  async verifyManagePhotosAndAlbumsButtonVisible() {
    const manageButton = this.page.locator(PhotosTabLocators.managePhotosAndAlbumsButton);
    await manageButton.waitFor({ state: 'visible' });
    return manageButton;
  }

  // Verify Export Photos for Linked Jobs to PDF button is visible
  async verifyExportPhotosToPDFButtonVisible() {
    const exportButton = this.page.locator(PhotosTabLocators.exportPhotosToPDFButton);
    await exportButton.waitFor({ state: 'visible' });
    return exportButton;
  }

  // Verify Sort Albums label is visible
  async verifySortAlbumsLabelVisible() {
    const sortAlbumsLabel = this.page.locator(PhotosTabLocators.sortAlbumsLabel);
    await sortAlbumsLabel.waitFor({ state: 'visible' });
    return sortAlbumsLabel;
  }

  // Verify Date Created dropdown is visible
  async verifyDateCreatedDropdownVisible() {
    const dateDropdown = this.page.locator(PhotosTabLocators.dateCreatedDropdown);
    await dateDropdown.waitFor({ state: 'visible' });
    return dateDropdown;
  }

  // Click Add Album button and handle modal
  async clickAddAlbumButton() {
    const addAlbumButton = this.page.locator(PhotosTabLocators.addAlbumButton);
    await addAlbumButton.waitFor({ state: 'visible' });
    await addAlbumButton.click();
  }

  // Wait for album modal iframe to be visible
  async waitForAlbumModalIframe() {
    const iframeLocator = this.page.locator(PhotosTabLocators.albumModalIframe);
    await iframeLocator.waitFor({ state: 'visible', timeout: 15000 });

    // Wait for the frame to be available
    let albumModalFrame = this.page.frame({ name: 'window_Common' });
    const start = Date.now();
    while (!albumModalFrame && Date.now() - start < 15000) {
      await this.page.waitForTimeout(200);
      albumModalFrame = this.page.frame({ name: 'window_Common' });
    }
    if (!albumModalFrame) {
      throw new Error('iframe "window_Common" not found');
    }
    return albumModalFrame;
  }

  // Enter New Albume Name in modal
  async enterNewAlbumName(modalFrame, albumName) {
    const albumNameInput = modalFrame.locator('#AlbumNameTextBox');
    await albumNameInput.waitFor({ state: 'visible' });
    await albumNameInput.fill(''); // Clear existing text
    await albumNameInput.fill(albumName);
  }

  // Verify Create Album button is visible in modal
  async verifyCreateAlbumButtonVisible(modalFrame) {
    const createAlbumButton = modalFrame.locator(PhotosTabLocators.createAlbumButton);
    await createAlbumButton.waitFor({ state: 'visible' });
    return createAlbumButton;
  }

  // Verify Cancel button is visible in modal
  async verifyCancelButtonVisible(modalFrame) {
    const cancelButton = modalFrame.locator(PhotosTabLocators.cancelButton);
    await cancelButton.waitFor({ state: 'visible' });
    return cancelButton;
  }

  // Click Cancel button in modal
  async clickCancelButtonInModal(modalFrame) {
    const cancelButton = modalFrame.locator(PhotosTabLocators.cancelButton);
    await cancelButton.waitFor({ state: 'visible' });
    await cancelButton.click();
  }

  // Click Add Album button in modal
  async clickCreateAlbumButtonInModal(modalFrame) {
    const createAlbumButton = modalFrame.locator(PhotosTabLocators.createAlbumButton);
    await createAlbumButton.waitFor({ state: 'visible' });
    await createAlbumButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify album modal iframe is closed
  async verifyAlbumModalClosed() {
    const iframeLocator = this.page.locator(PhotosTabLocators.albumModalIframe);
    await iframeLocator.waitFor({ state: 'hidden', timeout: 10000 });
  }

  // Navigate to Manage Photos and Albums page
  async navigateToManagePhotosAndAlbums() {
    const manageButton = this.page.locator(PhotosTabLocators.managePhotosAndAlbumsButton);
    await manageButton.waitFor({ state: 'visible' });
    await manageButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Newly created Album is present
  async verifyAlbumCreatedAndVisible(albumName) {
    const albumLocator = this.page
      .locator('#ctl00_ContentPlaceHolder1_ctl00_DivAlbums .album_cat_bor_bot a')
      .filter({ hasText: albumName });
    await albumLocator.waitFor({ state: 'visible' });
    return albumLocator;
  }

  // Click on Newly created Album
  async clickOnCreatedAlbum(albumName) {
    const albumLocator = this.page
      .locator('#ctl00_ContentPlaceHolder1_ctl00_DivAlbums .album_cat_bor_bot a')
      .filter({ hasText: albumName });
    await albumLocator.waitFor({ state: 'visible' });
    await albumLocator.click();
  }

  // Verify Select All button is visible
  async verifySelectAllButtonVisible() {
    const selectAllButton = this.page.locator(PhotosTabLocators.selectAllButton);
    await selectAllButton.waitFor({ state: 'visible' });
    return selectAllButton;
  }

  // Verify All Dry Track button is visible
  async verifySelectAllDryTrackButtonVisible() {
    const selectAllDryTrackButton = this.page.locator(PhotosTabLocators.selectAllDryTrackButton);
    await selectAllDryTrackButton.waitFor({ state: 'visible' });
    return selectAllDryTrackButton;
  }

  // Verify All Xactware button is visible
  async verifySelectAllXactwareButtonVisible() {
    const selectAllXactwareButton = this.page.locator(PhotosTabLocators.selectAllXactwareButton);
    await selectAllXactwareButton.waitFor({ state: 'visible' });
    return selectAllXactwareButton;
  }

  // Verify Select None button is visible
  async verifySelectNoneButtonVisible() {
    const selectNoneButton = this.page.locator(PhotosTabLocators.selectNoneButton);
    await selectNoneButton.waitFor({ state: 'visible' });
    return selectNoneButton;
  }

  // Verify Update Album button is visible
  async verifyUpdateAlbumButtonVisible() {
    const updateAlbumButton = this.page.locator(PhotosTabLocators.updateAlbumButton);
    await updateAlbumButton.waitFor({ state: 'visible' });
    return updateAlbumButton;
  }

  // Verify Delete Album button is visible
  async verifyDeleteAlbumButtonVisible() {
    const deleteAlbumButton = this.page.locator(PhotosTabLocators.deleteAlbumButton);
    await deleteAlbumButton.waitFor({ state: 'visible' });
    return deleteAlbumButton;
  }

  // Click on Delete Album button
  async clickDeleteAlbumButton() {
    const deleteAlbumButton = this.page.locator(PhotosTabLocators.deleteAlbumButton);
    await deleteAlbumButton.waitFor({ state: 'visible' });
    await deleteAlbumButton.click();
    // Handle alert popup
    this.page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Download Photos button is disabled
  async verifyDownloadPhotosButtonDisabled() {
    const downloadButton = this.page.locator(PhotosTabLocators.downloadPhotosButton);
    await downloadButton.waitFor({ state: 'visible' });
    const isDisabled = await downloadButton.isDisabled();
    if (!isDisabled) {
      throw new Error('Download Photos button should be disabled initially');
    }
  }

  // Verify Move Photo button is disabled
  async verifyMovePhotoButtonDisabled() {
    const moveButton = this.page.locator(PhotosTabLocators.movePhotoButton);
    await moveButton.waitFor({ state: 'visible' });
    const isDisabled = await moveButton.isDisabled();
    if (!isDisabled) {
      throw new Error('Move Photo button should be disabled initially');
    }
  }

  // Verify Copy Photo button is disabled
  async verifyCopyPhotoButtonDisabled() {
    const copyButton = this.page.locator(PhotosTabLocators.copyPhotoButton);
    await copyButton.waitFor({ state: 'visible' });
    const isDisabled = await copyButton.isDisabled();
    if (!isDisabled) {
      throw new Error('Copy Photo button should be disabled initially');
    }
  }

  // Verify Sort Photos label is visible
  async verifySortPhotosLabelVisible() {
    const sortPhotosLabel = this.page.locator(PhotosTabLocators.sortPhotosLabel);
    await sortPhotosLabel.waitFor({ state: 'visible' });
    return sortPhotosLabel;
  }

  // Click Select All button
  async clickSelectAllButton() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    const selectAllButton = this.page.locator(PhotosTabLocators.selectAllButton);
    await selectAllButton.waitFor({ state: 'visible' });
    await selectAllButton.click();
  }

  // Verify Download Photos button is enabled after selecting photos
  async verifyDownloadPhotosButtonEnabled() {
    const downloadButton = this.page.locator(PhotosTabLocators.downloadPhotosButton);
    await downloadButton.waitFor({ state: 'visible' });
    await downloadButton.waitFor({ state: 'attached' });

    // Wait for the button to be enabled
    await this.page.waitForFunction(
      (selector) => {
        const btn = document.querySelector(selector);
        return btn && !btn.disabled;
      },
      PhotosTabLocators.downloadPhotosButton,
      { timeout: 15000 },
    );

    const isEnabled = await downloadButton.isEnabled();
    if (!isEnabled) {
      throw new Error('Download Photos button should be enabled after selecting photos');
    }
  }

  // Click Download Photos button and handle download
  async clickDownloadPhotosButton() {
    const downloadButton = this.page.locator(PhotosTabLocators.downloadPhotosButton);
    await downloadButton.waitFor({ state: 'visible' });

    // Wait for download to start
    const downloadPromise = this.page.waitForEvent('download');

    // Wait for potential new page/tab to open
    const newPagePromise = this.page.context().waitForEvent('page');

    await downloadButton.click();

    // Wait for and handle download
    const download = await downloadPromise;

    // Get the downloaded file name
    const fileName = download.suggestedFilename();

    // Verify file name is in GUID format with .zip extension
    const guidPattern = /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}\.zip$/i;
    if (!guidPattern.test(fileName)) {
      throw new Error(
        `Expected file name in GUID format with .zip extension, but got: "${fileName}"`,
      );
    }

    // Handle the new tab that opens and auto-closes
    try {
      const newPage = await newPagePromise.catch(() => null);
      if (newPage) {
        // Wait for the new tab to close automatically
        await newPage.waitForEvent('close', { timeout: 10000 }).catch(() => {
          // If it doesn't auto-close, close it manually
          newPage.close();
        });
      }
    } catch (error) {
      // New tab handling is optional, continue if it fails
    }

    return download;
  }

  // Click on Back To Slideboard button
  async clickBackToSlideboardButton() {
    const backToSlideboardButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_BackToSlideBoardButton',
    );
    await backToSlideboardButton.waitFor({ state: 'visible' });
    await backToSlideboardButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Click On Refresh Photos Button on slideboard
  async clickRefreshPhotosButton() {
    const refreshPhotosButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Photos_userControl_ctl00_RefreshPhotoControlButton',
    );
    await refreshPhotosButton.waitFor({ state: 'visible' });
    await refreshPhotosButton.click();
  }

  /**
   * Refreshes photos until the number of <ul> inside the main auto-generated tags container is more than one,
   * or until the maxRetries limit is reached. Asserts success at the end.
   * @param {number} maxRetries - Maximum number of refresh attempts (default: 10)
   * @param {number} delaySeconds - Delay between retries in seconds (default: 3)
   */
  async verifyAutoGeneratePhotoTagsPresent(maxRetries = 10, delaySeconds = 3) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const mainUl = this.page.locator('ul[id^="dbTagsUL"]');
      const mainUlCount = await mainUl.count();
      if (mainUlCount > 0) {
        const ulCount = await mainUl.locator('ul').count();
        if (ulCount > 0) {
          expect(ulCount).toBeGreaterThan(0);
          return;
        }
      }
      if (attempt < maxRetries) {
        await this.clickRefreshPhotosButton();
        await this.page.waitForTimeout(delaySeconds * 1000);
      }
    }
    throw new Error('Photo tags did not appear after refreshing');
  }
}

export default DashboardPhotosTabPage;
