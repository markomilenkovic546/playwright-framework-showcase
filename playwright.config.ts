import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html']],
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://localhost:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'on-first-retry'
    },

    /* Configure projects for major browsers */
    projects: [
        /*
    {
        name: 'setup',
        testMatch: /.*\.setup\.ts/ // Runs only the authentication setup file
    },
    */
        {
            name: 'Smoke Testing',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
                video: 'retain-on-failure',
                trace: 'on'
            },
            grep: /@smoke/ // Only run tests with the @smoke tag
            //dependencies: ['setup'] // Ensure setup runs first
        },
        {
            name: 'Google Chrome',
            use: {
                ...devices['Desktop Chrome'],
                channel: 'chrome',
                video: 'retain-on-failure'
            },
            grep: /@desktop/ // Only run tests with the @desktop tag
            //dependencies: ['setup'] // Ensure setup runs first
        },
        {
            name: 'Firefox',
            use: {
                ...devices['Desktop Firefox'],
                video: 'retain-on-failure'
            },
            grep: /@desktop/
            //dependencies: ['setup']
        },
        {
            name: 'Microsoft Edge',
            use: {
                ...devices['Desktop Edge'],
                channel: 'msedge',
                video: 'retain-on-failure'
            },
            grep: /@desktop/
            //dependencies: ['setup']
        },
        {
            name: 'Mobile Chrome',
            use: {
                ...devices['Pixel 5'],
                video: 'retain-on-failure'
            },
            grep: /@mobile/
            //dependencies: ['setup']
        },
        {
            name: 'Tablet',
            use: {
                ...devices['Galaxy Tab S4'],
                video: 'retain-on-failure'
            },
            grep: /@tablet/
            //dependencies: ['setup']
        }
    ]

    /* Run your local dev server before starting the tests */
    // webServer: {
    //   command: 'npm run start',
    //   url: 'http://localhost:3000',
    //   reuseExistingServer: !process.env.CI,
    // },
});
