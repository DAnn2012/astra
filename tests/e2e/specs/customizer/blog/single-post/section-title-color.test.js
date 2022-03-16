import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Section title color option under the customizer', () => {
	it( 'section title color option should apply correctly', async () => {
		const titleColor = {
			'enable-related-posts': 1,
			'related-posts-title-color': 'rgb(228, 25, 25)',
		};
		await setCustomize( titleColor );
		await createNewPost( { postType: 'post', title: 'sample-post' } );
		await publishPost();

		await createNewPost( { postType: 'post', title: 'test-post' } );
		await publishPost();

		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );
		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );
		await page.waitForSelector( ' .ast-separate-container .ast-single-related-posts-container ' );
		await expect( {
			selector: '.ast-related-posts-title',
			property: 'color',
		} ).cssValueToBe( `${ titleColor[ 'related-posts-title-color' ] }` );
	} );
} );
