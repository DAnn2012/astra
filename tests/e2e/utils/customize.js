import fetch from 'node-fetch';
import { visitAdminPage } from '@wordpress/e2e-test-utils';

export const openCustomizer = async () => {
	await visitAdminPage( 'customize.php' );
	await page.waitForSelector( '#accordion-panel-panel-global' );
}

export const openCustomizeSection = async ( sectionName ) => {
	await page.click( `#${sectionName}` );
}

export const setCustomize = async ( data ) => {
	return await fetch( 'http://localhost:8890/wp-json/astra/v1/e2e-utils/set-astra-settings', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify( { 'settings': data } )
	});
}
