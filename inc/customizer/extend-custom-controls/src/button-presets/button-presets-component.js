import PropTypes from "prop-types";
import { __ } from "@wordpress/i18n";
import { useState } from "react";
import { Dashicon } from '@wordpress/components';

const ButtonPresetsComponent = (props) => {
	const { title, options } = props.control.params;
	const defaultValue = props.control.params.default;
	const value = props.control.setting.get();
	const option = props.control.params.name;

	const [state, setState] = value ? useState(value) : useState( defaultValue );

	const onChangePreset = ( presetKey ) => {

		const buttonRadiusFields = options[ presetKey ][ 'button-radius-fields' ];
		const btnBackgroundColor = options[ presetKey ][ 'button-bg-color' ];
		const borderWidth = options[ presetKey ][ 'border-size' ];
		const padding = options[ presetKey ][ 'button-padding' ];

		// Padding
		props.customizer
			.control( 'astra-settings[theme-button-padding]' )
			.setting.set( padding );

		props.customizer
			.control( 'astra-settings[theme-button-padding]' )
			.renderContent();

		// Button Radius.
		props.customizer
			.control( 'astra-settings[button-radius-fields]' )
			.setting.set( buttonRadiusFields );

		props.customizer
			.control( 'astra-settings[button-radius-fields]' )
			.renderContent();

		// Border size.
		props.customizer
			.control( 'astra-settings[theme-button-border-group-border-size]' )
			.setting.set( borderWidth );

		setState( presetKey );
		props.control.setting.set( presetKey );

		const event = new CustomEvent( 'AstRemoteUpdateState', {
			detail: 'btn-preset',
		} );
		document.dispatchEvent( event );
	};

	const onResetClick = () => {
		const btnOptions = [
			'button-radius-fields',
			'theme-button-border-group-border-size',
			'theme-button-padding',
			'button-bg-color',
			'button-color',
			'button-h-color',
			'button-bg-h-color'
		];

		btnOptions.forEach( function( btnOption ) {
			const defaultVal = props.customizer.control( 'astra-settings[' + btnOption + ']' ).params.default;
			props.customizer.control( 'astra-settings[' + btnOption + ']' ).setting.set( defaultVal );
		} );

		// Reset Preset Option.
		setState( '' );
		props.control.setting.set( '' );

		const event = new CustomEvent( 'AstRemoteUpdateState', {
			detail: 'btn-preset',
		});
		document.dispatchEvent( event );
	};

	const renderBtnPresetHtml = () => {
		const htmlContent = Object.entries(options).map(([key, presetData]) => {
			return (
				<div
					className={
						"ast-btn-style-item " + (state === key ? "active" : "")
					}
					key={key}
					dangerouslySetInnerHTML={{
						__html: window.svgIcons[presetData.src],
					}}
					onClick={() => onChangePreset(key)}
				></div>
			);
		});

		return htmlContent;
	};

	const renderResetBtn = () => {

		let resetFlag = '' != props.control.setting.get() ? false : true;

		return <button className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small" disabled={ resetFlag } onClick={ e => {
			e.preventDefault();
			onResetClick();
		}}>
		<Dashicon icon='image-rotate'/>
		</button>;
	}

	return (
		<>
			<label>
				<span className="customize-control-title">{title}</span>
			</label>
			<div className="ast-btn-preset-wrap">{renderBtnPresetHtml()}</div>

			<div className="ast-reset-btn-preset-wrap">
				{renderResetBtn()}
			</div>
		</>
	);
};

ButtonPresetsComponent.propTypes = {
	control: PropTypes.object.isRequired,
};

export default React.memo(ButtonPresetsComponent);
