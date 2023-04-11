const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../utils/customize' );

test.describe( 'Site title color verification', () => {
	const colorSettings = {
		'header-color-site-title': 'rgb(218, 12, 22)',
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );
    test( 'Site title color on the front end.', async ({ page }) => {
		await test.step('Site title color', async () => {
			await page.goto('/');
			const siteTitleColor = await page.locator('.ast-site-identity .site-title a');
			await expect(siteTitleColor).toHaveCSS('color', colorSettings[ 'header-color-site-title' ]);
		});
    } );
} );