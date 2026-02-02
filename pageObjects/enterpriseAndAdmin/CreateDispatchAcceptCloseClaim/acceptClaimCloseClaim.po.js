import { expect } from '@playwright/test';

const CloseClaimLocators = {
  // Accept Job Page - Search
  acceptJobRows: '#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00__0',
  customerSearchInput:
    '#ctl00_ContentPlaceHolder1_gvAcceptClaims_ctl00_ctl02_ctl03_FilterTextBox_CustomerName',
  viewAcceptLink: 'a[id*="ViewAcceptJobLinkButton"]',

  // Accept Claim Modal
  acceptClaimModal: '#RadWindowWrapper_ctl00_ContentPlaceHolder1_UserListDialog',
  acceptClaimIframe: 'iframe[name="UserListDialog"]',
  acceptButtonInIframe: '#btnSaveAndClose',

  // Assign Estimator/Coordinator Modal
  commonModal: '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common',
  commonIframe: 'iframe[name="RadWindow_Common"]',
  estimatorDropdownArrow: '#comboBox_Estimator_Arrow',
  estimatorDropdownList: '#comboBox_Estimator_DropDown .rcbList',
  coordinatorDropdownArrow: '#comboBox_Coordinator_Arrow',
  coordinatorDropdownList: '#comboBox_Coordinator_DropDown .rcbList',
  saveAssignButton: '#button_SaveAssignEstimator',

  // Compliance Tasks
  selectAllCheckbox:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00_ctl02_ctl02_SelectColumnSelectCheckBox',
  rejectReasonDropdown:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReviewStatusRadComboBox_Input',
  rejectReasonOptions:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReviewStatusRadComboBox_DropDown .rcbList .rcbItem',
  rejectButton: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ReasonButton',
  complianceTaskRows:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_ComplianceTasks_userControl_ComplianceManagerGridView_ctl00',

  // Edit Claim Information
  claimInfoEditIcon: '#ctl00_ContentPlaceHolder1_dockClaimInformation_T_link_EditClaim',
  editClaimModalHeader: 'em',
  referredByDropdownArrow: '#comboBox_RefferedBy_Arrow',
  referredByDropdownList: '#comboBox_RefferedBy_DropDown .rcbList',
  reportedByDropdownArrow: '#comboBox_ReportedBy_Arrow',
  reportedByDropdownList: '#comboBox_ReportedBy_DropDown .rcbList',
  saveModalButton: '#Button_Save_input',

  // Close Job
  closeJobButton: '#DivisionActionsPanel button.buttonCore.primaryButton.divisionButtonStyle',
  confirmationHeader: 'em',
  reasonDropdownArrow: '#ReasonForClosingRadComboBox_Arrow',
  reasonOptions: '#ReasonForClosingRadComboBox_DropDown .rcbList .rcbItem',
  dplsReasonDropdownArrow: '#DplsReasonForClosingRadComboBox_Arrow',
  dplsReasonOptions: '#DplsReasonForClosingRadComboBox_DropDown .rcbList .rcbItem',
  modalCloseButton:
    'input#CloseReopenButton.buttonCore.primaryButton[type="submit"][value="Close Job"]',

  // Job Status Verification
  reopenJobButton: '#DivisionActionsPanel button.buttonCore.primaryButton.divisionButtonStyle',
  jobTabLinkPanel: '#JobTabLinkPanel',
  statusSpan: 'span.fontHeaderNormalLightBlue',
};

class AcceptClaimCloseClaimPage {
  constructor(page) {
    this.page = page;
  }

  /**
   * Search for customer by last name
   * @param {string} customerLastName - Customer last name to search
   */
  async searchCustomer(customerLastName) {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    const customerSearchInput = this.page.locator(CloseClaimLocators.customerSearchInput);
    await customerSearchInput.click();
    await customerSearchInput.fill(customerLastName);
    await this.page.keyboard.press('Enter');

    await expect(this.page.locator(CloseClaimLocators.acceptJobRows).first()).toBeVisible({
      timeout: 10000,
    });
  }

