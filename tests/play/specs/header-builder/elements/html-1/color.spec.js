const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );
// const { setBrowserViewport } = require( '../../../../utils/set-browser-viewport' );

test.describe( 'HTML 1 color verification', () => {
	const colorSettings = {
		'header-html-1color': {
            desktop: 'rgb(229, 10, 10)',
            tablet: 'rgb(218, 12, 22)',
            mobile: 'rgb(218, 12, 22)',
        },
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'html-1',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );
    test( 'HTML 1 color on the front end.', async ({ page }) => {
		await test.step('HTML 1 color', async () => {
			await page.goto('/');
			const html = await page.locator('.ast-header-html-1 .ast-builder-html-element');
			await expect(html).toHaveCSS('color', colorSettings[ 'header-html-1color' ].desktop);

            // await setBrowserViewport( 'medium' );
            // const htmlTablet = await page.locator('.ast-header-html-1 .ast-builder-html-element');
			// await expect(htmlTablet).toHaveCSS('color', colorSettings[ 'header-html-1color' ].tablet);

            // await setBrowserViewport( 'small' );
            // const htmlMobile = await page.locator('.ast-header-html-1 .ast-builder-html-element');
			// await expect(htmlMobile).toHaveCSS('color', colorSettings[ 'header-html-1color' ].mobile);
		});
    } );
} );