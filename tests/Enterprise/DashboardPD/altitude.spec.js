import { test } from '../../../fixtures/enterpriseFixtures.js';
import AltitudePage from '../../../pageObjects/enterprise/dashboardPD/altitude.po.js';

test('Altitude Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const altitudePage = new AltitudePage(page);

  // Navigate to Altitude page
  await altitudePage.navigateToAltitude();

  // Assert Altitude heading
  await altitudePage.assertAltitudeHeading();

  // Assert filter labels are visible
  await altitudePage.assertFilterLabelsVisible();

  // Assert all job status labels are visible
  await altitudePage.assertAllJobStatusLabelsVisible();

  // Open and close employee selection modal
  await altitudePage.openAndCloseEmployeeModal();

  // Assert time frame dropdown and verify all options
  await altitudePage.assertTimeFrameDropdownAndOptions();
});
