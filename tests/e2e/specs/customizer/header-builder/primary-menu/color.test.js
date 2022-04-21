import { createURL, createNewPost } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
import { createNewMenu } from '../../../../utils/create-menu';
describe( 'Primary menu setting in customizer', () => {
	it( 'primary menu color should apply correctly', async () => {
		await createNewMenu();
		const primaryMenuColor = {
			'header-menu1-color-responsive': {
				desktop: 'rgb(11, 129, 52)',
			},
		};
		await setCustomize( primaryMenuColor );
		// let ppStatus = false;
		// while ( false === ppStatus ) {
		// 	await createNewPost( { postType: 'page', title: 'test' } );
		// 	ppStatus = await publishPost();
		// }
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '#ast-hf-menu-1 .menu-item > a' );
		await expect( {
			selector: '#ast-hf-menu-1 .menu-item > a',
			property: 'color',
		} ).cssValueToBe( `${ primaryMenuColor[ 'header-menu1-color-responsive' ].desktop }` );
	} );

	it( 'primary menu active color should apply correctly', async () => {
		const primaryMenuColor = {
			'header-menu1-a-color-responsive': {
				desktop: 'rgb(131, 15, 166)',
			},
		};
		await setCustomize( primaryMenuColor );
		// let ppStatus = false;
		// while ( false === ppStatus ) {
		// 	await createNewPost( { postType: 'page', title: 'test-1' } );
		// 	ppStatus = await publishPost();
		// }
		await page.goto( createURL( 'test-page' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-builder-menu-1 .menu-item.current-menu-item > .menu-link' );
		await expect( {
			selector: '.ast-builder-menu-1 .menu-item.current-menu-item > .menu-link',
			property: 'color',
		} ).cssValueToBe( `${ primaryMenuColor[ 'header-menu1-a-color-responsive' ].desktop }` );
	} );
} );
