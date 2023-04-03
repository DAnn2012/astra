import PropTypes from "prop-types";
import { __ } from "@wordpress/i18n";
import { useState } from 'react';
import { Dashicon } from "@wordpress/components";
import parse from 'html-react-parser';

const TypoPresetControl = ( props ) => {
	const { title, options } = props.control.params;

	const [ propsValue, setPropsValue ] = useState( props.control.setting.get() );

	const setCustomizerSetting = ( option, preset ) => {
		if (
			'undefined' !==
			typeof props.customizer.control( "astra-settings[" + option + "]" )
		) {
			props.customizer
				.control("astra-settings[" + option + "]")
				.setting.set( options[ preset ][ option ] );
		}
	};

	const onPresetClick = ( presetKey ) => {
		const bodyFontWeight = options[ presetKey ][ 'body-font-weight' ];
		const headingFontWeight = options[ presetKey ][ 'headings-font-weight' ];

		const fontDropdownOptions = [
			'body-font-family',
			'headings-font-family',
			'body-font-variant',
			'headings-font-variant',
			'font-family-h1',
			'font-family-h2',
			'font-family-h3',
			'font-family-h4',
			'font-family-h5',
			'font-family-h6',
			'font-weight-h1',
			'font-weight-h2',
			'font-weight-h3',
			'font-weight-h4',
			'font-weight-h5',
			'font-weight-h6',
		];

		fontDropdownOptions.forEach( function( option ) {
			// As inherit option value is blank for text transform options, set value to blank for them. For rest options, inherit value will work.
			let optionVal = option.includes( 'text-transform' ) ? '' : 'inherit';

			if ( 'undefined' !== typeof options[ presetKey ][ option ] ) {
				optionVal = options[ presetKey ][ option ];
			}

			let fontOption = 'astra-settings[' + option + ']';
			if( 'body-font-family' === option || 'headings-font-family' === option || 'body-font-variant' === option || 'headings-font-variant' === option ) {
				fontOption = option;
			}

			AstTypography.setOption(
				fontOption,
				optionVal,
				true
			);

			props.customizer.control( 'astra-settings[' + option + ']' ).setting.set( optionVal );
		} );

		const typoOptions = [
			"body-font-family",
			"headings-font-family",
			"font-size-body",
			"font-size-h1",
			"font-size-h2",
			"font-size-h3",
			"font-size-h4",
			"font-size-h5",
			"font-size-h6",
			"font-size-page-title",
		];

		typoOptions.forEach(function (option) {
			setCustomizerSetting(option, presetKey);
		});

		const updateTypoEvent = new CustomEvent("AstRemoteUpdateState", {
			detail: "typography",
		});
		document.dispatchEvent(updateTypoEvent);

		AstTypography.setOption(
			"body-font-weight",
			bodyFontWeight,
			false
		);
		AstTypography.setOption(
			"headings-font-weight",
			headingFontWeight,
			false
		);

		setPropsValue(presetKey);
		props.control.setting.set(presetKey);
	};

	const generateToolTipText = ( preset ) => {
		let tooltipText = options[ preset ][ 'headings-font-family' ] + ' / ' + options[ preset ][ 'body-font-family' ];

		// Remove sans-serif string.
		tooltipText = tooltipText.replace( /, sans-serif/g, '' );

		// Remove serif string.
		tooltipText = tooltipText.replace( /, serif/g, '' );

		// Remove all single quotes.
		tooltipText = tooltipText.replace( /['"]+/g, '' );

		return tooltipText;
	};

	const SingleList = ( props ) => {
		return (
			<li
				className={
					"ast-typo-preset-item " +
					(propsValue === props.preset ? "active" : "")
				}
				key={props.preset}
				onClick={() => onPresetClick(props.preset)}
			>
				{parse(window.svgIcons[props.preset])}
				<span className="ast-typopreset-custom-tooltip" data-title={ generateToolTipText(props.preset ) }></span>
			</li>

		);
	};

	const List = ({ className, options, selected }) => {
		return (
			<ul className={`ast-font-selector ${className}`}>
				{Object.entries(options).map(([presetKey, item], uniqueKey) => {
					return (
						<SingleList preset={presetKey} key={uniqueKey} />
					);
				})}
			</ul>
		);
	};

	const onResetClick = () => {
		const defaulHeadingFontFamily = props.customizer.control(
			"astra-settings[headings-font-family]"
		).params.default;
		AstTypography.setOption(
			"astra-settings[headings-font-family]",
			defaulHeadingFontFamily,
			true
		);

		const defaulBodyFontFamily = props.customizer.control(
			"astra-settings[body-font-family]"
		).params.default;
		AstTypography.setOption(
			"astra-settings[body-font-family]",
			defaulBodyFontFamily,
			true
		);

		const options = [
			"body-font-family",
			"headings-font-family",
			"font-size-body",
			"font-size-h1",
			"font-size-h2",
			"font-size-h3",
			"font-size-h4",
			"font-size-h5",
			"font-size-h6",
			"font-size-page-title",
		];

		options.forEach(function (option) {
			const defaultVal = props.customizer.control(
				"astra-settings[" + option + "]"
			).params.default;
			props.customizer
				.control("astra-settings[" + option + "]")
				.setting.set(defaultVal);
		});

		// Reset Preset Option.
		setPropsValue("");
		props.control.setting.set("");
	};

	const renderResetBtn = () => {
		const resetFlag = '' !== props.control.setting.get() ? false : true;

		return (
			<button
				className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
				disabled={ resetFlag }
				onClick={ ( e ) => {
					e.preventDefault();
					onResetClick();
				} }
			>
				<Dashicon icon="image-rotate" />
			</button>
		);
	};

	return (
		<>
			<label>
				<span className="customize-control-title">{title}</span>
			</label>

			<List
				className="ast-typo-presets"
				options={ options }
				selected={ propsValue }
			/>

			<div className="ast-reset-btn-preset-wrap">{renderResetBtn()}</div>
		</>
	);
};

TypoPresetControl.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo(TypoPresetControl);
