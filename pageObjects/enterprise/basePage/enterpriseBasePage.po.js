export class BasePage {
  /**
   * Helper to select an option from a dropdown by typing and clicking the option.
   * @param {import('playwright').Locator} input - The input element for the dropdown.
   * @param {string} value - The value to type/select.
   * @param {import('playwright').Locator} option - The option element to click.
   */
  async selectFromDropdown(input, value, option) {
    await input.click();
    await input.fill(value);
    await option.waitFor({ state: 'visible', timeout: 5000 });
    await option.click();
  }
  constructor(page) {
    this.page = page;
  }

  /**
   * DYNAMIC NAVIGATION ENGINE
   * Navigates to any item in the RadMenu by simply passing the text names.
   * @param {string} mainMenuName - The exact text of the top menu (e.g., "Administration")
   * @param {string} subMenuName - (Optional) The exact text of the sub-item (e.g., "Company Settings")
   */
  async navigateTo(mainMenuName, subMenuName) {
    // 1. Locate the Main Menu Item
    const mainMenuItem = this.page.getByText(mainMenuName, { exact: true });

    await mainMenuItem.waitFor({ state: 'visible' });

    // 2. Handle Submenu Navigation
    if (subMenuName) {
      // Hover to trigger the dropdown
      await mainMenuItem.hover();

      // Locate the SPECIFIC dropdown container for this menu item.
      const dropdown = this.page
        .locator('.rmSlide')
        .filter({ has: this.page.getByText(subMenuName) });

      // Wait for animation to finish
      await dropdown.waitFor({ state: 'visible' });

      // Find the specific submenu link
      const subMenuItem = dropdown.getByText(subMenuName, { exact: true });

      await subMenuItem.click();
    } else {
      // No submenu, just click the top link
      await mainMenuItem.click();
    }

    // 3. Wait for page load
    await this.page.waitForLoadState('networkidle');
  }

  // Wait for page to be fully ready
  async waitForPageReady() {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForFunction(() => document.readyState === 'complete').catch(() => {});
  }
}
