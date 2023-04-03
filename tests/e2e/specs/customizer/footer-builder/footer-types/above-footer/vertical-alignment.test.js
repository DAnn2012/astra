import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer vertical alignment setting in customizer', () => {
	it( 'verical alignment should apply correctly', async () => {
		const verticalAlignment = {
			'footer-copyright-editor': 'Copyright [copyright] [current_year] [site_title] | Powered by WP_ASTRA',
			'hba-footer-column': 3,
			'hba-footer-vertical-alignment': 'flex-end',
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
					above_2: {
						0: 'copyright',
					},
				},
			},
		};
		await setCustomize( verticalAlignment );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'align-items',
		} ).cssValueToBe( `${ verticalAlignment[ 'hba-footer-vertical-alignment' ] }` );
	} );
} );
