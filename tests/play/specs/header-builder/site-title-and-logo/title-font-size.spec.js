const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../utils/customize' );
const { setBrowserViewport } = require( '../../../utils/set-browser-viewport' ); 
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
    };
    test.beforeAll( async ( { baseURL } ) => {
        await setCustomizeSettings( typoSettings, baseURL );
    } );
    test( 'Site title font size on the front end.', async ({ page }) => {
		await test.step('Site title font size', async () => {
		await page.goto('/');
        const titleFontSize = await page.locator('.site-title');
        await expect(titleFontSize).toHaveCSS('font-size', `${ typoSettings[ 'font-size-site-title' ].desktop * typoSettings[ 'font-size' ] }` + 'px');

        await setBrowserViewport( 'medium' );
        const titleFontSizeTablet = await page.locator('.site-title');
        await expect(titleFontSizeTablet).toHaveCSS('font-size', `${ typoSettings[ 'font-size-site-title' ].tablet * typoSettings[ 'font-size' ] }` + 'px');

        await setBrowserViewport( 'small' );
        const titleFontSizeMobile = await page.locator('.site-title');
        await expect(titleFontSizeMobile).toHaveCSS('font-size', `${ typoSettings[ 'font-size-site-title' ].mobile * typoSettings[ 'font-size' ] }` + 'px');
        } );
    } );
} );

 