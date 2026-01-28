/**
 * @typedef {Object} EquipmentLocatorsType
 * @property {string} administrationMenu
 * @property {string} menuContainer
 * @property {string} equipmentMenuOption
 * @property {string} equipmentDetailsHeader
 * @property {string} addNewEquipmentButton
 * @property {string} equipmentNameHeader
 * @property {string} linkedHeader
 * @property {string} equipmentTypeHeader
 * @property {string} secondaryEquipmentTypeHeader
 * @property {string} statusHeader
 */

/** @type {EquipmentLocatorsType} */
const EquipmentLocators = {
  administrationMenu: "span:has-text('Administration')",
  menuContainer: 'div.rmSlide[style*="display: block"]',
  equipmentMenuOption: 'ul.rmVertical.rmGroup.rmLevel1 li.rmItem a.rmLink span.rmText',
  equipmentDetailsHeader: '#ctl00_ContentPlaceHolder1_lbEquipmentHead',
  addNewEquipmentButton: '#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_ctl02_ctl00_btnInsertRecord',
  equipmentNameHeader: 'table#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_Header th.rgHeader a',
  linkedHeader: 'table#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_Header th.rgHeader',
  equipmentTypeHeader: 'table#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_Header th.rgHeader a',
  secondaryEquipmentTypeHeader:
    'table#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_Header th.rgHeader a',
  statusHeader: 'table#ctl00_ContentPlaceHolder1_gvEquipment_ctl00_Header th.rgHeader a',
};

class EquipmentPage {
  constructor(page) {
    this.page = page;
  }

  // Navigate to Equipment page through Administration menu
  async navigateToEquipment() {
    await this.page.locator(EquipmentLocators.administrationMenu).first().hover();
    await this.page
      .locator(EquipmentLocators.menuContainer)
      .waitFor({ state: 'visible', timeout: 5000 });
    await this.page
      .locator(EquipmentLocators.equipmentMenuOption, {
        hasText: /^Equipment$/,
      })
      .first()
      .waitFor({ state: 'visible', timeout: 10000 });
    await this.page
      .locator(EquipmentLocators.equipmentMenuOption, {
        hasText: /^Equipment$/,
      })
      .first()
      .click();
    await this.page.waitForLoadState('networkidle');
  }

  // Verify Equipment Details header is visible
  async verifyEquipmentDetailsHeaderVisible() {
    const equipmentDetailsHeader = this.page.locator(EquipmentLocators.equipmentDetailsHeader);
    await equipmentDetailsHeader.waitFor({ state: 'visible' });
    return equipmentDetailsHeader;
  }

  // Verify Equipment Details header text content
  async verifyEquipmentDetailsHeaderText() {
    const equipmentDetailsHeader = this.page.locator(EquipmentLocators.equipmentDetailsHeader);
    return equipmentDetailsHeader;
  }

  // Verify Add New Equipment button is visible
  async verifyAddNewEquipmentButtonVisible() {
    const addNewEquipmentButton = this.page.locator(EquipmentLocators.addNewEquipmentButton);
    await addNewEquipmentButton.waitFor({ state: 'visible' });
    return addNewEquipmentButton;
  }

  // Verify Equipment Name column header is visible
  async verifyEquipmentNameHeaderVisible() {
    const equipmentNameHeader = this.page.locator(EquipmentLocators.equipmentNameHeader, {
      hasText: 'Equipment Name',
    });
    await equipmentNameHeader.waitFor({ state: 'visible' });
    return equipmentNameHeader;
  }

  // Verify Linked column header is visible
  async verifyLinkedHeaderVisible() {
    const linkedHeader = this.page.locator(EquipmentLocators.linkedHeader, {
      hasText: /^Linked$/,
    });
    await linkedHeader.waitFor({ state: 'visible' });
    return linkedHeader;
  }

  // Verify Equipment Type column header is visible
  async verifyEquipmentTypeHeaderVisible() {
    const equipmentTypeHeader = this.page.locator(EquipmentLocators.equipmentTypeHeader, {
      hasText: /^Equipment Type$/,
    });
    await equipmentTypeHeader.waitFor({ state: 'visible' });
    return equipmentTypeHeader;
  }

  // Verify Secondary Equipment Type column header is visible
  async verifySecondaryEquipmentTypeHeaderVisible() {
    const secondaryEquipmentTypeHeader = this.page.locator(
      EquipmentLocators.secondaryEquipmentTypeHeader,
      { hasText: /^Secondary Equipment Type$/ },
    );
    await secondaryEquipmentTypeHeader.waitFor({ state: 'visible' });
    return secondaryEquipmentTypeHeader;
  }

  // Verify Status column header is visible
  async verifyStatusHeaderVisible() {
    const statusHeader = this.page.locator(EquipmentLocators.statusHeader, {
      hasText: 'Status',
    });
    await statusHeader.waitFor({ state: 'visible' });
    return statusHeader;
  }
}

export default EquipmentPage;
