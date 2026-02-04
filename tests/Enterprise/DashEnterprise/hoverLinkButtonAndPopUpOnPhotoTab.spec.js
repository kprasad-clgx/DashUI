import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { JobSlideboardPage } from '../../../pageObjects/enterprise/jobSlideboard/jobSlideboardPage.po.js';
import { searchJobNumber } from '../../../utils/searchJobNumber.js';
import jobData from '../../../testData/enterprise/enterpriseJobNumber.json' with { type: 'json' };
import photoLinks from '../../../testData/enterprise/photoLinks/photoLinks.json' with { type: 'json' };

test('Hover link button and popup on photo tab', async ({ authenticatedPage }) => {
  const jobSlideboardPage = new JobSlideboardPage(authenticatedPage);
  let jobNumber = jobData.jobNumber;

  // Use title and url from test data
  const docuTitle = photoLinks[0].baseTitle;
  const docuUrl = photoLinks[0].url.trim();
  const matterportTitle = photoLinks[1].baseTitle;
  const matterportUrl = photoLinks[1].url.trim();
  const hoverTitle = photoLinks[2].baseTitle;
  const hoverUrl = photoLinks[2].url.trim();

  // Search for the job using the robust utility
  await searchJobNumber(authenticatedPage, jobNumber);

  // Click on photo tab on job slideboard
  await jobSlideboardPage.clickPhotosTab();
  await jobSlideboardPage.openLinksPopup();

  // Check the iframe is present and visible
  const iframe = authenticatedPage.locator('#LinksIframe');
  await expect(iframe).toBeVisible();

  await jobSlideboardPage.addAndVerifyDocuSketchLink(docuTitle, docuUrl, expect);
  await jobSlideboardPage.addAndVerifyMatterportLink(matterportTitle, matterportUrl, expect);
  await jobSlideboardPage.addAndVerifyHoverLink(hoverTitle, hoverUrl, expect);
});