  /**
   * Click View/Accept link
   */
  async clickViewAccept() {
    // Wait for loading overlay to disappear
    const loadingPanel = this.page.locator('.RadAjax.RadAjax_Office2007');
    await loadingPanel.waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});

    await this.page.waitForLoadState('networkidle', { timeout: 60000 });

    // Use the more reliable ID-based selector
    const viewAcceptLink = this.page.locator(CloseClaimLocators.viewAcceptLink).first();
    await viewAcceptLink.waitFor({ state: 'visible', timeout: 10000 });

    // Ensure element is enabled and not covered by overlays
    await expect(viewAcceptLink).toBeEnabled({ timeout: 15000 });

    // Try scrolling into view first
    await viewAcceptLink.scrollIntoViewIfNeeded();

    // Wait a bit more for any animations
    await expect(this.page.locator(CloseClaimLocators.acceptJobRows).first()).toBeVisible({
      timeout: 15000,
    });

    // Try regular click first, then force click if needed
    try {
      await viewAcceptLink.click({ timeout: 10000 });
    } catch (error) {
      console.log('Regular click failed, trying force click...');
      await viewAcceptLink.click({ force: true, timeout: 30000 });
    }
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Accept claim in modal
   */
  async acceptClaimInModal() {
    const acceptClaimModal = this.page.locator(CloseClaimLocators.acceptClaimModal);
    await acceptClaimModal.waitFor({ state: 'visible', timeout: 20000 });

    const acceptClaimIframe = this.page.frameLocator(CloseClaimLocators.acceptClaimIframe);
    await expect(this.page.locator(CloseClaimLocators.acceptClaimIframe)).toBeVisible({
      timeout: 20000,
    });

    const acceptButtonInIframe = acceptClaimIframe.locator(CloseClaimLocators.acceptButtonInIframe);
    await acceptButtonInIframe.waitFor({ state: 'visible', timeout: 20000 });
    await acceptButtonInIframe.click();

    await acceptClaimModal.waitFor({ state: 'hidden', timeout: 20000 });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Assign estimator and coordinator
   */
  async assignEstimatorAndCoordinator() {
    const commonModal = this.page.locator(CloseClaimLocators.commonModal);
    await commonModal.waitFor({ state: 'visible', timeout: 15000 });

    const innerIframe = this.page.locator(CloseClaimLocators.commonIframe);
    await innerIframe.waitFor({ state: 'visible', timeout: 10000 });

    const dropDownIFrame = this.page.frameLocator(CloseClaimLocators.commonIframe);

    // Select Estimator
    const estimatorDropdownArrow = dropDownIFrame.locator(
      CloseClaimLocators.estimatorDropdownArrow,
    );
    await estimatorDropdownArrow.waitFor({ state: 'visible', timeout: 10000 });
    await estimatorDropdownArrow.click();

    const estimatorDropdownList = dropDownIFrame.locator(CloseClaimLocators.estimatorDropdownList);
    await estimatorDropdownList.waitFor({ state: 'visible', timeout: 10000 });

    const thirdEstimatorOption = estimatorDropdownList.locator('li.rcbItem').nth(2);
    await thirdEstimatorOption.waitFor({ state: 'visible', timeout: 5000 });
    await thirdEstimatorOption.click();

    // Select Coordinator
    const coordinatorDropdownArrow = dropDownIFrame.locator(
      CloseClaimLocators.coordinatorDropdownArrow,
    );
    await coordinatorDropdownArrow.waitFor({
      state: 'visible',
      timeout: 10000,
    });
    await coordinatorDropdownArrow.click();

    const coordinatorDropdownList = dropDownIFrame.locator(
      CloseClaimLocators.coordinatorDropdownList,
    );
    await coordinatorDropdownList.waitFor({ state: 'visible', timeout: 10000 });

    const thirdCoordinatorOption = coordinatorDropdownList.locator('li.rcbItem').nth(2);
    await thirdCoordinatorOption.waitFor({ state: 'visible', timeout: 5000 });
    await thirdCoordinatorOption.click();

    // Save
    const saveButton = dropDownIFrame.locator(CloseClaimLocators.saveAssignButton);
    await saveButton.waitFor({ state: 'visible', timeout: 10000 });
    await saveButton.click();

    await commonModal.waitFor({ state: 'hidden', timeout: 15000 });
  }

  /**
   * Reject all compliance tasks
   */
  async rejectComplianceTasks() {
    const selectAllCheckbox = this.page.locator(CloseClaimLocators.selectAllCheckbox);
    await expect(selectAllCheckbox).toBeVisible({ timeout: 15000 });
    await selectAllCheckbox.click();

    const rejectReasonDropdown = this.page.locator(CloseClaimLocators.rejectReasonDropdown);
    await rejectReasonDropdown.click();

    const rejectReasonOptions = this.page.locator(CloseClaimLocators.rejectReasonOptions);
    await expect(rejectReasonOptions.first()).toBeVisible();

    const optionCount = await rejectReasonOptions.count();
    const randomIndex = Math.floor(Math.random() * (optionCount - 1)) + 1;
    await rejectReasonOptions.nth(randomIndex).click();

    const rejectButton = this.page.locator(CloseClaimLocators.rejectButton);
    await rejectButton.click();

    const complianceTaskRows = this.page.locator(CloseClaimLocators.complianceTaskRows);
    await expect(complianceTaskRows).toHaveCount(1, { timeout: 10000 });
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Edit claim information
   */
  async editClaimInformation() {
    const claimInfoEditIcon = this.page.locator(CloseClaimLocators.claimInfoEditIcon);
    await claimInfoEditIcon.waitFor({ state: 'visible', timeout: 10000 });
    await claimInfoEditIcon.click();
    await this.page.waitForLoadState('networkidle');

    const editClaimModal = this.page.locator(CloseClaimLocators.commonModal);
    await editClaimModal.waitFor({ state: 'visible', timeout: 15000 });

    const modalHeader = editClaimModal.locator(CloseClaimLocators.editClaimModalHeader, {
      hasText: 'Edit Claim Information',
    });
    await expect(modalHeader).toBeVisible({ timeout: 5000 });

    const editClaimIFrame = this.page.frameLocator(CloseClaimLocators.commonIframe);
    await expect(this.page.locator(CloseClaimLocators.commonIframe)).toBeVisible({
      timeout: 20000,
    });

    // Select Referred By
    const referredByDropdownArrow = editClaimIFrame.locator(
      CloseClaimLocators.referredByDropdownArrow,
    );
    await referredByDropdownArrow.waitFor({ state: 'visible', timeout: 10000 });
    await referredByDropdownArrow.click();

    const referredByDropdownList = editClaimIFrame.locator(
      CloseClaimLocators.referredByDropdownList,
    );
    await referredByDropdownList.waitFor({ state: 'visible', timeout: 10000 });

    const firstReferredByOption = referredByDropdownList.locator('li.rcbItem').first();
    await firstReferredByOption.waitFor({ state: 'visible', timeout: 10000 });
    await firstReferredByOption.click();
    await expect(referredByDropdownList).toBeHidden({ timeout: 5000 });

    // Select Reported By
    const reportedByDropdownArrow = editClaimIFrame.locator(
      CloseClaimLocators.reportedByDropdownArrow,
    );
    await reportedByDropdownArrow.waitFor({ state: 'visible', timeout: 10000 });
    await reportedByDropdownArrow.click();

    const reportedByDropdownList = editClaimIFrame.locator(
      CloseClaimLocators.reportedByDropdownList,
    );
    await reportedByDropdownList.waitFor({ state: 'visible', timeout: 10000 });

    const firstReportedByOption = reportedByDropdownList.locator('li.rcbItem').first();
    await firstReportedByOption.waitFor({ state: 'visible', timeout: 10000 });
    await firstReportedByOption.click();
    await expect(reportedByDropdownList).toBeHidden({ timeout: 5000 });

    // Select Job size
    const jobSizeDropDown = editClaimIFrame.locator('#JobSizeComboBox_Arrow');
    await jobSizeDropDown.waitFor({ state: 'visible', timeout: 10000 });
    await jobSizeDropDown.click();

    // Wait for dropdown list and select second option (Small)
    const jobSizeDropdownList = editClaimIFrame.locator('#JobSizeComboBox_DropDown .rcbList');
    await jobSizeDropdownList.waitFor({ state: 'visible', timeout: 10000 });

    const secondJobSizeOption = jobSizeDropdownList.locator('li.rcbItem').nth(1); // Index 1 = "Small"
    await secondJobSizeOption.waitFor({ state: 'visible', timeout: 5000 });
    await secondJobSizeOption.click();
    await expect(jobSizeDropdownList).toBeHidden({ timeout: 5000 });

    // Save
    const saveModalButton = editClaimIFrame.locator(CloseClaimLocators.saveModalButton);
    await saveModalButton.waitFor({ state: 'visible', timeout: 10000 });
    await saveModalButton.click();
    await editClaimModal.waitFor({ state: 'hidden', timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  // Edit Job information
  async editJobInformation() {
    const jobInformationEditIcon = this.page.locator('#img_EditDivision');
    await jobInformationEditIcon.waitFor({ state: 'visible', timeout: 10000 });
    await jobInformationEditIcon.click();
    await this.page.waitForLoadState('networkidle');

    const editJobModal = this.page.locator(CloseClaimLocators.commonModal);
    await editJobModal.waitFor({ state: 'visible', timeout: 25000 });

    // Access the iframe
    const editJobIFrame = this.page.frameLocator(CloseClaimLocators.commonIframe);
    await expect(this.page.locator(CloseClaimLocators.commonIframe)).toBeVisible({
      timeout: 20000,
    });

    const environmentDropdownArrow = editJobIFrame.locator('#comboBoxEnvironmentalCode_Arrow');
    await environmentDropdownArrow.waitFor({ state: 'visible', timeout: 10000 });
    await environmentDropdownArrow.click();

    const environmentDropdownList = editJobIFrame.locator('#comboBoxEnvironmentalCode_DropDown .rcbList');
    await environmentDropdownList.waitFor({ state: 'visible', timeout: 10000 });

    const secondOption = environmentDropdownList.locator('li.rcbItem').nth(1);
    await secondOption.click();

    const saveJobModalButton = editJobIFrame.locator('#Button_Save_input');
    await saveJobModalButton.waitFor({ state: 'visible', timeout: 10000 });
    await saveJobModalButton.click();
    await editJobModal.waitFor({ state: 'hidden', timeout: 15000 });
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Close job with random reasons
   */
  async closeJob() {
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    const closeJobButton = this.page
      .locator(CloseClaimLocators.closeJobButton)
      .filter({ hasText: 'Close Job' });
    await expect(closeJobButton).toBeVisible({ timeout: 10000 });
    await closeJobButton.click();

    const modalWrapper = this.page.locator(CloseClaimLocators.commonModal);
    await expect(modalWrapper).toBeVisible({ timeout: 20000 });

    const confirmationHeader = modalWrapper.locator(CloseClaimLocators.confirmationHeader, {
      hasText: 'Confirmation',
    });
    await expect(confirmationHeader).toBeVisible({ timeout: 10000 });

    const iframeSelector = CloseClaimLocators.commonIframe;
    await expect(this.page.locator(iframeSelector)).toBeVisible({
      timeout: 20000,
    });

    // Wait for frame to be available
    let modalFrame = null;
    for (let i = 0; i < 20; i++) {
      modalFrame = this.page.frame({ name: 'RadWindow_Common' });
      if (modalFrame) break;
      await this.page.waitForTimeout(1000);
    }
    expect(modalFrame).not.toBeNull();

    // Select Provider reason
    const reasonDropdownArrow = modalFrame.locator(CloseClaimLocators.reasonDropdownArrow);
    await expect(reasonDropdownArrow).toBeVisible({ timeout: 10000 });
    await reasonDropdownArrow.click();

    const reasonOptions = modalFrame.locator(CloseClaimLocators.reasonOptions);
    await expect(reasonOptions.first()).toBeVisible({ timeout: 10000 });
    const reasonOptionCount = await reasonOptions.count();
    const randomReasonIndex = Math.floor(Math.random() * (reasonOptionCount - 1)) + 1;
    await reasonOptions.nth(randomReasonIndex).click();

    // Select DPLS reason
    const dplsReasonDropdownArrow = modalFrame.locator(CloseClaimLocators.dplsReasonDropdownArrow);
    await expect(dplsReasonDropdownArrow).toBeVisible({ timeout: 10000 });
    await dplsReasonDropdownArrow.click();

    const dplsReasonOptions = modalFrame.locator(CloseClaimLocators.dplsReasonOptions);
    await expect(dplsReasonOptions.first()).toBeVisible({ timeout: 10000 });
    const dplsReasonOptionCount = await dplsReasonOptions.count();
    const randomDplsReasonIndex = Math.floor(Math.random() * (dplsReasonOptionCount - 1)) + 1;
    await dplsReasonOptions.nth(randomDplsReasonIndex).click();

    // Click Close Job
    const modalCloseButton = modalFrame.locator(CloseClaimLocators.modalCloseButton);
    await expect(modalCloseButton).toBeVisible({ timeout: 10000 });
    await modalCloseButton.click();
  }

  /**
   * Verify job is closed
   */
  async verifyJobClosed() {
    const reopenJobButton = this.page
      .locator(CloseClaimLocators.reopenJobButton)
      .filter({ hasText: 'Reopen Job' });
    await expect(reopenJobButton).toBeVisible();

    const jobTabLinkPanel = this.page.locator(CloseClaimLocators.jobTabLinkPanel);
    await expect(jobTabLinkPanel).toBeVisible({ timeout: 10000 });

    const statusSpan = jobTabLinkPanel
      .locator(CloseClaimLocators.statusSpan, { hasText: 'Status:' })
      .locator('xpath=following-sibling::span[contains(@class,"fontHeaderNormalGray")]');

    await expect(statusSpan).toHaveText(/Closed/i);
  }

  /**
   * Complete accept and close claim workflow
   * @param {string} customerLastName - Customer last name for search
   */
  async acceptAndCloseClaimWorkflow(customerLastName) {
    await this.searchCustomer(customerLastName);
    await this.clickViewAccept();
    await this.acceptClaimInModal();
    await this.assignEstimatorAndCoordinator();
    await this.editJobInformation();
    await this.rejectComplianceTasks();
    await this.editClaimInformation();
    await this.closeJob();
    await this.verifyJobClosed();
  }
}

export default AcceptClaimCloseClaimPage;
