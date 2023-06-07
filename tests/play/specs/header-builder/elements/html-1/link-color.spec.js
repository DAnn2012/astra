const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );
const { setBrowserViewport } = require( '../../../../utils/set-browser-viewport' );
test.describe( 'HTML 1 link color verification', () => {
		const colorSettings = {
			'header-html-1': '<a href="https://wpastra.com/">HTML link color</a>',
			'header-html-1link-color': {
				desktop: 'rgb(11, 177, 115)',
				tablet: 'rgb(131, 11, 166)',
				mobile: 'rgb(131, 11, 166)',
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
        test( 'HTML 1 link color on the front end.', async ({ page }) => {
            await test.step('HTML 1 color', async () => {
                await page.goto('/');
                await page.waitForTimeout(5000);
                const htmlLinkColor = await page.$eval('.ast-header-html-1 a',
                el => window.getComputedStyle(el).color);
                await expect(htmlLinkColor).toBe(colorSettings['header-html-1link-color'].desktop);
    
                await setBrowserViewport(page, "medium");
                await page.waitForTimeout(5000);
                const htmlLinkColorTablet = await page.$eval('.ast-header-html-1 a',
                el => window.getComputedStyle(el).color);
                await expect(htmlLinkColorTablet).toBe(colorSettings['header-html-1link-color'].tablet);
    
                await setBrowserViewport(page, "small");
                await page.waitForTimeout(5000);
                const htmlLinkColorMobile = await page.$eval('.ast-header-html-1 a',
                el => window.getComputedStyle(el).color);
                await expect(htmlLinkColorMobile).toBe(colorSettings['header-html-1link-color'].mobile);
            });
        } );
    } );