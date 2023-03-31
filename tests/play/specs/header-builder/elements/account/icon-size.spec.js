const { test, expect } = require( '@playwright/test' );
const { setCustomizeSettings } = require( '../../../../utils/customize' );

test.describe( 'Account icon size verification', () => {
	const iconSize = {
        'header-account-icon-size': {
            'desktop': 45,
        },
        'header-account-login-link': {
            url: '#',
            new_tab: false,
            link_rel: '',
        },
        'header-desktop-items': {
            primary: {
                primary_center: {
                    0: 'account',
                },
            },
        },
    };
    test.beforeAll( async ( { baseURL } ) => {
		await setCustomizeSettings( iconSize, baseURL );
	} );
    test( 'Account icon size on the front end.', async ({ page }) => {
		await test.step('Account icon size', async () => {
			await page.goto('/');
			const account = await page.locator('.ast-header-account-wrap .account-icon');
			await expect(account).toHaveCSS('width', iconSize[ 'header-account-icon-size' ]);

            const account2 = await page.locator('.ast-header-account-wrap .account-icon');
			await expect(account2).toHaveCSS('height', iconSize[ 'header-account-icon-size' ]);
		});
    } );
} );