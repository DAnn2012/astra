import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { setBrowserViewport } from '../../../../utils/set-browser-viewport';
import { setCustomize } from '../../../../utils/customize';
import { publishPost } from '../../../../utils/publish-post';
describe( 'Primary menu settings in the customizer', () => {
	it( 'background image should apply corectly', async () => {
		const primaryMenuImage = {
			'header-menu1-bg-obj-responsive': {
				desktop: {
					'background-image': 'https://pd.w.org/2022/03/96622a0f432e6904.41498035-300x169.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( primaryMenuImage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test-1' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-menu1-bg-obj-responsive' ].desktop[ 'background-image' ] + '")' }` );
	} );
	it( 'background image for mobile and tablet should apply corectly', async () => {
		const primaryMenuImage = {
			'header-mobile-menu-bg-obj-responsive': {
				tablet: {
					'background-image': 'https://pd.w.org/2022/03/96622a0f432e6904.41498035-300x169.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
				mobile: {
					'background-image': 'https://pd.w.org/2022/03/96622a0f432e6904.41498035-300x169.jpeg',
					'background-repeat': 'no-repeat',
					'background-position': 'left top',
					'background-size': 'cover',
					'background-attachment': 'fixed',
					'background-type': 'image',
				},
			},
		};
		await setCustomize( primaryMenuImage );
		let ppStatus = false;
		while ( false === ppStatus ) {
			await createNewPost( { postType: 'page', title: 'test' } );
			ppStatus = await publishPost();
		}
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await setBrowserViewport( 'medium' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-mobile-menu-bg-obj-responsive' ].tablet[ 'background-image' ] + '")' }` );

		await setBrowserViewport( 'small' );
		await page.click( '.main-header-menu-toggle' );
		await page.waitForSelector( '.ast-builder-menu-1 .main-header-menu' );
		await expect( {
			selector: '.ast-builder-menu-1 .main-header-menu',
			property: 'background-image',
		} ).cssValueToBe( `url("${ primaryMenuImage[ 'header-mobile-menu-bg-obj-responsive' ].mobile[ 'background-image' ] + '")' }` );
	} );
} );