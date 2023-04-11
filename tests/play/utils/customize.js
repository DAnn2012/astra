const { expect } = require( '@playwright/test' );
const fetch = require( 'node-fetch' );

export const setCustomizeSettings = async ( data, baseURL ) => {
	const response = await fetch(
		baseURL + 'wp-json/astra/v1/e2e-utils/set-astra-settings',
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify( { settings: data } ),
		},
	);
	expect( response.ok ).toBeTruthy();
};

export const getCustomizerSettings = async ( key ) => {
	return await window
		.fetch(
			createURL( `/wp-json/astra/v1/e2e-utils/get-astra-settings` ) +
				`?key=${ key }`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			},
		)
		.then( ( response ) => response.json() );
};
