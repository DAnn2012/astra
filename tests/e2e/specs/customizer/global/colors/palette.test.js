import { setCustomize } from '../../../../utils/customize';
import { createURL, createNewPost, publishPost } from '@wordpress/e2e-test-utils';
describe( 'Global color palette settings in the customizer', () => {
	it( 'color should be applied correctly', async () => {
		const gcP = {
			'global-color-palette': {
				palette: {
				//	0: 'rgb(82, 6, 224)',
					//1: 'rgb(62, 30, 113)',
					 2: 'rgb(62, 30, 113)',
					// 3: 'rgb(67, 84, 8)',
					// 5: 'rgb(242, 245, 247)',
				},
			},
		};

		await setCustomize( gcP );

		await createNewPost( { postType: 'post', title: 'Test', content: 'TEXT COLOR TEST' } );
		await publishPost();
		await page.goto( createURL( 'Test' ), {
			waitUntil: 'networkidle0',
		} );
		//link color
		// await page.waitForSelector( '.entry-meta, .entry-meta *' );
		// await expect( {
		// 	selector: '.entry-meta, .entry-meta *',
		// 	property: 'color',
		// } ).cssValueToBe( `${ gcP[ 'global-color-palette' ].palette[ 0 ] }` );
		//link hover color
		// await page.hover( '.wp-block-group__inner-container :last-child' );
		// await page.waitForSelector( '.wp-block-group__inner-container :last-child' );
		// await expect( {
		// 	selector: '.wp-block-group__inner-container :last-child',
		// 	property: 'color',
		// } ).cssValueToBe( `${ gcP[ 'global-color-palette' ].palette[ 1 ] }` );

		 //heading color
		await page.waitForSelector( 'h1, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6' );
		await expect( {
			selector: 'h1, .entry-content h1, h2, .entry-content h2, h3, .entry-content h3, h4, .entry-content h4, h5, .entry-content h5, h6, .entry-content h6',
			property: 'color',
		} ).cssValueToBe( `${ gcP[ 'global-color-palette' ].palette[ 2 ] }` );

		// await page.waitForSelector( '#block-2 > form > label' );
		// await expect( {
		// 	selector: '#block-2 > form > label',
		// 	property: 'color',
		// } ).cssValueToBe( `${ gcP[ 'global-color-palette' ].palette[ 3 ] }` );

		// //post bg color
		// await page.waitForSelector( '#respond' );
		// await expect( {
		// 	selector: '#respond',
		// 	property: 'background-color',
		// } ).cssValueToBe( `${ gcP[ 'global-color-palette' ].palette[ 5 ] }` );
	} );
} );
