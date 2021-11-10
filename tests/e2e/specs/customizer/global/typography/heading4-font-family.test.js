import {
	createURL,
	createNewPost,
	setPostContent,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { TPOGRAPHY_TEST_POST_CONTENT } from '../../../../utils/post';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { responsiveFontSize } from '../../../../utils/responsive-utils';

describe( 'Global typography heading 4 settings in the customizer', () => {
	it( 'heading 4 font family settings should be applied correctly', async () => {
		const heading4Font = {
			'font-family-h4': "'Eagle Lake', handwriting",
			'font-weight-h4': '400',
			'text-transform-h4': 'uppercase',
			'font-size-h4': {
				desktop: '50',
				tablet: '50',
				mobile: '50',
				'desktop-unit': 'px',
				'tablet-unit': 'px',
				'mobile-unit': 'px',
			},
			'line-height-h4': '3px',
		};

		await setCustomize( heading4Font );

		await createNewPost( { postType: 'post', title: 'heading-4' } );
		await setPostContent( TPOGRAPHY_TEST_POST_CONTENT );
		await publishPost();
		await page.goto( createURL( 'heading-4' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( 'h4, .entry-content h4' );
		await expect( {
			selector: 'h4, .entry-content h4',
			property: 'font-family',
		} ).cssValueToBe( `${ heading4Font[ 'font-family-h4' ] }` );

		await expect( {
			selector: 'h4, .entry-content h4',
			property: 'font-weight',
		} ).cssValueToBe( `${ heading4Font[ 'font-weight-h4' ] }` );

		await expect( {
			selector: 'h4, .entry-content h4',
			property: 'text-transform',
		} ).cssValueToBe( `${ heading4Font[ 'text-transform-h4' ] }` );

		await expect( {
			selector: 'h4, .entry-content h4',
			property: 'font-size',
		} ).cssValueToBe(
			`${ heading4Font[ 'font-size-h4' ].desktop }${ heading4Font[ 'font-size-h4' ][ 'desktop-unit' ] }`,
		);
		await setBrowserViewport( 'medium' );

		await expect( {
			selector: 'h4, .entry-content h4',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				heading4Font[ 'font-size-h4' ].tablet,
			) }${
				heading4Font[ 'font-size-h4' ][ 'tablet-unit' ]
			}`,
		);
		await setBrowserViewport( 'small' );

		await expect( {
			selector: 'h4, .entry-content h4',
			property: 'font-size',
		} ).cssValueToBe(
			`${ await responsiveFontSize(
				heading4Font[ 'font-size-h4' ].mobile,
			) }${
				heading4Font[ 'font-size-h4' ][ 'mobile-unit' ]
			}`,
		);

		await expect( {
			selector: 'h4, .entry-content h4',
			property: 'line-height',
		} ).cssValueToBe( `${ heading4Font[ 'line-height-h4' ] }` );
	} );
} );
