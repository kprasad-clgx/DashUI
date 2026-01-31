import { BasePage } from '../basePage/enterpriseBasePage.po.js';

export class EstimateTrackerPage extends BasePage {
  constructor(page) {
    super(page);

    this.estimateTrackerIcon = page.locator(
      '#AccountingHeaderLinkPanel > div:nth-child(4) > a > img',
    );

    // Tabs
    this.uploadedOnlyTab = page.locator(
      '#ctl00_ContentPlaceHolder1_tabStripQaaUploaded .rtsLI.rtsFirst a',
    );
    this.notUploadedTab = page.locator(
      '#ctl00_ContentPlaceHolder1_tabStripQaaUploaded .rtsLI:nth-child(2) a',
    );
    this.showAllTab = page.locator(
      '#ctl00_ContentPlaceHolder1_tabStripQaaUploaded .rtsLI.rtsLast a',
    );

    // Indicators
    this.noEstimatesLabel1 = page.locator('#ctl00_ContentPlaceHolder1_LblNoEstimates');
    this.noEstimatesLabel2 = page.locator('#ctl00_ContentPlaceHolder1_Label1');
    this.estimateTrackerDiv = page.locator('#ctl00_ContentPlaceHolder1_EstimateTrackerDiv');

    // Data Rows
    this.estimateDataRows = page.locator('.FontBold');
    this.typeLabel = page.locator('#ctl00_ContentPlaceHolder1_LblType');
    this.amountLabel = page.locator('#ctl00_ContentPlaceHolder1_LblAmount');
    this.uploadedByLabel = page.locator('#ctl00_ContentPlaceHolder1_LblUploadedBy');

    // Buttons
    this.compareVersionsBtn = page.locator('#ctl00_ContentPlaceHolder1_btnopenwindow');
    this.goToWorkOrderBtn = page.locator('#ctl00_ContentPlaceHolder1_btnWorkOrder');
    this.backToEstimateBtn = page.locator('#ctl00_ContentPlaceHolder1_btnBacktoEstimate');
    this.backToSlideboardBtn = page.locator('#ctl00_ContentPlaceHolder1_ButtonBackToSlideboard');
    this.jobNumberText = page.locator('#ctl00_ContentPlaceHolder1_TextJobNumber');
  }

  async openEstimateTracker() {
    await this.page.locator('#AccountingHeaderLinkPanel').waitFor({ state: 'visible' });
    await this.estimateTrackerIcon.click();
  }

  async clickTab(tabName) {
    let tabLocator;
    switch (tabName) {
      case 'Uploaded Only':
        tabLocator = this.uploadedOnlyTab;
        break;
      case 'Not Uploaded Only':
        tabLocator = this.notUploadedTab;
        break;
      case 'Show All':
        tabLocator = this.showAllTab;
        break;
      default:
        throw new Error(`Unknown tab: ${tabName}`);
    }

    await tabLocator.waitFor({ state: 'visible' });
    await tabLocator.click();
  }

  /**
   * Robust Check for Data Presence
   */
  async checkTabData(expect) {
    // Wait for either data rows or "No Estimates" label to appear
    await Promise.race([
      this.noEstimatesLabel1.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {}),
      this.noEstimatesLabel2.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {}),
      this.estimateDataRows
        .first()
        .waitFor({ state: 'visible', timeout: 2000 })
        .catch(() => {}),
      this.typeLabel.waitFor({ state: 'visible', timeout: 2000 }).catch(() => {}),
    ]);

    // 1. Check for No Data Message
    if ((await this.noEstimatesLabel1.isVisible()) || (await this.noEstimatesLabel2.isVisible())) {
      return false;
    }

    // 2. Check for Data
    const hasRows = (await this.estimateDataRows.count()) > 0;
    const hasLabels = await this.typeLabel.isVisible();

    if (hasRows || hasLabels) {
      if (expect) {
        // Soft assertions for data integrity
        await expect.soft(this.typeLabel, 'Type Label').toBeVisible();
        await expect.soft(this.amountLabel, 'Amount Label').toBeVisible();
      }
      return true;
    }

    return false; // Neither data nor "No Data" message found (Empty state?)
  }

  async validateButtons(expect) {
    // Wait for button bar
    await this.backToSlideboardBtn.waitFor({ state: 'visible', timeout: 10000 });

    if (expect) {
      await expect.soft(this.compareVersionsBtn).toBeVisible();
      await expect.soft(this.goToWorkOrderBtn).toBeVisible();
      await expect.soft(this.backToEstimateBtn).toBeVisible();
      await expect.soft(this.backToSlideboardBtn).toBeVisible();
    }
  }

  async getJobNumber() {
    return (await this.jobNumberText.textContent())?.trim();
  }

  async backToSlideboard() {
    await this.backToSlideboardBtn.click();
    await this.page.waitForURL(/jJobSlideBoard\.aspx/i, { timeout: 30000 });
  }

  async verifyEstimateTracker(tabs, expect) {
    await this.openEstimateTracker();

    for (const tab of tabs) {
      await this.clickTab(tab.name);
      await this.checkTabData(expect);
    }

    await this.validateButtons(expect);
    await this.backToSlideboard();
  }
}
