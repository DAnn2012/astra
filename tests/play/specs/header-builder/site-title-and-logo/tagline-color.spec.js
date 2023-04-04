const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );

test.describe( 'Site tagline color verification', () => {
	const colorSettings = {
		'header-color-site-tagline': 'rgb(24, 230, 26)',
        'display-site-tagline-responsive': {
            desktop: 1,
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );
    test( 'Site tagline color on the front end.', async ({ page }) => {
		await test.step('Site tagline color', async () => {
			await page.goto('/');
			const siteTaglineColor = await page.locator('.ast-site-identity .site-description');
			await expect(siteTaglineColor).toHaveCSS('color', colorSettings[ 'header-color-site-tagline' ]);
		});
    } );
} );