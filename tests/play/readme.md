Inside that directory, you can run several commands:

  npx playwright test
    Runs the end-to-end tests.

  npx playwright test --project=chromium
    Runs the tests only on Desktop Chrome.

  npx playwright test tests/play/example.spec.js
    Runs the tests of a specific file.

  npx playwright test --debug
    Runs the tests in debug mode.

  npx playwright test tests/play/ideal.spec.js --headed
    Runs the specific test in headed mode mode.

We suggest that you begin by typing:

  npx playwright test

And check out the following files:
  - ./tests/play/example.spec.js - Example end-to-end test
  - ./playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨

Happy hacking! 🎭