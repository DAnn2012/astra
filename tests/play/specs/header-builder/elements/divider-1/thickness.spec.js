const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );
const { setBrowserViewport } = require ( '../../../../utils/set-browser-viewport');

test.describe( 'Horizontal divider 1 thickness verification', () => {
	const thicknessSetting = {
        'header-divider-1-layout': 'horizontal',
		'header-divider-1-thickness': {
            'desktop': 35,
            'tablet': 25,
            'mobile': 15,
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
		await setCustomizeSettings( thicknessSetting, baseURL );
	} );
    test( 'Horizontal divider 1 thickness on the front end.', async ({ page }) => {
		await test.step('Divider 1 thickness', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1 .ast-divider-layout-horizontal');
			await expect(divider).toHaveCSS('border-right-width', `${thicknessSetting[ 'header-divider-1-thickness' ].desktop} + 'px`);
        });

        await setBrowserViewport( 'medium' );
		await test.step('Divider 1 thickness', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1 .ast-divider-layout-horizontal');
			await expect(divider).toHaveCSS('border-right-width', `${thicknessSetting[ 'header-divider-1-thickness' ].tablet} + 'px`);
        });

        await setBrowserViewport( 'small' );
        await test.step('Divider 1 thickness', async () => {
            await page.goto('/');
            const divider = await page.locator('.ast-header-divider-1 .ast-divider-layout-horizontal');
            await expect(divider).toHaveCSS('border-right-width', `${thicknessSetting[ 'header-divider-1-thickness' ].mobile} + 'px`);
        });
    } );
} );


test.describe( 'Vertical divider 1 thickness verification', () => {
	const thicknessSetting = {
        'header-divider-1-layout': 'vertical',
		'header-divider-1-thickness': {
            'desktop': 35,
            'tablet': 25,
            'mobile': 15,
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
		await setCustomizeSettings( thicknessSetting, baseURL );
	} );
    test( 'Vertical divider 1 thickness on the front end.', async ({ page }) => {
		await test.step('Divider 1 thickness', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1 .ast-divider-layout-vertical');
			await expect(divider).toHaveCSS('border-right-width', `${thicknessSetting[ 'header-divider-1-thickness' ].desktop} + 'px`);
        });

        await setBrowserViewport( 'medium' );
		await test.step('Divider 1 thickness', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1 .ast-divider-layout-vertical');
			await expect(divider).toHaveCSS('border-right-width', `${thicknessSetting[ 'header-divider-1-thickness' ].tablet} + 'px`);
        });

        await setBrowserViewport( 'small' );
        await test.step('Divider 1 thickness', async () => {
            await page.goto('/');
            const divider = await page.locator('.ast-header-divider-1 .ast-divider-layout-vertical');
            await expect(divider).toHaveCSS('border-right-width', `${thicknessSetting[ 'header-divider-1-thickness' ].mobile} + 'px`);
        });
    } );
} );