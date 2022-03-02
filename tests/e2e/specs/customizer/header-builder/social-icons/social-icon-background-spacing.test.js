import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Social Icons in the customizer', () => {
	it( 'social icon background spacing should apply correctly', async () => {
		const socialIconbackSpacing = {
			'header-social-1-bg-space': '48px',
			'header-desktop-items': {
				primary: {
					primary_center: {
						0: 'social-icons-1',

					},
				},
			},
		};
		await setCustomize( socialIconbackSpacing );

		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element' );

		await expect( {
			selector: '.ast-header-social-1-wrap .header-social-inner-wrap .ast-builder-social-element',
			property: 'padding',
		} ).cssValueToBe( `${ socialIconbackSpacing[ 'header-social-1-bg-space' ] }`,
		);
	} );
} );
