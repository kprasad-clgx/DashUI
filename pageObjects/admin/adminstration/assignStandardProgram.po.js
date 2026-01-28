import { expect } from '@playwright/test';

/**
 * @typedef {Object} AssignStandardProgramLocatorsType
 * @property {string} assignProgramModal
 * @property {string} assignProgramIframe
 * @property {string} pleaseAssignProgramLabel
 * @property {string} chooseProgramInput
 * @property {string} dropdownArrow
 * @property {string} dropdownList
 * @property {string} jobNumberCell
 * @property {string} assignProgramButton
 * @property {string} assignedProgramVerification
 */

/** @type {AssignStandardProgramLocatorsType} */
const AssignStandardProgramLocators = {
  assignProgramModal:
    '#RadWindowWrapper_ctl00_ContentPlaceHolder1_ClaimInformationControl_RadWindow_AssignProgram1',
  assignProgramIframe: 'iframe[name="RadWindow_AssignProgram1"]',
  pleaseAssignProgramLabel: 'span#label_Title',
  chooseProgramInput: 'input#Grid_Assign_Program_ctl00_ctl04_radComboBox_AssignProgramGrid_Input',
  dropdownArrow: '#Grid_Assign_Program_ctl00_ctl04_radComboBox_AssignProgramGrid_Arrow',
  dropdownList: '#Grid_Assign_Program_ctl00_ctl04_radComboBox_AssignProgramGrid_DropDown',
  jobNumberCell: '#Grid_Assign_Program_ctl00__0 td',
  assignProgramButton: 'input#button_SaveProgram',
  assignedProgramVerification: '#ProgDesc0',
};

class AssignStandardProgramPage {
  constructor(page) {
    this.page = page;
  }

  // Verify Assign Program modal is visible and return iframe
  async verifyAssignProgramModal() {
    await this.page.waitForLoadState('networkidle');

    const assignProgramModal = this.page.locator(AssignStandardProgramLocators.assignProgramModal);
    await expect(assignProgramModal).toBeVisible({ timeout: 10000 });

    const assignProgramIframe = assignProgramModal.frameLocator(
      AssignStandardProgramLocators.assignProgramIframe,
    );
    await expect(assignProgramIframe.locator('body')).toBeVisible({ timeout: 10000 });

    return { assignProgramModal, assignProgramIframe };
  }

  // Verify Please Assign Program label
  async verifyPleaseAssignProgramLabel(assignProgramIframe) {
    const pleaseAssignProgramDropdown = assignProgramIframe.locator(
      AssignStandardProgramLocators.pleaseAssignProgramLabel,
    );
    await expect(pleaseAssignProgramDropdown).toBeVisible({ timeout: 10000 });
  }

  // Verify Choose Program dropdown
  async verifyChooseProgramDropdown(assignProgramIframe) {
    const chooseProgramDropdown = assignProgramIframe.locator(
      AssignStandardProgramLocators.chooseProgramInput,
    );
    await expect(chooseProgramDropdown).toBeVisible({ timeout: 10000 });
  }

  // Select program by name
  async selectProgramByName(assignProgramIframe, programName) {
    const dropdownArrow = assignProgramIframe.locator(AssignStandardProgramLocators.dropdownArrow);
    await dropdownArrow.click();

    const dropdownList = assignProgramIframe.locator(AssignStandardProgramLocators.dropdownList);
    await expect(dropdownList).toBeVisible({ timeout: 10000 });

    // Match the full text as shown in HTML (e.g., "Standard Program, Gemini-AI (December 22, 2025 23:29)")
    const programOption = dropdownList.locator('.rcbItem', { hasText: programName });
    await expect(programOption).toBeVisible({ timeout: 5000 });
    await programOption.click();
    await this.page.waitForLoadState('networkidle');
  }

  // Get job number from grid
  async getJobNumberFromGrid(assignProgramIframe) {
    await this.page.waitForLoadState('domcontentloaded');
    const jobNumberCell = assignProgramIframe
      .locator(AssignStandardProgramLocators.jobNumberCell)
      .first();
    const jobNumber = await jobNumberCell.textContent();
    return jobNumber;
  }

  // Click assign program button
  async clickAssignProgramButton(assignProgramIframe) {
    const assignProgramButton = assignProgramIframe.locator(
      AssignStandardProgramLocators.assignProgramButton,
    );
    await expect(assignProgramButton).toBeVisible({ timeout: 10000 });
    await assignProgramButton.click();
  }

  // Wait for assign program modal to close
  async waitForModalToClose(assignProgramModal) {
    await expect(assignProgramModal).toBeHidden({ timeout: 10000 });
    await this.page.waitForLoadState('networkidle');
  }

  // Verify assigned program
  async verifyAssignedProgram(programName) {
    const assignedProgramVerification = this.page.locator(
      AssignStandardProgramLocators.assignedProgramVerification,
    );
    const assignedProgramText = await assignedProgramVerification.textContent();
    expect(assignedProgramText).toContain(programName);
  }
}

export { AssignStandardProgramPage, AssignStandardProgramLocators };
