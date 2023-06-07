const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );
const { setBrowserViewport } = require( '../../../../utils/set-browser-viewport' );
test.describe( 'HTML 2 link color verification', () => {
		const colorSettings = {
			'header-html-2': '<a href="https://wpastra.com/">HTML-2 link color</a>',
			'header-html-2link-color': {
				desktop: 'rgb(21, 177, 115)',
				tablet: 'rgb(131, 11, 166)',
				mobile: 'rgb(131, 11, 166)',
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
        test( 'HTML 2 link color on the front end.', async ({ page }) => {
            await test.step('HTML 2 color', async () => {
                await page.goto('/');
                await page.waitForTimeout(5000);
                const htmlLinkColor = await page.$eval('.ast-header-html-2 a',
                el => window.getComputedStyle(el).color);
                await expect(htmlLinkColor).toBe(colorSettings['header-html-2link-color'].desktop);
    
                await setBrowserViewport(page, "medium");
                await page.waitForTimeout(5000);
                const htmlLinkColorTablet = await page.$eval('.ast-header-html-2 a',
                el => window.getComputedStyle(el).color);
                await expect(htmlLinkColorTablet).toBe(colorSettings['header-html-2link-color'].tablet);
    
                await setBrowserViewport(page, "small");
                await page.waitForTimeout(5000);
                const htmlLinkColorMobile = await page.$eval('.ast-header-html-2 a',
                el => window.getComputedStyle(el).color);
                await expect(htmlLinkColorMobile).toBe(colorSettings['header-html-2link-color'].mobile);
            });
        } );
    } );