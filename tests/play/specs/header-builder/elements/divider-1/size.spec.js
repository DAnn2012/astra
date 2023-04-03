const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );
const { setBrowserViewport } = require ( '../../../../utils/set-browser-viewport');

test.describe( 'Horizontal divider 1 size verification', () => {
	const sizeSetting = {
        'header-divider-1-layout': 'horizontal',
		'header-horizontal-divider-1-size': {
            'desktop': 500,
            'tablet': 300,
            'mobile': 200,
        },
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'divider-1',
                },
            },
        },
        'header-mobile-items': {
            primary: {
                primary_center: {
                    0: 'divider-1',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( sizeSetting, baseURL );
	} );
    test( 'Horizontal divider 1 size on the front end.', async ({ page }) => {
		await test.step('Divider 1 size', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1.ast-hb-divider-layout-horizontal .ast-divider-layout-horizontal');
			await expect(divider).toHaveCSS('width', `${sizeSetting[ 'header-horizontal-divider-1-size' ].desktop} + 'px`);
        });

        await setBrowserViewport( 'medium' );
		await test.step('Divider 1 size', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1.ast-hb-divider-layout-horizontal .ast-divider-layout-horizontal');
			await expect(divider).toHaveCSS('width', `${sizeSetting[ 'header-horizontal-divider-1-size' ].tablet} + 'px`);
        });

        await setBrowserViewport( 'small' );
        await test.step('Divider 1 size', async () => {
            await page.goto('/');
            const divider = await page.locator('.ast-header-divider-1.ast-hb-divider-layout-horizontal .ast-divider-layout-horizontal');
            await expect(divider).toHaveCSS('width', `${sizeSetting[ 'header-horizontal-divider-1-size' ].mobile} + 'px`);
        });
    } );
} );


test.describe( 'Vertical divider 1 size verification', () => {
	const sizeSetting = {
        'header-divider-1-layout': 'vertical',
		'header-divider-1-size': {
            'desktop': 80,
            'tablet': 60,
            'mobile': 40,
        },
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'divider-1',
                },
            },
        },
        'header-mobile-items': {
            primary: {
                primary_center: {
                    0: 'divider-1',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( sizeSetting, baseURL );
	} );
    test( 'Vertical divider 1 size on the front end.', async ({ page }) => {
		await test.step('Divider 1 size', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1.ast-hb-divider-layout-vertical .ast-divider-layout-vertical');
			await expect(divider).toHaveCSS('height', `${sizeSetting[ 'header-divider-1-size' ].desktop} + '%`);
        });

        await setBrowserViewport( 'medium' );
		await test.step('Divider 1 size', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1.ast-hb-divider-layout-vertical .ast-divider-layout-vertical');
			await expect(divider).toHaveCSS('height', `${sizeSetting[ 'header-divider-1-size' ].tablet} + '%`);
        });

        await setBrowserViewport( 'small' );
        await test.step('Divider 1 size', async () => {
            await page.goto('/');
            const divider = await page.locator('.ast-header-divider-1.ast-hb-divider-layout-vertical .ast-divider-layout-vertical');
            await expect(divider).toHaveCSS('height', `${sizeSetting[ 'header-divider-1-size' ].mobile} + '%`);
        });
    } );
} );