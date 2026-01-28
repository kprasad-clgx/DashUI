export class CreateJobDeleteJobPage {
  constructor(page) {
    this.page = page;

    // Delete Job locators
    this.deleteJobButton = page.locator('button.buttonCore.tertiaryButton.divisionButtonStyle', {
      hasText: 'Delete Job',
    });

    this.modalWrapper = page.locator(
      '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common',
    );

    this.modalHeader = page.locator(
      '#RadWindowWrapper_ctl00_ContentPlaceHolder1_RadWindow_Common em',
    );

    this.iframeSelector = 'iframe[name="RadWindow_Common"]';
    this.jobAssignmentLink = page.locator('a#link_job_to_assignment');
  }

  async deleteJob() {
    await this.page.waitForLoadState('networkidle');
    await this.deleteJobButton.waitFor({ state: 'visible' });
    await this.deleteJobButton.click();

    // Wait for modal header to be visible
    await this.modalHeader.waitFor({ state: 'visible', timeout: 20000 });

    // Assert Delete Confirmation header
    const deleteConfirmationHeader = this.modalWrapper.locator('em', {
      hasText: 'Delete Confirmation',
    });
    await deleteConfirmationHeader.waitFor({
      state: 'visible',
      timeout: 10000,
    });

    // Wait for iframe
    await this.page.locator(this.iframeSelector).waitFor({
      state: 'visible',
      timeout: 20000,
    });

    // Get frame
    let modalFrame = null;
    for (let i = 0; i < 20; i++) {
      modalFrame = this.page.frame({ name: 'RadWindow_Common' });
      if (modalFrame) break;
      await this.page.waitForTimeout(1000);
    }

    if (!modalFrame) {
      throw new Error('Modal frame not found');
    }

    // Click OK button inside the iframe to confirm delete
    const okButton = modalFrame.locator('#DeleteButton');
    await okButton.waitFor({ state: 'visible', timeout: 10000 });
    await okButton.click();

    // Wait for modal to close
    await this.modalWrapper.waitFor({ state: 'hidden', timeout: 10000 });
  }

  async validateJobDeleted() {
    // Wait for redirection
    await this.page.waitForLoadState('networkidle');

    // Assert redirected URL ends with 'Module/User/uPostLogin.aspx'
    const currentUrl = this.page.url();
    if (!/Module\/User\/uPostLogin\.aspx$/.test(currentUrl)) {
      throw new Error(
        `Expected URL to end with 'Module/User/uPostLogin.aspx' but got '${currentUrl}'`,
      );
    }
  }

  /**
   * Verify job assignment link is visible after deletion
   * @returns {Promise<import('@playwright/test').Locator>}
   */
  async verifyJobAssignmentLinkVisible() {
    await this.jobAssignmentLink.waitFor({ state: 'visible' });
    return this.jobAssignmentLink;
  }
}
