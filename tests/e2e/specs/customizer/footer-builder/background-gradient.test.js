import { createURL } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';
import { setBrowserViewport } from '../../../utils/set-browser-viewport';
import { scrollToElement } from '../../../utils/scroll-to-element';
describe( 'footer builder background gradient setting in customizer', () => {
	it( 'background gradient should apply correctly', async () => {
		const footerBuilder = {
			'section-footer-builder-layout-padding': 60,
			'footer-bg-obj-responsive': {
				desktop: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				tablet: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
				mobile: {
					'background-color': 'linear-gradient(135deg, rgb(6, 147, 227) 31%, rgb(155, 81, 224) 64%)',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'contain',
					'background-attachment': 'fixed',
					'background-type': 'gradient',
				},
			},
			'footer-desktop-items': {
				primary: {
					primary_1: {
						0: 'social-icons-1',
					},
				},
			},
		};
		await setCustomize( footerBuilder );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'large' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-footer' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`${ footerBuilder[ 'footer-bg-obj-responsive' ].desktop[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'medium' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-footer' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`${ footerBuilder[ 'footer-bg-obj-responsive' ].tablet[ 'background-color' ] }`,
		);
		await setBrowserViewport( 'small' );
		await scrollToElement( '#colophon' );
		await page.waitForSelector( '.site-footer' );
		await expect( {
			selector: '.site-footer',
			property: 'background-image',
		} ).cssValueToBe(
			`${ footerBuilder[ 'footer-bg-obj-responsive' ].mobile[ 'background-color' ] }`,
		);
	} );
} );
