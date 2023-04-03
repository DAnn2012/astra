const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );

test.describe( 'Account color verification', () => {
	const colorSettings = {
        'header-account-login-style': 'icon',
		'header-account-icon-color': 'rgb(218, 12, 22)',
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'account',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( colorSettings, baseURL );
	} );
    test( 'Account color on the front end.', async ({ page }) => {
		await test.step('Account color', async () => {
			await page.goto('/');
			const account = await page.locator('.ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg path:not( .ast-hf-account-unfill ), .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg circle');
			await expect(account).toHaveCSS('fill', colorSettings[ 'header-account-icon-color' ]);
		});
    } );
} );