/**
 * @typedef {Object} MassAssignmentsForJobLocatorsType
 * @property {string} administrationMenu
 * @property {string} menuContainer
 * @property {string} massAssignmentForJobsMenuOption
 * @property {string} massAssignmentHeader
 * @property {string} assignParticipantsButton
 * @property {string} closeSelectedJobButton
 * @property {string} jobListGridText
 * @property {string} showAdminJobsGridText
 * @property {string} jobNumberGridColumn
 * @property {string} customerGridColumn
 * @property {string} estimatorGridColumn
 * @property {string} coordinatorGridColumn
 * @property {string} supervisorGridColumn
 * @property {string} forepersonGridColumn
 * @property {string} accountingGridColumn
 * @property {string} claimNumberGridColumn
 * @property {string} exportToPDFButton
 * @property {string} exportToExcelButton
 */

/** @type {MassAssignmentsForJobLocatorsType} */
const MassAssignmentsForJobLocators = {
  administrationMenu: "span:has-text('Administration')",
  menuContainer: 'div.rmSlide[style*="display: block"]',
  massAssignmentForJobsMenuOption: 'ul.rmVertical.rmGroup.rmLevel1 li.rmItem a.rmLink span.rmText',
  massAssignmentHeader: '#ctl00_ContentPlaceHolder1_lbLossCategoryHeader',
  assignParticipantsButton: '#ctl00_ContentPlaceHolder1_AssignPart',
  closeSelectedJobButton: '#ctl00_ContentPlaceHolder1_CloseJob',
  jobListGridText: '#ctl00_ContentPlaceHolder1_grdHome_ctl00_ctl02_ctl00_Label_JobList',
  showAdminJobsGridText: '#ctl00_ContentPlaceHolder1_grdHome_ctl00_ctl02_ctl00_Label_ShowAdminJobs',
  jobNumberGridColumn: '#ctl00_ContentPlaceHolder1_grdHome_GridHeader tr th a',
  customerGridColumn: '#ctl00_ContentPlaceHolder1_grdHome_GridHeader tr th a',
  estimatorGridColumn: '#ctl00_ContentPlaceHolder1_grdHome_GridHeader tr th a',
  coordinatorGridColumn: '#ctl00_ContentPlaceHolder1_grdHome_GridHeader tr th a',
  supervisorGridColumn: '#ctl00_ContentPlaceHolder1_grdHome_GridHeader tr th a',
  forepersonGridColumn: '#ctl00_ContentPlaceHolder1_grdHome_GridHeader tr th a',
  accountingGridColumn: '#ctl00_ContentPlaceHolder1_grdHome_GridHeader tr th a',
  claimNumberGridColumn: '#ctl00_ContentPlaceHolder1_grdHome_GridHeader tr th a',
  exportToPDFButton: '#ctl00_ContentPlaceHolder1_grdHome_ctl00_ctl02_ctl00_ExportToPDFButton',
  exportToExcelButton: '#ctl00_ContentPlaceHolder1_grdHome_ctl00_ctl02_ctl00_ExportToExcelButton',
};

class MassAssignmentsForJobPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Mass Assignment for Jobs page through Administration menu
  async navigateToMassAssignmentForJobs() {
    await this.page.locator(MassAssignmentsForJobLocators.administrationMenu).first().hover();

    const menuContainer = this.page.locator(MassAssignmentsForJobLocators.menuContainer);
    await menuContainer.waitFor({ state: 'visible', timeout: 5000 });
    await this.page
      .locator(MassAssignmentsForJobLocators.massAssignmentForJobsMenuOption, {
        hasText: /^Mass Assignment for Jobs$/,
      })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page
      .locator(MassAssignmentsForJobLocators.massAssignmentForJobsMenuOption, {
        hasText: /^Mass Assignment for Jobs$/,
      })
      .first()
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Mass Assignment for Jobs header is visible on the page
  async verifyMassAssignmentHeader() {
    const header = this.page.locator(MassAssignmentsForJobLocators.massAssignmentHeader);
    await header.waitFor({ state: 'visible' });
    return header;
  }

  // Verify Assign Participants for job button is visible and is submit type
  async verifyAssignParticipantsButton() {
    const button = this.page.locator(MassAssignmentsForJobLocators.assignParticipantsButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Close Selected Job button is visible and is submit type
  async verifyCloseSelectedJobButton() {
    const button = this.page.locator(MassAssignmentsForJobLocators.closeSelectedJobButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Job List Grid text is visible
  async verifyJobListGridText() {
    const text = this.page.locator(MassAssignmentsForJobLocators.jobListGridText);
    await text.waitFor({ state: 'visible' });
    return text;
  }

  // Verify Show Admin Jobs Grid text is visible
  async verifyShowAdminJobsGridText() {
    const text = this.page.locator(MassAssignmentsForJobLocators.showAdminJobsGridText);
    await text.waitFor({ state: 'visible' });
    return text;
  }

  // Verify Job Number grid column is visible
  async verifyJobNumberGridColumn() {
    const column = this.page.locator(MassAssignmentsForJobLocators.jobNumberGridColumn, {
      hasText: 'Job Number',
    });
    await column.waitFor({ state: 'visible' });
    return column;
  }

  // Verify Customer grid column is visible
  async verifyCustomerGridColumn() {
    const column = this.page.locator(MassAssignmentsForJobLocators.customerGridColumn, {
      hasText: 'Customer',
    });
    await column.waitFor({ state: 'visible' });
    return column;
  }

  // Verify Estimator grid column is visible
  async verifyEstimatorGridColumn() {
    const column = this.page.locator(MassAssignmentsForJobLocators.estimatorGridColumn, {
      hasText: 'Estimator',
    });
    await column.waitFor({ state: 'visible' });
    return column;
  }

  // Verify Coordinator grid column is visible
  async verifyCoordinatorGridColumn() {
    const column = this.page.locator(MassAssignmentsForJobLocators.coordinatorGridColumn, {
      hasText: 'Coordinator',
    });
    await column.waitFor({ state: 'visible' });
    return column;
  }

  // Verify Supervisor grid column is visible
  async verifySupervisorGridColumn() {
    const column = this.page.locator(MassAssignmentsForJobLocators.supervisorGridColumn, {
      hasText: 'Supervisor',
    });
    await column.waitFor({ state: 'visible' });
    return column;
  }

  // Verify Foreperson grid column is visible
  async verifyForepersonGridColumn() {
    const column = this.page.locator(MassAssignmentsForJobLocators.forepersonGridColumn, {
      hasText: 'Foreperson',
    });
    await column.waitFor({ state: 'visible' });
    return column;
  }

  // Verify Accounting grid column is visible
  async verifyAccountingGridColumn() {
    const column = this.page.locator(MassAssignmentsForJobLocators.accountingGridColumn, {
      hasText: 'Accounting',
    });
    await column.waitFor({ state: 'visible' });
    return column;
  }

  // Verify Claim Number grid column is visible
  async verifyClaimNumberGridColumn() {
    const column = this.page.locator(MassAssignmentsForJobLocators.claimNumberGridColumn, {
      hasText: 'Claim Number',
    });
    await column.waitFor({ state: 'visible' });
    return column;
  }

  // Verify Export to PDF button is visible and is submit type
  async verifyExportToPDFButton() {
    const button = this.page.locator(MassAssignmentsForJobLocators.exportToPDFButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  // Verify Export to Excel button is visible and is submit type
  async verifyExportToExcelButton() {
    const button = this.page.locator(MassAssignmentsForJobLocators.exportToExcelButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  /**
   * Download and assert PDF file
   * @returns {Promise<string>} - The downloaded PDF filename
   */
  async downloadAndAssertPDF() {
    const exportPdfButton = this.page.locator(MassAssignmentsForJobLocators.exportToPDFButton);
    await exportPdfButton.waitFor({ state: 'visible' });

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportPdfButton.click(),
    ]);

    const pdfFilename = await download.suggestedFilename();
    return pdfFilename;
  }

  /**
   * Download and assert Excel file
   * @returns {Promise<string>} - The downloaded Excel filename
   */
  async downloadAndAssertExcel() {
    const exportExcelButton = this.page.locator(MassAssignmentsForJobLocators.exportToExcelButton);
    await exportExcelButton.waitFor({ state: 'visible' });

    const [download] = await Promise.all([
      this.page.waitForEvent('download'),
      exportExcelButton.click(),
    ]);

    const excelFilename = await download.suggestedFilename();
    return excelFilename;
  }
}

export { MassAssignmentsForJobPage, MassAssignmentsForJobLocators };
