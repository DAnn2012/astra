const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );

test.describe( 'Horizontal divider 1 sticky color verification', () => {
	const colorSettings = {
        'header-main-stick': 1,
        'header-divider-1-layout': 'horizontal',
		'sticky-header-divider-1-color': 'rgb(218, 12, 22)',
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'divider-1',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );
    test( 'Horizontal divider 1 sticky color on the front end.', async ({ page }) => {
		await test.step('Divider 1 sticky color', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-sticked .site-header-section .ast-builder-layout-element.ast-header-divider-1 .ast-divider-wrapper');
			await expect(divider).toHaveCSS('border-color', colorSettings[ 'sticky-header-divider-1-color' ]);
		});
    } );
} );

test.describe( 'Vertical divider 1 sticky color verification', () => {
	const colorSettings = {
        'header-main-stick': 1,
        'header-divider-1-layout': 'vertical',
		'sticky-header-divider-1-color': 'rgb(218, 12, 22)',
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'divider-1',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );
    test( 'Vertical divider 1 sticky color on the front end.', async ({ page }) => {
		await test.step('Divider 1 sticky color', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-sticked .site-header-section .ast-builder-layout-element.ast-header-divider-1 .ast-divider-wrapper');
			await expect(divider).toHaveCSS('border-color', colorSettings[ 'sticky-header-divider-1-color' ]);
		});
    } );
} );