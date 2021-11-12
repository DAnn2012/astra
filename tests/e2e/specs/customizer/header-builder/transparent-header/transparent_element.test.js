import { createURL, setBrowserViewport } from '@wordpress/e2e-test-utils';
import { setCustomize } from '../../../../utils/customize';
describe( 'transparent header element in the customizer', () => {
	it( 'transparent header element should apply correctly', async () => {
		const transparentElementSettings = {
			'transparent-header-enable': true,
			'header-desktop-items': {
				below: {
					below_center: {
						0: 'social-icons-1',
						1: 'search',
						2: 'html-1',
						3: 'account',
						4: 'button-1',
					},
				},
			},
			'header-mobile-items': {
				below: {
					below_center: {
						0: 'social-icons-1',
						1: 'search',
						2: 'html-1',
						3: 'account',
						4: 'button-1',
					},
				},
			},
			'transparent-header-social-icons-color': {
				desktop: 'rgb(201, 54, 54)',
				tablet: 'rgb(201, 54, 54)',
				mobile: 'rgb(201, 54, 54)',
			},
			'transparent-header-social-icons-bg-color': {
				desktop: 'rgb(125, 86, 86)',
				tablet: 'rgb(234, 234, 234)',
				mobile: 'rgb(234, 234, 234)',
			},
			'transparent-header-search-icon-color': 'rgb(1, 112, 185)',
			'transparent-header-button-text-color': 'rgb(227, 41, 41)',
			'transparent-header-button-bg-color': 'rgb(225, 187, 187)',
			'transparent-account-icon-color': 'rgb(237, 40, 40)',
			'transparent-header-toggle-btn-color': 'rgb(222, 28, 28)',
			'transparent-header-html-text-color': 'rgb(75, 79, 88)',
		};
		await setCustomize( transparentElementSettings );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		//to test social icon text color
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-color' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-color' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element svg',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-color' ].mobile }`,
		);
		//to test social icon background color
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].desktop }`,
		);
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].tablet }`,
		);
		await setBrowserViewport( 'small' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-social-wrap .ast-social-color-type-custom .ast-builder-social-element',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-social-icons-bg-color' ].mobile }`,
		);
		//to test search icon color
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-search .ast-icon',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-search-icon-color' ] }`,
		);
		//to test button text color
		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-button-"] .ast-custom-button',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-button-text-color' ] }`,
		);
		//to test button background color
		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-button-"] .ast-custom-button',
			property: 'background-color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-button-bg-color' ] }`,
		);
		//to test account icon color
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg path:not(.ast-hf-account-unfill), .ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-type-icon .ahfb-svg-iconset svg circle',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-account-icon-color' ] }`,
		);
		// to test toggle icon color
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .mobile-menu-toggle-icon .ast-mobile-svg',
			property: 'fill',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-toggle-btn-color' ] }`,
		);
		//to test HTML text color
		await setBrowserViewport( 'large' );
		await expect( {
			selector: '.ast-theme-transparent-header [CLASS*="ast-header-html-"] .ast-builder-html-element',
			property: 'color',
		} ).cssValueToBe(
			`${ transparentElementSettings[ 'transparent-header-html-text-color' ] }`,
		);
	} );
	it( 'transparent header remaining element should apply correctly', async () => {
		const transElementSettings = {
			'transparent-header-enable': true,
			'header-desktop-items': {
				below: {
					below_center: {
						0: 'account',
					},
				},
			},
			'header-account-login-style': 'Text',
			'transparent-account-type-text-color': 'rgb(201, 54, 54)',
			'mobile-header-toggle-btn-style': 'fill',
			'header-toggle-btn-bg-color': 'rgb(25, 219, 24)',
		};
		await setCustomize( transElementSettings );
		await page.goto( createURL( '/' ), {
			waitUntil: 'networkidle0',
		} );
		//to test account text color
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-text',
			property: 'color',
		} ).cssValueToBe(
			`${ transElementSettings[ 'transparent-account-type-text-color' ] }`,
		);
		//to test toggle button background color
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header .ast-header-account-wrap .ast-header-account-text',
			property: 'color',
		} ).cssValueToBe(
			`${ transElementSettings[ 'transparent-account-type-text-color' ] }`,
		);
	} );
	it( 'transparent header account border should apply correctly', async () => {
		const transElementSet = {
			'transparent-header-enable': true,
			'mobile-header-toggle-btn-style': 'outline',
			'transparent-header-toggle-border-color': 'rgb(56, 212, 127)',
		};
		//to test toggle button border color
		await setBrowserViewport( 'medium' );
		await expect( {
			selector: '.ast-theme-transparent-header [data-section="section-header-mobile-trigger"] .ast-button-wrap .ast-mobile-menu-trigger-outline',
			property: 'border-color',
		} ).cssValueToBe(
			`${ transElementSet[ 'transparent-header-toggle-border-color' ] }`,
		);
	} );
} );
