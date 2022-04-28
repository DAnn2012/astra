import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../../../utils/customize';
import { setBrowserViewport } from '../../../../../../utils/set-browser-viewport';
import { publishPost } from '../../../../../../utils/publish-post';
describe( 'Off canvas menu background color settings in the customizer', () => {
	it( 'background color should apply correctly for after header', async () => {
		const offCanvasBgColor = {
			'header-mobile-menu-bg-obj-responsive': {
				desktop: {
					'background-color': '',
					'background-repeat': '',
					'background-position': '',
					'background-size': '',
					'background-attachment': '',
				},
				tablet: {
					'background-color': 'rgb(239, 239, 239)',
					'background-repeat': 'repeat',
					'background-position': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
				},
				mobile: {
					'background-color': 'rgb(239, 240, 237)',
					'background-repeat': 'repeat',
					'background-position': 'center center',
					'background-size': 'auto',
					'background-attachment': 'scroll',
				},
			},
		};
		await setCustomize( offCanvasBgColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'page', title: 'test-2' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ offCanvasBgColor[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .main-header-menu',
			property: 'background-color',
		} ).cssValueToBe( `${ offCanvasBgColor[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-color' ] }` );
	} );

	it( 'active background color should apply correctly for after header', async () => {
		const offCanvasBgColor = {
			'header-mobile-menu-a-bg-color-responsive': {
				desktop: '',
				tablet: 'rgb(255, 227, 227)',
				mobile: 'rgb(249, 235, 249)',
			},
		};
		await setCustomize( offCanvasBgColor );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
			await createNewPost( { postType: 'page', title: 'test-2' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/test-1' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ offCanvasBgColor[ 'header-mobile-menu-a-bg-color-responsive' ].tablet[ 'background-color' ] }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-mobile .main-navigation .menu-item.current-menu-item > .menu-link',
			property: 'background-color',
		} ).cssValueToBe( `${ offCanvasBgColor[ 'header-mobile-menu-a-bg-color-responsive' ].mobile[ 'background-color' ] }` );
	} );
} );
