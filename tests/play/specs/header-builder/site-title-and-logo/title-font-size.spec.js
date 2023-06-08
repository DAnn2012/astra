const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../utils/customize' );
test.describe( 'Site title font size verification', () => {
	const typoSettings = {
        'font-size-site-title': {
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
                    0: 'logo',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
        await setCustomizeSettings( typoSettings, baseURL );
    } );
    test( 'Site title font size on the front end.', async ({ page }) => {
		await test.step('Site title font size', async () => {
		await page.goto('/');
        await page.waitForTimeout(5000);
        const titleFontSize = await page.locator('.site-title');
        await expect(titleFontSize.first()).toHaveCSS('font-size', `${typoSettings['font-size-site-title'].desktop}${typoSettings['font-size-site-title']['desktop-unit']}`);
        } );
    } );
} );

 