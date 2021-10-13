/**
 * WordPress dependencies
 */
import {
	insertBlock,
	clickBlockAppender,
	getEditedPostContent,
	createNewPost,
} from '@wordpress/e2e-test-utils';

describe( 'Code', () => {
	beforeEach( async () => {
		await createNewPost();
	} );

	it( 'can be created by three backticks and enter', async () => {
		await clickBlockAppender();
		await page.keyboard.type( '```' );
		await page.keyboard.press( 'Enter' );
		await page.keyboard.type( '<?php' );

		expect( await getEditedPostContent() ).toMatchSnapshot();
		await page.waitForSelector( '.block-editor-block-list__block' );
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'margin-top',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor pre',
			property: 'margin-bottom',
		} ).cssValueToBe( `24px` );
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'margin-left',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.editor-styles-wrapper .block-editor-block-list__layout.is-root-container > *',
			property: 'margin-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor .block-editor-block-list__block',
			property: 'padding-right',
		} ).cssValueToBe( `0px` );
		await expect( {
			selector: '.edit-post-visual-editor pre.wp-block',
			property: 'padding-left',
		} ).cssValueToBe( `20px` );
		await expect( {
			selector: '.edit-post-visual-editor pre',
			property: 'padding-top',
		} ).cssValueToBe( `24px` );
		await expect( {
			selector: '.edit-post-visual-editor pre',
			property: 'padding-bottom',
		} ).cssValueToBe( `24px` );
	} );
} );
