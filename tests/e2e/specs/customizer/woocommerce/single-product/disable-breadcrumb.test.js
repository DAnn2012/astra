import {
	createURL,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
import { wooCommercePage } from '../../../../utils/product-page';
describe( 'disable breadcrumb on single product page', () => {
	it( 'breadcrumb should be disable on single product page', async () => {
		const disableBreadcrumb = {
			'single-product-breadcrumb-disable': 1,
		};
		await setCustomize( disableBreadcrumb );
		await wooCommercePage();
		await page.goto( createURL( '/product/album' ), {
			waitUntil: 'networkidle0',
		} );
		const breadcrumbClass = await page.evaluate( () => {
			// !! converts to boolean value
			return !! document.querySelector( '.woocommerce-breadcrumb' ); 
		} );
		if ( breadcrumbClass ) {
			console.log( 'True' );
		} else {
			console.log( 'False' );
		}
		await expect( breadcrumbClass ).toBe( false );
	} );
} );