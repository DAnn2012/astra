import { getCssProperty } from './get-css-property';
import { getCustomizerSettings } from './customize';
import { PREDEFINED_DIMENSIONS } from './set-browser-viewport';
import { remToPixels } from './rem-to-pixel';

export const getCurrentDeviceSize = async () => {
	const screenWidth = await page.evaluate( () => {
		return window.innerWidth;
	} );

	for ( const size in PREDEFINED_DIMENSIONS ) {
		if ( PREDEFINED_DIMENSIONS[ size ].width === screenWidth ) {
			return size;
		}
	}
};

/**
 * Convert font-size set in the customizer to its appropriate responsive value.
 *
 * Astra applies the responsive font sizes a bit differently -
 * Any unit that you apply in the customizer, Astra converts it to `rem` when applying the font size.
 *
 * Astra also reduces the font size of the <html> element on tablet and mobile devices,
 * which affects the actual value that is applied by the browser in the frontend.
 *
 * This function can be used when testing responsive font sizes in e2e tests.
 * This will find the difference in the values set in the customizer and actually applied in the frontend by the browser.
 *
 * @param {string} fontSize - The font-size to be converted to the responsive.
 * @return {string} Font size in px.
 */
export const responsiveFontSize = async ( fontSize ) => {
	// Get body font size set in the customizer.
	const bodyFontSize = await getCustomizerSettings( 'font-size-body' );
	const htmlFontSize = await getCssProperty( 'html', 'font-size' );
	const htmlFontSizeNumber = Number( htmlFontSize.replace( 'px', '' ) );
	const device = await getCurrentDeviceSize();

	// Generate rem value from the font-size in px.
	// This replicates the logic used to generate the rem value in the frontend.
	// see https://github.com/brainstormforce/astra/blob/7037b4ecfb64c7870c698af6f973f6e4a29bc01f/inc/core/common-functions.php#L169-L177.
	const bodyFontDesktop = bodyFontSize.settings.desktop;
	const bodyFontTablet =
		bodyFontSize.settings.tablet !== ''
			? bodyFontSize.settings.tablet
			: bodyFontDesktop;
	const bodyFontMobile =
		bodyFontSize.settings.mobile !== ''
			? bodyFontSize.settings.mobile
			: bodyFontTablet;
	let bodyFontSizeNumber;

	if ( device === 'large' ) {
		bodyFontSizeNumber = bodyFontDesktop;
	} else if ( device === 'medium' ) {
		bodyFontSizeNumber = bodyFontTablet;
	} else if ( device === 'small' ) {
		bodyFontSizeNumber = bodyFontMobile;
	}

	const fontSizeRem = fontSize / bodyFontSizeNumber;

	// The generated rem value is affected by the font-size set to the html element.
	// We find out the px value of the rem font-size.
	return remToPixels( fontSizeRem, htmlFontSizeNumber );
};
