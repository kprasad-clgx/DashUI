// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { browserConfig } from './config/browser.config.js';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

// Generate timestamp for report file names
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, -5);

export default defineConfig({
  testDir: './tests',
  /* Global setup to run before all tests */
  globalSetup: './global-setup.js',
  /* Global teardown to run after all tests */
  globalTeardown: './global-teardown.js',
  /* Maximum time one test can run for (in milliseconds) */
  timeout: 300000, // 300 seconds (5 minutes) - increased for complex test flows
  /* Maximum time expect() should wait for the condition to be met */
  expect: {
    timeout: 120000, // 60 seconds - increased for slower elements
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 1 : 0,
  /* Run tests in parallel - optimized for CI and local */
  workers: process.env.CI ? 4 : 2, // Use 4 workers in CI, 2 locally
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI
    ? [
        ['html', { outputFolder: `playwright-report/report-${timestamp}` }],
        ['json', { outputFile: `test-results/results-${timestamp}.json` }],
        ['list'],
      ]
    : [
        [
          'html',
          {
            open: 'never',
            outputFolder: `playwright-report/report-${timestamp}`,
          },
        ],
        ['list'],
      ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'off', // 'on', 'off', 'retain-on-failure', 'on-first-retry'
    screenshot: {
      mode: 'only-on-failure', // 'on', 'off', 'only-on-failure'
      fullPage: true, // Capture full scrollable page, not just viewport
    },
    video: 'off', // 'on', 'off', 'retain-on-failure', 'on-first-retry'

    /* Automatically close browser after test execution */
    headless: true, // Set to true for headless mode
    viewport: browserConfig.viewport,

    /* Common user agent */
    userAgent: browserConfig.userAgent,

    /* Ignore HTTPS errors - only for dev/test environments with self-signed certs */
    /* WARNING: Set to false for production-like environments */
    ignoreHTTPSErrors: browserConfig.ignoreHTTPSErrors,

    /* Launch options for full-screen mode */
    launchOptions: browserConfig.launchOptions,

    /* Action timeout for each Playwright action (click, fill, etc.) */
    actionTimeout: 180000, // 180 seconds - increased for slow-loading elements

    /* Navigation timeout */
    navigationTimeout: 240000, // 120 seconds (2 minutes) - increased for heavy pages
  },

  /* Global teardown - browser closes automatically after all tests */
  projects: [
    {
      name: 'enterprise-setup',
      testMatch: '**/Enterprise/00-setup_Job_Claim/**/*.spec.js',
      fullyParallel: false, // Run tests one by one (sequentially)
      retries: 2, // Retry failed tests twice
      use: {
        storageState: '.auth/enterprise.json',
      },
    },
    {
      name: 'admin-chromium',
      testMatch: '**/Admin/**/*.spec.js',
      dependencies: ['enterprise-setup'], // Wait for setup to complete
      use: {
        storageState: '.auth/admin.json',
      },
    },
    {
      name: 'enterprise-chromium',
      testMatch: '**/Enterprise/**/*.spec.js',
      testIgnore: '**/Enterprise/00-setup_Job_Claim/**/*.spec.js',
      dependencies: ['enterprise-setup'], // Wait for setup to complete
      use: {
        storageState: '.auth/enterprise.json',
      },
    },
    {
      name: 'mixed-chromium',
      testMatch: '**/EnterpriseAndAdmin/**/*.spec.js',
      // Wait for setup to ensure auth files are created
      dependencies: ['enterprise-setup'],
      // Force sequential execution - ALWAYS run tests one at a time
      fullyParallel: false,
      // Retry failed tests - mixed tests are more prone to timing issues
      retries: 1,
      // Force single worker for sequential execution - overrides workers setting
      workers: 1,
      use: {
        // Don't specify storageState - mixedFixtures creates separate contexts
      },
    },

    // Uncomment if you need to test on other browsers
    // {
    //   name: "firefox",
    //   use: { ...devices["Desktop Firefox"] },
    // },
    // {
    //   name: "webkit",
    //   use: { ...devices["Desktop Safari"] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
