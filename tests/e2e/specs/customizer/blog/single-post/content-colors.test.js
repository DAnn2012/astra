import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'Section Content color option under the customizer', () => {
	it( 'content color option should apply correctly', async () => {
		const contentcolor = {
			'enable-related-posts': 'true',
			'related-posts-text-color': 'rgb(138, 13, 0)',
			'related-posts-meta-color': 'rgb(138, 13, 0)',
			'related-posts-meta-link-hover-color': 'rgb(13, 65, 189)',
		};
		await setCustomize( contentcolor );
		await createNewPost( {
			postType: 'post',
			title: 'sample-post',

		} );
		await publishPost();

		await createNewPost( {
			postType: 'post',
			title: 'test-post',

		} );
		await publishPost();

		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.waitForSelector( '.ast-related-post-content .entry-header .ast-related-post-title a' );
		await expect( {
			selector: '.ast-related-post-content .entry-header .ast-related-post-title a',
			property: 'color',
		} ).cssValueToBe( `${ contentcolor[ 'related-posts-text-color' ] }`,
		);

		await expect( {
			selector: ' .ast-related-post-content .entry-meta *',
			property: 'color',
		} ).cssValueToBe( `${ contentcolor[ 'related-posts-meta-color' ] }`,
		);
		await page.goto( createURL( 'test-post' ), {
			waitUntil: 'networkidle0',
		} );

		await page.evaluate( () => {
			window.scrollBy( 0, window.innerHeight );
		} );

		await page.hover( '#main > div.ast-single-related-posts-container > div.ast-related-posts-wrapper > article > div > div > header > div > span.comments-link > a' );
		await page.waitForSelector( '.ast-related-post-content .entry-header .ast-related-post-title a' );
		await expect( {
			selector: '.ast-related-post-content .entry-meta a:hover',
			property: 'color',
		} ).cssValueToBe( `${ contentcolor[ 'related-posts-meta-link-hover-color' ] }` );
	} );
} );