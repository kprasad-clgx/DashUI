/**
 * @typedef {Object} DashboardJobsTabLocatorsType
 * @property {string} jobTasksTab
 * @property {string} addNewButton
 * @property {string} modalContent
 * @property {string} modalHeader
 * @property {string} jobTaskButton
 * @property {string} marketingTaskButton
 * @property {string} calendarTaskButton
 * @property {string} jobLabel
 * @property {string} taskLabel
 * @property {string} startDateLabel
 * @property {string} endDateLabel
 * @property {string} assignResourcesLabel
 * @property {string} assignResourceButton
 * @property {string} saveAndCloseButton
 * @property {string} cancelButton
 */

/** @type {DashboardJobsTabLocatorsType} */
const DashboardJobsTabLocators = {
  jobTasksTab: '#ctl00_ContentPlaceHolder1_dockJobTabs_C_tabStripJobTabs .rtsTxt',
  addNewButton:
    '#ctl00_ContentPlaceHolder1_dockJobTabs_C_JobTasks_userControl_gvActionItem_ctl00_ctl02_ctl00_AddNewButton',
  modalContent: '.modal-content',
  modalHeader: '.modal-header .heading h4',
  jobTaskButton: '.btn-group .job-task-btn',
  marketingTaskButton: '.btn-group .marketing-task-btn',
  calendarTaskButton: '.btn-group .calendar-task-btn',
  jobLabel: "label:has-text('Job #')",
  taskLabel: "label:has-text('Task:')",
  startDateLabel: "label:has-text('Start Date:')",
  endDateLabel: "label:has-text('End Date:')",
  assignResourcesLabel: "label:has-text('Assign Resources:')",
  assignResourceButton: 'button.btn-assign-resource',
  saveAndCloseButton: "button.btn-success:has-text('Save & Close')",
  cancelButton: "button.btn-danger:has-text('Cancel')",
};

class DashboardJobsTabPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Job Tasks tab
  async navigateToJobTasksTab() {
    const jobTasksTab = this.page.locator(DashboardJobsTabLocators.jobTasksTab, {
      hasText: 'Job Tasks',
    });
    await jobTasksTab.waitFor({ state: 'visible', timeout: 5000 });
    await jobTasksTab.click();
    await this.page.waitForTimeout(5000);
  }

  // Verify Add New button is visible
  async verifyAddNewButtonVisible() {
    const addNewButton = this.page.locator(DashboardJobsTabLocators.addNewButton);
    await addNewButton.waitFor({ state: 'visible' });
    return addNewButton;
  }

  // Click Add New button
  async clickAddNewButton() {
    const addNewButton = this.page.locator(DashboardJobsTabLocators.addNewButton);
    await addNewButton.click();
    await this.page.waitForTimeout(3000);
  }

  // Verify Job Task button is visible
  async verifyJobTaskButtonVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const jobTaskButton = modalContent.locator(DashboardJobsTabLocators.jobTaskButton);
    await jobTaskButton.waitFor({ state: 'visible' });
    return jobTaskButton;
  }

  // Verify Marketing Task button is visible
  async verifyMarketingTaskButtonVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const marketingTaskButton = modalContent.locator(DashboardJobsTabLocators.marketingTaskButton);
    await marketingTaskButton.waitFor({ state: 'visible' });
    return marketingTaskButton;
  }

  // Verify Calendar Event button is visible
  async verifyCalendarTaskButtonVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const calendarTaskButton = modalContent.locator(DashboardJobsTabLocators.calendarTaskButton);
    await calendarTaskButton.waitFor({ state: 'visible' });
    return calendarTaskButton;
  }

  // Verify modal is visible
  async verifyModalVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    await modalContent.waitFor({ state: 'visible', timeout: 10000 });
    return modalContent;
  }

  // Verify Job # label is visible
  async verifyJobLabelVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const jobLabel = modalContent.locator(DashboardJobsTabLocators.jobLabel);
    await jobLabel.waitFor({ state: 'visible' });
    return jobLabel;
  }

  // Verify Task: label is visible
  async verifyTaskLabelVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const taskLabel = modalContent.locator(DashboardJobsTabLocators.taskLabel);
    await taskLabel.waitFor({ state: 'visible' });
    return taskLabel;
  }

  // Verify Start Date: label is visible
  async verifyStartDateLabelVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const startDateLabel = modalContent.locator(DashboardJobsTabLocators.startDateLabel);
    await startDateLabel.waitFor({ state: 'visible' });
    return startDateLabel;
  }

  // Verify End Date: label is visible
  async verifyEndDateLabelVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const endDateLabel = modalContent.locator(DashboardJobsTabLocators.endDateLabel);
    await endDateLabel.waitFor({ state: 'visible' });
    return endDateLabel;
  }

  // Verify Assign Resources: label is visible
  async verifyAssignResourcesLabelVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const assignResourcesLabel = modalContent.locator(
      DashboardJobsTabLocators.assignResourcesLabel,
    );
    await assignResourcesLabel.waitFor({ state: 'visible' });
    return assignResourcesLabel;
  }

  // Verify Assign Resource button is visible
  async verifyAssignResourceButtonVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const assignResourceButton = modalContent.locator(
      DashboardJobsTabLocators.assignResourceButton,
    );
    await assignResourceButton.waitFor({ state: 'visible' });
    return assignResourceButton;
  }

  // Click Assign Resources button
  async clickAssignResourceButton() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const assignResourceButton = modalContent.locator(
      DashboardJobsTabLocators.assignResourceButton,
    );
    await assignResourceButton.waitFor({ state: 'visible' });
    await assignResourceButton.click();
    await this.page.waitForTimeout(3000);
  }

  // Verify Save & Close button is visible
  async verifySaveAndCloseButtonVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const saveAndCloseButton = modalContent.locator(DashboardJobsTabLocators.saveAndCloseButton);
    await saveAndCloseButton.waitFor({ state: 'visible' });
    return saveAndCloseButton;
  }

  // Verify Cancel button is visible
  async verifyCancelButtonVisible() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const cancelButton = modalContent.locator(DashboardJobsTabLocators.cancelButton);
    await cancelButton.waitFor({ state: 'visible' });
    return cancelButton;
  }

  // Click Cancel button
  async clickCancelButton() {
    const modalContent = this.page.locator(DashboardJobsTabLocators.modalContent);
    const cancelButton = modalContent.locator(DashboardJobsTabLocators.cancelButton);
    await cancelButton.waitFor({ state: 'visible' });
    await cancelButton.click();
  }
}

export default DashboardJobsTabPage;
