export const getCssProperty = async ( cssSelector, property ) => {
	return await page.$eval(
		cssSelector,
		( el, prop, pseudoEl ) =>
			window
				.getComputedStyle( el, pseudoEl || null )
				.getPropertyValue( prop ),
		property,
	);
};
