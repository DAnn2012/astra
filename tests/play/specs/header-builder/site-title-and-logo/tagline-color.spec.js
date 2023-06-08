const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../utils/customize' );

test.describe( 'Site tagline color verification', () => {
	const colorSettings = {
		'_customize-input-blogdescription': 'Testing tagline color',
		'display-site-tagline-responsive': {
            desktop: 1,
        },
		'header-color-site-tagline': 'rgb(24, 230, 26)',
		'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'logo',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );
    test( 'Site tagline color on the front end.', async ({ page }) => {
		await test.step('Site tagline color', async () => {
			await page.goto('/');
			await page.waitForTimeout(5000);
			const siteTaglineColor = await page.$eval('.ast-site-identity .site-description',
            el => window.getComputedStyle(el).color);
            await expect(siteTaglineColor).toBe(colorSettings['header-color-site-tagline']);
		});
    } );
} );