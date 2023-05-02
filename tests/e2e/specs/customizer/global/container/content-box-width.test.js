import { createURL, createNewPost, insertBlock } from '@wordpress/e2e-test-utils';
import { publishPost } from '../../../../utils/publish-post';
import { setCustomize } from '../../../../utils/customize';
describe( 'to test content box container width in the customizer', () => {
	it( 'content box container width should apply correctly on  archive posts', async () => {
		const archiveContainerSize = {
			'site-content-width': 900,
			'site-content-layout': 'content-boxed-container',
			'archive-post-content-layout': 'content-boxed-container',
		};
		await setCustomize( archiveContainerSize );
		await page.goto( createURL( '/category/uncategorized' ), {
			waitUntil: 'networkidle0',
		} );
		await page.waitForSelector( '.ast-container' );
		archiveContainerSize[ 'site-content-width' ] = '940px';
		await expect( {
			selector: '.ast-container',
			property: 'max-width',
		} ).cssValueToBe( `${ archiveContainerSize[ 'site-content-width' ] }` );
	} );
} );
