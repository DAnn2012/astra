const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../utils/customize' );
const { setBrowserViewport } = require( '../../../utils/set-browser-viewport' ); 
test.describe( 'Site tagline font size verification', () => {
	const typoSettings = {
        'font-size-site-tagline': {
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
    test( 'Site tagline font size on the front end.', async ({ page }) => {
		await test.step('Site tagline font size', async () => {
		await page.goto('/');
        const taglineFontSize = await page.locator('.site-header .site-description');
        await expect(taglineFontSize).toHaveCSS('font-size', `${ typoSettings[ 'font-size-site-tagline' ].desktop * typoSettings[ 'font-size' ] }` + 'px');

        await setBrowserViewport( 'medium' );
        const taglineFontSizeTablet = await page.locator('.site-header .site-description');
        await expect(taglineFontSizeTablet).toHaveCSS('font-size', `${ typoSettings[ 'font-size-site-tagline' ].tablet * typoSettings[ 'font-size' ] }` + 'px');

        await setBrowserViewport( 'small' );
        const taglineFontSizeMobile = await page.locator('.site-header .site-description');
        await expect(taglineFontSizeMobile).toHaveCSS('font-size', `${ typoSettings[ 'font-size-site-tagline' ].mobile * typoSettings[ 'font-size' ] }` + 'px');
        } );
    } );
} );

 