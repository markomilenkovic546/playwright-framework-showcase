# Playwright Framework Showcase

## Project Overview

This repository demonstrates a test automation framework design and automation script writing using Playwright. 

### Application Under Test

The application used for testing in this project is **Bookcart**.

- **Client Base URL**: [https://bookcart.azurewebsites.net/](https://bookcart.azurewebsites.net/)
- **API Base URL**: [https://bookcart.azurewebsites.net/api](https://bookcart.azurewebsites.net/api)

## Project Structure


### Framework Design

The framework is designed following the Page Object Model (POM), where each page is represented by its own class.
The components within the pages are also encapsulated in separate classes.
These component classes are then composed within the page classes to create a modular and maintainable structure, improving scalability and code reuse across tests.

## Key Features

### Test Data Generation

- **Faker.js**: The `DataFactory` class is used to generate dynamic test data, such as user information, etc., ensuring that the tests can run with varied data for each execution.


### API Helper Class

- An APIHelper class is created to handle API requests during the tests, providing an abstraction layer for making API calls in the tests. These methods are primarily used for test setup and cleanup, ensuring tests have the required preconditions and properly reset the environment afterwards.


### CI/CD

- **GitHub Actions**: The project utilizes GitHub Actions for CI/CD. Separate workflows are created for each type of test: smoke tests run automatically on every push event, while e2e-regression, cross-browser, and cross-device tests can be triggered manually via workflow dispatch. Test artifacts such as Playwright test reports are uploaded at the end of each test run to facilitate result analysis.



## Running Locally

### Clone project locally by running `git clone` command

### Install dependencies:

```bash
npm install
# or
yarn install
```
### Create `.env` file in the root dir
Add following variables in the .env:
```bash
BASE_URL=<client base url>
API_BASE_URL=<api base url>
```


## Available Test Scripts:

Run Smoke tests:

```bash
npm run test:smoke
# or
yarn test:smoke
```

Run E2E Regression tests:

```bash
npm run test:e2e-regression
# or
yarn test:e2e-regression
```

Run Cross-browser tests:

```bash
npm run test:cross-browser
# or
yarn test:cross-browser
```
Run Cross-device tests:

```bash
npm run test:cross-device
# or
yarn test:cross-device
```
