/**
 * @typedef {Object} DashboardDatesTabLocatorsType
 * @property {string} tabDates
 * @property {string} dateOfLossLabel
 * @property {string} dateReceivedLabel
 * @property {string} dateOfWorkAuthorizationLabel
 * @property {string} dateEstimateSentLabel
 * @property {string} targetStartDateLabel
 * @property {string} targetStartDateInput
 * @property {string} providerReasonForClosingLabel
 * @property {string} putOnHoldJobButton
 * @property {string} intoProductionDateLabel
 * @property {string} dateStartedLabel
 * @property {string} dateCompletedLabel
 * @property {string} dateTargetLabel
 * @property {string} datePaidLabel
 * @property {string} dateInvoicedLabel
 * @property {string} saveDatesButton
 */

/** @type {DashboardDatesTabLocatorsType} */
const DashboardDatesTabLocators = {
  tabDates: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  dateOfLossLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_17',
  dateReceivedLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_0',
  dateOfWorkAuthorizationLabel:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_4',
  dateEstimateSentLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_3',
  targetStartDateLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_10005',
  targetStartDateInput:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_DateTimePicker_10005_dateInput',
  providerReasonForClosingLabel:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_ProviderReasonForClosingLabel',
  putOnHoldJobButton: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_HoldJobButton',
  intoProductionDateLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_13',
  dateStartedLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_6',
  dateCompletedLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_7',
  dateTargetLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_12',
  datePaidLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_9',
  dateInvoicedLabel: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_Label_14',
  saveDatesButton: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_button_UpdateDate',
};

class DashboardDatesTabPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Dates tab
  async navigateToDatesTab() {
    const tabDates = this.page.locator(DashboardDatesTabLocators.tabDates, {
      hasText: 'Dates',
    });
    await tabDates.waitFor({ state: 'visible', timeout: 5000 });
    await tabDates.click();
    await this.page.waitForTimeout(5000);
  }

  // Verify Date of Loss label is visible
  async verifyDateOfLossLabelVisible() {
    const dateOfLossLabel = this.page.locator(DashboardDatesTabLocators.dateOfLossLabel);
    await dateOfLossLabel.waitFor({ state: 'visible' });
    return dateOfLossLabel;
  }

  // Click on Date of loss Current Date Select button
  async clickDateOfLossCurrentDateSelectButton() {
    const dateOfLossCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_17',
    );
    await dateOfLossCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateOfLossCurrentDateSelectButton.click();
  }

  // Verify Date Received label is visible
  async verifyDateReceivedLabelVisible() {
    const dateReceivedLabel = this.page.locator(DashboardDatesTabLocators.dateReceivedLabel);
    await dateReceivedLabel.waitFor({ state: 'visible' });
    return dateReceivedLabel;
  }

  // Click on Date Contacted Current Date Select button
  async clickDateContactedCurrentDateSelectButton() {
    const dateContactedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_1',
    );
    await dateContactedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateContactedCurrentDateSelectButton.click();
  }

  // Click on Date Inspected Current Date Select button
  async clickDateInspectedCurrentDateSelectButton() {
    const dateInspectedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_2',
    );
    await dateInspectedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateInspectedCurrentDateSelectButton.click();
  }

  // Verify Date of Work Authorization label is visible
  async verifyDateOfWorkAuthorizationLabelVisible() {
    const dateOfWorkAuthorizationLabel = this.page.locator(
      DashboardDatesTabLocators.dateOfWorkAuthorizationLabel,
    );
    await dateOfWorkAuthorizationLabel.waitFor({ state: 'visible' });
    return dateOfWorkAuthorizationLabel;
  }

  // Click on Date of Work Authorization Current Date Select button
  async clickDateOfWorkAuthorizationCurrentDateSelectButton() {
    const dateOfWorkAuthorizationCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_4',
    );
    await dateOfWorkAuthorizationCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateOfWorkAuthorizationCurrentDateSelectButton.click();
  }

  // Verify Date Estimate Sent label is visible
  async verifyDateEstimateSentLabelVisible() {
    const dateEstimateSentLabel = this.page.locator(
      DashboardDatesTabLocators.dateEstimateSentLabel,
    );
    await dateEstimateSentLabel.waitFor({ state: 'visible' });
    return dateEstimateSentLabel;
  }

  // Click on Date Estimate Sent Current Date Select button
  async clickDateEstimateSentCurrentDateSelectButton() {
    const dateEstimateSentCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_3',
    );
    await dateEstimateSentCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateEstimateSentCurrentDateSelectButton.click();
  }

  // Click on Date Estimate Approved Current Date Select button
  async clickDateEstimateApprovedCurrentDateSelectButton() {
    const dateEstimateApprovedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_5',
    );
    await dateEstimateApprovedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateEstimateApprovedCurrentDateSelectButton.click();
  }

  // Click on Date Inventoried Current Date Select button
  async clickDateInventoriedCurrentDateSelectButton() {
    const dateInventoriedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_11',
    );
    await dateInventoriedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateInventoriedCurrentDateSelectButton.click();
  }

  // Verify Target Start Date label is visible
  async verifyTargetStartDateLabelVisible() {
    const targetStartDateLabel = this.page.locator(DashboardDatesTabLocators.targetStartDateLabel);
    await targetStartDateLabel.waitFor({ state: 'visible' });
    return targetStartDateLabel;
  }

  // Click on Target Start Date Current Date Select button
  async clickTargetStartDateCurrentDateSelectButton() {
    const targetStartDateCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_10005',
    );
    await targetStartDateCurrentDateSelectButton.waitFor({ state: 'visible' });
    await targetStartDateCurrentDateSelectButton.click();
  }

  // Verify Target Start Date input is visible
  async verifyTargetStartDateInputVisible() {
    const targetStartDateInput = this.page.locator(DashboardDatesTabLocators.targetStartDateInput);
    await targetStartDateInput.waitFor({ state: 'visible' });
    return targetStartDateInput;
  }

  // Verify Provider Reason for Closing label is visible
  async verifyProviderReasonForClosingLabelVisible() {
    const providerReasonForClosingLabel = this.page.locator(
      DashboardDatesTabLocators.providerReasonForClosingLabel,
    );
    await providerReasonForClosingLabel.waitFor({ state: 'visible' });
    return providerReasonForClosingLabel;
  }

  // Verify Put on Hold Job button is visible
  async verifyPutOnHoldJobButtonVisible() {
    const putOnHoldJobButton = this.page.locator(DashboardDatesTabLocators.putOnHoldJobButton);
    await putOnHoldJobButton.waitFor({ state: 'visible' });
    return putOnHoldJobButton;
  }

  // Verify Into Production Date label is visible
  async verifyIntoProductionDateLabelVisible() {
    const intoProductionDateLabel = this.page.locator(
      DashboardDatesTabLocators.intoProductionDateLabel,
    );
    await intoProductionDateLabel.waitFor({ state: 'visible' });
    return intoProductionDateLabel;
  }

  // Click on Into Production Date Current Date Select button
  async clickIntoProductionDateCurrentDateSelectButton() {
    const intoProductionDateCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_13',
    );
    await intoProductionDateCurrentDateSelectButton.waitFor({ state: 'visible' });
    await intoProductionDateCurrentDateSelectButton.click();
  }

  // Verify Date Started label is visible
  async verifyDateStartedLabelVisible() {
    const dateStartedLabel = this.page.locator(DashboardDatesTabLocators.dateStartedLabel);
    await dateStartedLabel.waitFor({ state: 'visible' });
    return dateStartedLabel;
  }

  // Click on Date Started Current Date Select button
  async clickDateStartedCurrentDateSelectButton() {
    const dateStartedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_6',
    );
    await dateStartedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateStartedCurrentDateSelectButton.click();
  }

  // Verify Date of Majority Completed label is visible
  async verifyDateCompletedLabelVisible() {
    const dateCompletedLabel = this.page.locator(DashboardDatesTabLocators.dateCompletedLabel);
    await dateCompletedLabel.waitFor({ state: 'visible' });
    return dateCompletedLabel;
  }

  // Click on Date of Majority Completed Current Date Select button
  async clickDateCompletedCurrentDateSelectButton() {
    const dateCompletedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_7',
    );

    await dateCompletedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateCompletedCurrentDateSelectButton.click();
  }

  // Verify Date Target label is visible
  async verifyDateTargetLabelVisible() {
    const dateTargetLabel = this.page.locator(DashboardDatesTabLocators.dateTargetLabel);
    await dateTargetLabel.waitFor({ state: 'visible' });
    return dateTargetLabel;
  }

  // Date of Target Completed Current date select button
  async clickDateTargetCurrentDateSelectButton() {
    const dateTargetCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_8',
    );
    await dateTargetCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateTargetCurrentDateSelectButton.click();
  }

  // Verify Date Paid label is visible
  async verifyDatePaidLabelVisible() {
    const datePaidLabel = this.page.locator(DashboardDatesTabLocators.datePaidLabel);
    await datePaidLabel.waitFor({ state: 'visible' });
    return datePaidLabel;
  }

  // Click on Date Paid Current Date Select button
  async clickDatePaidCurrentDateSelectButton() {
    const datePaidCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_9',
    );
    await datePaidCurrentDateSelectButton.waitFor({ state: 'visible' });
    await datePaidCurrentDateSelectButton.click();
  }

  // Verify Date Invoiced label is visible
  async verifyDateInvoicedLabelVisible() {
    const dateInvoicedLabel = this.page.locator(DashboardDatesTabLocators.dateInvoicedLabel);
    await dateInvoicedLabel.waitFor({ state: 'visible' });
    return dateInvoicedLabel;
  }

  // Date invoiced Current date select button
  async clickDateInvoicedCurrentDateSelectButton() {
    const dateInvoicedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_14',
    );
    await dateInvoicedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateInvoicedCurrentDateSelectButton.click();
  }

  // Date Closed Current date select button
  async clickDateClosedCurrentDateSelectButton() {
    const dateClosedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_10',
    );
    await dateClosedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await dateClosedCurrentDateSelectButton.click();
  }

  // Bid only date Closed Current date select button
  async clickBidOnlyDateClosedCurrentDateSelectButton() {
    const bidOnlyDateClosedCurrentDateSelectButton = this.page.locator(
      '#ctl00_ContentPlaceHolder1_dockJobTabs_C_Dates_userControl_CurrentDateTimeDiv_1014',
    );
    await bidOnlyDateClosedCurrentDateSelectButton.waitFor({ state: 'visible' });
    await bidOnlyDateClosedCurrentDateSelectButton.click();
  }

  async clickDateOfTargetCompletionCalendarButton() {
    const calendarButton = this.page.locator('#TargetCompletionCalendarButton'); // <-- Use correct selector
    await calendarButton.click();
  }

  // Verify Save button is visible and has correct type
  async verifySaveDatesButtonVisible() {
    const saveDatesButton = this.page.locator(DashboardDatesTabLocators.saveDatesButton);
    await saveDatesButton.waitFor({ state: 'visible' });
    return saveDatesButton;
  }
}

export default DashboardDatesTabPage;
