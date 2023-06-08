const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../utils/customize' );
test.describe( 'Site tagline font size verification', () => {
	const typoSettings = {
        '_customize-input-blogdescription': 'Testing tagline color',
		'display-site-tagline-responsive': {
            desktop: 1,
        },
        'font-size-site-tagline': {
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
    test( 'Site tagline font size on the front end.', async ({ page }) => {
		await test.step('Site tagline font size', async () => {
		await page.goto('/');
        await page.waitForTimeout(5000);
        const taglineFontSize = await page.locator('.site-header .site-description');
        await expect(taglineFontSize.first()).toHaveCSS('font-size', `${typoSettings['font-size-site-tagline'].desktop}${typoSettings['font-size-site-tagline']['desktop-unit']}`);
        } );
    } );
} );

 