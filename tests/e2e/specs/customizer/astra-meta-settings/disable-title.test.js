import {
	createURL,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../utils/customize';

describe( 'site layout meta setting', () => {
	it( 'site layout meta setting', async () => {
		const astraMetaSetting = {
			'site-post-title': 'disabled',
		};
		await setCustomize( astraMetaSetting );
		await createNewPost( {
			postType: 'page',
			title: 'QA',
		} );
		//Astra button setting click action
		await page.waitForSelector(
			'.interface-pinned-items .components-button:not(:first-child)',
		);
		await page.click(
			'.interface-pinned-items .components-button:not(:first-child)',
		);
		//title disable
		await page.evaluate( () => {
			[
				...document.querySelectorAll(
					'.ast-sidebar-layout-meta-wrap .components-toggle-control__label',
				),
			]
				.find( ( element ) => element.textContent === 'Disable Title' )
				.click();
		} );
		await publishPost();
		await page.goto( createURL( '/qa' ), {
			waitUntil: 'networkidle0',
		} );

		await page.waitForSelector( '.page .entry-header' );
		const disableTitle = await page.$eval(
			'.page .entry-header',
			( element ) => element.getAttribute( 'entry-title' ),
		);
		await expect( disableTitle ).toBeNull();
	} );
} );