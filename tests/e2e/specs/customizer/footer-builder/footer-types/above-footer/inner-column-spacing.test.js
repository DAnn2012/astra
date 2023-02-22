import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../../../utils/scroll-to-element';
describe( 'Above footer inner column spacing setting in customizer', () => {
	it( 'inner column spacing should apply correctly', async () => {
		const innerColumnSpacing = {
			'hba-footer-column': 2,
			'hba-inner-spacing':
			{
				desktop: '90',
				tablet: '70',
				mobile: '40',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'footer-desktop-items': {
				above: {
					above_1: {
						0: 'social-icons-1',
					},
					above_2: {
						0: 'html-1',
					},
				},
			},
		};
		await setCustomize( innerColumnSpacing );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hba-inner-spacing' ].desktop }${ innerColumnSpacing[ 'hba-inner-spacing' ][ 'desktop-unit' ] }` );

		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hba-inner-spacing' ].tablet }${ innerColumnSpacing[ 'hba-inner-spacing' ][ 'tablet-unit' ] }` );

		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await expect( {
			selector: '.site-above-footer-wrap[data-section="section-above-footer-builder"] .ast-builder-grid-row',
			property: 'grid-column-gap',
		} ).cssValueToBe( `${ innerColumnSpacing[ 'hba-inner-spacing' ].mobile }${ innerColumnSpacing[ 'hba-inner-spacing' ][ 'mobile-unit' ] }` );
	} );
} );
