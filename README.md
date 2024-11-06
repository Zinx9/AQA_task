# Automated Tests for UI and API with Playwright

This project includes automated tests for:
- **UI Testing** on [Sauce Demo](https://www.saucedemo.com/)
- **API Testing** using [JSONPlaceholder API](https://jsonplaceholder.typicode.com/)

The test suites are implemented with [Playwright](https://playwright.dev/), configured to run locally and on CI using GitHub Actions.

---

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Tests Locally](#running-tests-locally)
  - [API Tests](#api-test)
  - [UI Tests](#ui-test)
- [Running Tests on GitHub Actions](#running-tests-on-github-actions)
  - [GitHub Actions Workflow Setup](#github-actions-workflow-setup)
  - [Viewing CI Test Results](#viewing-ci-test-results)
- [Troubleshooting](#troubleshooting)

---

## Project Structure

```
.
├── .github/workflows/           # GitHub Actions workflows
│   ├── api-test.yml            # Workflow for API tests
│   └── ui-test.yml             # Workflow for UI tests
├── Data/
│   └── userCred.js              # User credentials for UI tests
├── pages/                       # Page Object Models (POM) for UI tests
│   ├── InventoryPage.js
│   └── LoginPage.js
├── schemas/
│   └── postSchema.js            # JSON schema for API response validation
├── tests/                       # Test files
│   ├── api-test/
│   │   └── apiTest.spec.js      # API test spec
│   └── ui-test/
│       └── sortFilterItems.spec.js # UI test spec for sorting functionality
├── utils/
│   └── ApiHelper.js             # Helper functions for API tests
├── .gitignore
├── package-lock.json
├── package.json
└── playwright.config.js         # Playwright configuration file
```

---

## Prerequisites

- **Node.js** (v16 or higher)
- **Git**

Clone the repository and navigate to the project folder:
```bash
git clone <repository-url>
cd <repository-name>
```

---

## Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Install Playwright browsers:
   ```bash
   npx playwright install
   ```

---

## Running Tests Locally

### API Tests

To run the API tests locally:
```bash
npx playwright test tests/api-test --project=api
```

This command tests CRUD operations on the JSONPlaceholder API, verifying that all actions conform to `postSchema.js`.

### UI Tests

To run the UI tests locally:
```bash
npx playwright test tests/ui-test --project=ui
```

This test script checks the sorting feature on the Sauce Demo website by logging in with credentials from `Data/userCred.js`, sorting items by Name (A -> Z), switching to Name (Z -> A), and verifying correct order.

#### Additional Options

- **Run UI Tests in Headed Mode**:
  ```bash
  npx playwright test tests/ui-test --project=ui --headed
  ```

- **View Test Reports** (after running any test suite):
  ```bash
  npx playwright show-report
  ```

---

## Running Tests on GitHub Actions

### GitHub Actions Workflow Setup

This project is set up to run tests automatically on GitHub Actions via two separate workflows:
- `api-test.yml` for API tests
- `ui-test.yml` for UI tests

These workflows are located in `.github/workflows/` and are triggered on every push or pull request to the main branch.

#### API Tests on GitHub Actions
1. The `api-test.yml` workflow installs dependencies, sets up Playwright, and runs the API tests in headless mode.
2. It validates CRUD operations against JSONPlaceholder, using schema validation.

#### UI Tests on GitHub Actions
1. The `ui-test.yml` workflow also installs dependencies, sets up Playwright, and runs UI tests headlessly.
2. The workflow utilizes page objects from `pages/` and user data from `Data/userCred.js`.

### Viewing CI Test Results

1. Go to **Actions** in the GitHub repository.
2. Select the appropriate workflow (either **API Tests** or **UI Tests**) to view details.
3. Click on the latest run to see logs and test results.

---

## Troubleshooting

1. **Browser Installation Issues**:
   Run `npx playwright install` to install missing browsers.

2. **GitHub Actions Runner Issues**:
   Ensure the `.github/workflows/api-test.yml` and `.github/workflows/ui-test.yml` files are configured correctly with appropriate permissions.

---
