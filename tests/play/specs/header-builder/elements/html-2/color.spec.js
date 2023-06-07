const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );
const { setBrowserViewport } = require( '../../../../utils/set-browser-viewport' );

test.describe( 'HTML 2 color verification', () => {
	const colorSettings = {
		'header-html-2color': {
            desktop: 'rgb(229, 10, 10)',
            tablet: 'rgb(7, 217, 140)',
            mobile: 'rgb(7, 217, 140)',
        },
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'html-2',
                },
            },
        },
        'header-mobile-items': {
            primary: {
                primary_center: {
                    0: 'html-2',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );
    test( 'HTML 2 color on the front end.', async ({ page }) => {
		await test.step('HTML 2 color', async () => {
			await page.goto('/');
            await page.waitForTimeout(5000);
            const htmlColor = await page.$eval('.ast-header-html-2 .ast-builder-html-element',
            el => window.getComputedStyle(el).color);
            await expect(htmlColor).toBe(colorSettings['header-html-2color'].desktop);

            await setBrowserViewport(page, "medium");
            await page.waitForTimeout(5000);
            const htmlColorTablet = await page.$eval('.ast-header-html-2 .ast-builder-html-element',
            el => window.getComputedStyle(el).color);
            await expect(htmlColorTablet).toBe(colorSettings['header-html-2color'].tablet);

            await setBrowserViewport(page, "small");
            await page.waitForTimeout(5000);
            const htmlColorMobile = await page.$eval('.ast-header-html-2 .ast-builder-html-element',
            el => window.getComputedStyle(el).color);
            await expect(htmlColorMobile).toBe(colorSettings['header-html-2color'].mobile);
		});
    } );
} );