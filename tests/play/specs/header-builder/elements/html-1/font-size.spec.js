const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );
//const { setBrowserViewport } = require( '../../../utils/set-browser-viewport' ); 
test.describe( 'HTML 1 font size verification', () => {
	const typoSettings = {
        'font-size-section-hb-html-1': {
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
    test( 'HTML 1 font size on the front end.', async ({ page }) => {
		await test.step('HTML 1 font size', async () => {
		await page.goto('/');
        const htmlFontSize = await page.locator('.ast-header-html-1 .ast-builder-html-element');
        await expect(htmlFontSize).toHaveCSS('font-size', `${ typoSettings[ 'font-size-section-hb-html-1' ].desktop * typoSettings[ 'font-size' ] }` + 'px');

        // await setBrowserViewport( 'medium' );
        // const htmlFontSizeTablet = await page.locator('.ast-header-html-1 .ast-builder-html-element');
        // await expect(htmlFontSizeTablet).toHaveCSS('font-size', `${ typoSettings[ 'font-size-section-hb-html-1' ].tablet * typoSettings[ 'font-size' ] }` + 'px');

        // await setBrowserViewport( 'small' );
        // const htmlFontSizeMobile = await page.locator('.ast-header-html-1 .ast-builder-html-element');
        // await expect(htmlFontSizeMobile).toHaveCSS('font-size', `${ typoSettings[ 'font-size-section-hb-html-1' ].mobile * typoSettings[ 'font-size' ] }` + 'px');
        } );
    } );
} );

 