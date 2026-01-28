/**
 * @typedef {Object} BizDevDashboardLocatorsType
 * @property {string} marketingTab
 * @property {string} bizDevDashboardSubTab
 * @property {string} pageLabel
 * @property {string} dashboardLabel
 * @property {string} employeeLabel
 * @property {string} employeeValue
 * @property {string} employeeSetButton
 * @property {string} divisionLabel
 * @property {string} divisionValue
 * @property {string} divisionSetButton
 * @property {string} officeLabel
 * @property {string} officeValue
 * @property {string} officeSetButton
 * @property {string} timeFrameLabel
 * @property {string} timeFrameDropdown
 * @property {string} timeFrameOption
 * @property {string} employeeDropdown
 * @property {string} employeeOptions
 */

/** @type {BizDevDashboardLocatorsType} */
const BizDevDashboardLocators = {
  marketingTab: "a.rmLink.rmRootLink:has-text('Marketing')",
  bizDevDashboardSubTab: "a.rmLink.menuNoChildSubHeader:has-text('Biz Dev Dashboard')",
  pageLabel: '#ctl00_ContentPlaceHolder1_AltitudeHeaderControl_Label_Heading',
  dashboardLabel: '#ctl00_ContentPlaceHolder1_BizDevDashBoardTabsDiv .black_text_l8',
  employeeLabel: 'b',
  employeeValue: '#ctl00_ContentPlaceHolder1_AltitudeHeaderControl_SelectedEmployeesDiv .blueColor',
  employeeSetButton: '#ctl00_ContentPlaceHolder1_AltitudeHeaderControl_SelectEmployeesButton',
  divisionLabel: 'b',
  divisionValue: '#ctl00_ContentPlaceHolder1_AltitudeHeaderControl_SelectedDivisionDiv .blueColor',
  divisionSetButton: '#ctl00_ContentPlaceHolder1_AltitudeHeaderControl_SelectDivisionButton',
  officeLabel: 'b',
  officeValue: '#ctl00_ContentPlaceHolder1_AltitudeHeaderControl_SelectedOfficeDiv .blueColor',
  officeSetButton: '#ctl00_ContentPlaceHolder1_AltitudeHeaderControl_SelectOfficeButton',
  timeFrameLabel: 'b:has-text("Time Frame")',
  timeFrameDropdown: '#ctl00_ContentPlaceHolder1_MarketingChartControl_TimeFrameRadComboBox_Input',
  timeFrameOption: '.rcbList .rcbItem',
  employeeDropdown: '#ctl00_ContentPlaceHolder1_MarketingChartControl_RadComboBox_Employee_Input',
  employeeOptions:
    '#ctl00_ContentPlaceHolder1_MarketingChartControl_RadComboBox_Employee_DropDown .rcbList .rcbItem',
};

class BizDevDashboardPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToBizDevDashboard() {
    // Hover over the Marketing menu
    await this.page.locator(BizDevDashboardLocators.marketingTab).hover();
    // Wait for the Biz Dev Dashboard submenu item to be visible
    await this.page
      .locator(BizDevDashboardLocators.bizDevDashboardSubTab)
      .waitFor({ state: 'visible', timeout: 10000 });
    // Click on Biz Dev Dashboard
    await this.page.locator(BizDevDashboardLocators.bizDevDashboardSubTab).click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyPageLabelVisible() {
    const label = this.page.locator(BizDevDashboardLocators.pageLabel);
    await label.waitFor({ state: 'visible' });
    return label;
  }

  async verifyDashboardLabelsVisible(labels) {
    for (const labelText of labels) {
      const labelLocator = this.page.locator(
        `${BizDevDashboardLocators.dashboardLabel}:has-text('${labelText}')`,
      );
      await labelLocator.waitFor({ state: 'visible', timeout: 5000 });
    }
  }

  async verifyEmployeeLabelVisible() {
    const label = this.page
      .locator(BizDevDashboardLocators.employeeLabel, { hasText: 'Employee' })
      .first();
    await label.waitFor({ state: 'visible' });
    return label;
  }

  async verifyEmployeeValueVisible() {
    const value = this.page.locator(BizDevDashboardLocators.employeeValue);
    await value.waitFor({ state: 'visible' });
    return value;
  }

  async verifyEmployeeSetButtonVisible() {
    const button = this.page.locator(BizDevDashboardLocators.employeeSetButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  async verifyDivisionLabelVisible() {
    const label = this.page
      .locator(BizDevDashboardLocators.divisionLabel, { hasText: 'Division' })
      .first();
    await label.waitFor({ state: 'visible' });
    return label;
  }

  async verifyDivisionValueVisible() {
    const value = this.page.locator(BizDevDashboardLocators.divisionValue);
    await value.waitFor({ state: 'visible' });
    return value;
  }

  async verifyDivisionSetButtonVisible() {
    const button = this.page.locator(BizDevDashboardLocators.divisionSetButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  async verifyOfficeLabelVisible() {
    const label = this.page
      .locator(BizDevDashboardLocators.officeLabel, { hasText: 'Office' })
      .first();
    await label.waitFor({ state: 'visible' });
    return label;
  }

  async verifyOfficeValueVisible() {
    const value = this.page.locator(BizDevDashboardLocators.officeValue);
    await value.waitFor({ state: 'visible' });
    return value;
  }

  async verifyOfficeSetButtonVisible() {
    const button = this.page.locator(BizDevDashboardLocators.officeSetButton);
    await button.waitFor({ state: 'visible' });
    return button;
  }

  async verifyTimeFrameLabelVisible() {
    const label = this.page.locator(BizDevDashboardLocators.timeFrameLabel);
    await label.waitFor({ state: 'visible' });
    return label;
  }

  async selectTimeFrame(optionText) {
    const dropdown = this.page.locator(BizDevDashboardLocators.timeFrameDropdown);
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.click();
    const option = this.page.locator(BizDevDashboardLocators.timeFrameOption, {
      hasText: optionText,
    });
    await option.click();
    await this.page.waitForLoadState('networkidle');
  }

  async verifyTimeFrameSelected() {
    const dropdown = this.page.locator(BizDevDashboardLocators.timeFrameDropdown);
    await dropdown.waitFor({ state: 'visible' });
    return dropdown;
  }

  async selectRandomEmployee() {
    const dropdown = this.page.locator(BizDevDashboardLocators.employeeDropdown);
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.click();
    const options = this.page.locator(BizDevDashboardLocators.employeeOptions);
    const count = await options.count();
    if (count <= 1) throw new Error('Not enough options');
    const randomIndex = Math.floor(Math.random() * (count - 1)) + 1;
    const randomOption = options.nth(randomIndex);
    const text = await randomOption.textContent();
    await randomOption.click();
    return text.trim();
  }

  async verifyEmployeeSelected() {
    const dropdown = this.page.locator(BizDevDashboardLocators.employeeDropdown);
    await dropdown.waitFor({ state: 'visible' });
    return dropdown;
  }

  async waitForNetworkIdle(timeout = 60000) {
    try {
      await this.page.waitForLoadState('networkidle', { timeout });
    } catch (e) {
      console.warn('Network did not stabilize in time, continuing test...');
    }
  }
}

export default BizDevDashboardPage;
