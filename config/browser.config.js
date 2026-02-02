/**
 * Shared browser configuration for consistent behavior across setup and tests
 */
export const browserConfig = {
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
  viewport: null, // null to use full screen with --start-maximized
  ignoreHTTPSErrors: process.env.TEST_ENV !== 'prod', // Only ignore in dev/test/qa/stage
  launchOptions: {
    args: ['--start-maximized'],
  },
};
