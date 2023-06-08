const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../utils/customize' );

test.describe( 'Site title color verification', () => {
	const colorSettings = {
		'header-color-site-title': 'rgb(218, 12, 22)',
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
    test( 'Site title color on the front end.', async ({ page }) => {
		await test.step('Site title color', async () => {
			await page.goto('/');
			const siteTitleColor = await page.$eval('.ast-site-identity .site-title a',
            el => window.getComputedStyle(el).color);
            await expect(siteTitleColor).toBe(colorSettings['header-color-site-title']);
		});
    } );
} );