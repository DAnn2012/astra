const { test, expect } = require( '@playwright/test' );
const { adminLogin } = require( '../../../../utils/adminlogin' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );
const { setBrowserViewport } = require( '../../../../utils/set-browser-viewport' );

test.describe( 'HTML 1 color verification', () => {
	const colorSettings = {
		'header-html-1color': {
            desktop: 'rgb(229, 10, 10)',
            tablet: 'rgb(7, 217, 140)',
            mobile: 'rgb(7, 217, 140)',
        },
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'html-1',
                },
            },
        },
        'header-mobile-items': {
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
        const login = new adminLogin( page );
        await login.loginAsAdmin();
		await test.step('HTML 1 color', async () => {
			await page.goto('/');
            const htmlColor = await page.$eval('.ast-header-html-1 .ast-builder-html-element',
            el => window.getComputedStyle(el).color);
            await expect(htmlColor).toBe(colorSettings['header-html-1color'].desktop);

            await setBrowserViewport(page, "medium");
            const htmlColorTablet = await page.$eval('.ast-header-html-1 .ast-builder-html-element',
            el => window.getComputedStyle(el).color);
            await expect(htmlColorTablet).toBe(colorSettings['header-html-1color'].tablet);

            await setBrowserViewport(page, "small");
            const htmlColorMobile = await page.$eval('.ast-header-html-1 .ast-builder-html-element',
            el => window.getComputedStyle(el).color);
            await expect(htmlColorMobile).toBe(colorSettings['header-html-1color'].mobile);
		});
    } );
} );