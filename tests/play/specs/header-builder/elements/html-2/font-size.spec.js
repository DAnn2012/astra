const { test, expect } = require('@playwright/test');
const { setCustomizeSettings } = require('../../../../utils/customize');
test.describe('HTML 2 font size verification', () => {
  const typoSettings = {
    'font-size-section-hb-html-2': {
      desktop: 60,
      tablet: 40,
      mobile: 20,
      'desktop-unit': 'px',
      'tablet-unit': 'px',
      'mobile-unit': 'px',
    },
    'header-desktop-items': {
        primary: {
            primary_center: {
                0: 'html-2',
            },
        },
    },
    'header-mobile-items': {
        primary: {
            primary_center: {
                0: 'html-2',
            },
        },
    },
  };

  test.beforeAll(async ({ baseURL }) => {
    await setCustomizeSettings(typoSettings, baseURL);
  });

  test('HTML 2 font size on the front end.', async ({ page }) => {
    await test.step('HTML 2 font size', async () => {
      await page.goto('/');
      await page.waitForTimeout(5000);
      const htmlFontSize = await page.locator('.ast-header-html-2 .ast-builder-html-element');
      await expect(htmlFontSize.first()).toHaveCSS('font-size', `${typoSettings['font-size-section-hb-html-2'].desktop}${typoSettings['font-size-section-hb-html-2']['desktop-unit']}`);

    });
    });
});