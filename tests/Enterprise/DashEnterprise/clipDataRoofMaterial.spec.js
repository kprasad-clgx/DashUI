import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };

test('Clip data - Roof Material: Asphalt/Composition Shingle value is displayed', async ({
  authenticatedPage,
}) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  const jobNumber = jobData.jobNumber;

  // 1. Search for the job
  await searchJobNumber(authenticatedPage, jobNumber);

  // 2. Open Cotality Data Modal
  await jobSlideboardPage.openCotalityDataModal();

  // 3. Wait for roof icon to be visible (roof data loaded)
  await jobSlideboardPage.waitForRoofIcon();

  // 4. Get the roof material field text
  const fieldText = await jobSlideboardPage.getRoofMaterialFieldText();

  // 5. Assert that one of the valid shingle variants is present
  const validVariants = [
    'Asphalt Shingle',
    'Composition Shingle',
    'Asphalt/Composition Shingle',
    'Composition',
    'Shingle',
  ];
  expect(
    validVariants.some((variant) => fieldText.includes(variant)),
    `Expected roof material to contain one of ${validVariants.join(', ')} but got: "${fieldText}"`,
  ).toBe(true);
});
