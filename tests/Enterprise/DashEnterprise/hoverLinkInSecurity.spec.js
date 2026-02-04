import { test, expect } from '../../../fixtures/enterpriseFixtures';
import { SecurityPage } from '../../../pageObjects/enterprise/dashEnterprise/SecurityPage.po';

test('Hover Link Security', async ({ authenticatedPage }) => {
  const securityPage = new SecurityPage(authenticatedPage);

  //navigate to Administration -> Employee/Security Settings
  await securityPage.navigateTo('Administration', 'Employee / Security Settings');

  await securityPage.openSecurityPage();

  await securityPage.expandSlideboard.click();
  await expect(securityPage.hoverLink).toBeVisible();
});
