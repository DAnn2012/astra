const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );

test.describe( 'Horizontal divider 1 color verification', () => {
	const colorSettings = {
        'header-divider-1-layout': 'horizontal',
		'header-divider-1-color': 'rgb(218, 12, 22)',
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
    test( 'Horizontal divider 1 color on the front end.', async ({ page }) => {
		await test.step('Divider 1 color', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1 .ast-divider-wrapper');
			await expect(divider).toHaveCSS('border-color', colorSettings[ 'header-divider-1-color' ]);
		});
    } );
} );

test.describe( 'Vertical divider 1 color verification', () => {
	const colorSettings = {
        'header-divider-1-layout': 'vertical',
		'header-divider-1-color': 'rgb(218, 12, 22)',
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
    test( 'Vertical divider 1 color on the front end.', async ({ page }) => {
		await test.step('Divider 1 color', async () => {
			await page.goto('/');
			const divider = await page.locator('.ast-header-divider-1 .ast-divider-wrapper');
			await expect(divider).toHaveCSS('border-color', colorSettings[ 'header-divider-1-color' ]);
		});
    } );
} );