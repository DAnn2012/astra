import { insertBlock, createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Global button font setting under the Customizer', () => {
	it( 'button font weight should apply correctly', async () => {
		const fontWeight = {
			'font-weight-button': '400',
		};
		await setCustomize( fontWeight );
		await page.goto( createURL( 'buttonFontFamily' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-custom-button, .wp-block-button .wp-block-button__link, input#submit, input[type="submit"]' );
		await expect( {
			selector: '.ast-custom-button, .wp-block-button .wp-block-button__link, input#submit, input[type="submit"]',
			property: 'font-weight',
		} ).cssValueToBe( `${ fontWeight[ 'font-weight-button' ] }` );
	} );
} );
