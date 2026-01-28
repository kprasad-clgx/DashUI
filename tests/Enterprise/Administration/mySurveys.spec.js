import { test, expect } from '../../../fixtures/enterpriseFixtures.js';
import { MySurveysPage } from '../../../pageObjects/enterprise/administrationFG/mySurveys.po.js';

test('My Survey Page', async ({ authenticatedPage }) => {
  const page = authenticatedPage;
  const mySurveysPage = new MySurveysPage(page);

  // Navigate to My Surveys page
  await mySurveysPage.navigateToMySurveys();

  // Verify My Surveys header is visible
  const mySurveyHeader = await mySurveysPage.verifyMySurveyHeader();
  await expect(mySurveyHeader).toBeVisible();
  await expect(mySurveyHeader).toHaveText(/^\s*View My Surveys\s*$/);

  // Verify Create Survey button is visible and is submit type
  const createSurveyButton = await mySurveysPage.verifyCreateSurveyButton();
  await expect(createSurveyButton).toBeVisible();
  await expect(createSurveyButton).toHaveAttribute('type', 'submit');

  // Verify Back to HomePage button is visible and is submit type
  const backToHomePageButton = await mySurveysPage.verifyBackToHomePageButton();
  await expect(backToHomePageButton).toBeVisible();
  await expect(backToHomePageButton).toHaveAttribute('type', 'submit');

  // Verify View My Surveys grid header is visible
  const viewMySurveysGridHeader = await mySurveysPage.verifyViewMySurveysGridHeader();
  await expect(viewMySurveysGridHeader).toBeVisible();
  await expect(viewMySurveysGridHeader).toHaveText(/^\s*View My Surveys\s*$/);

  // Verify Survey Title column header is visible
  const surveyTitleColumnHeader = await mySurveysPage.verifySurveyTitleColumnHeader();
  await expect(surveyTitleColumnHeader).toBeVisible();

  // Verify Date Created column header is visible
  const dateCreatedColumnHeader = await mySurveysPage.verifyDateCreatedColumnHeader();
  await expect(dateCreatedColumnHeader).toBeVisible();

  // Verify Active column header is visible
  const activeColumnHeader = await mySurveysPage.verifyActiveColumnHeader();
  await expect(activeColumnHeader).toBeVisible();

  // Verify Analyze column header is visible
  const analyzeColumnHeader = await mySurveysPage.verifyAnalyzeColumnHeader();
  await expect(analyzeColumnHeader).toBeVisible();

  // Verify Delete column header is visible
  const deleteColumnHeader = await mySurveysPage.verifyDeleteColumnHeader();
  await expect(deleteColumnHeader).toBeVisible();

  // Verify Total Responses column header is visible
  const totalResponsesColumnHeader = await mySurveysPage.verifyTotalResponsesColumnHeader();
  await expect(totalResponsesColumnHeader).toBeVisible();

  // Verify Average Score Summary column header is visible
  const averageScoreSummaryColumnHeader =
    await mySurveysPage.verifyAverageScoreSummaryColumnHeader();
  await expect(averageScoreSummaryColumnHeader).toBeVisible();

  // Verify Refresh grid button is visible
  const refreshGridButton = await mySurveysPage.verifyRefreshGridButton();
  await expect(refreshGridButton).toBeVisible();
});
