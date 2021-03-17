import PropTypes from 'prop-types';
import {useState} from 'react';
import {Dashicon, Popover, Button} from '@wordpress/components';
import AstraColorPickerControl from '../common/astra-color-picker-control';
import { __ } from '@wordpress/i18n';

const Background = props => {
	var dbValue= props.control.setting.get();
	var tempDbValue = Object.assign({},dbValue);

	let value
	if(tempDbValue['background-color'] && tempDbValue['background-color'].includes("palette")){
		var regex = /\d+/g;
		var string = tempDbValue['background-color'];
		var matches = string.match(regex);
		var updated_palette = props.customizer.control('astra-settings[global-color-palette]').setting.get()		
		tempDbValue['background-color'] = updated_palette[updated_palette.patterntype][matches][0]
		value = tempDbValue
	}else{		
		 value = props.control.setting.get();
	}

	const isVisible = false
	const [props_value, setPropsValue] = useState(value,isVisible);

	const updateBackgroundType = () => {
		let obj = {
			...props_value
		};

		if (props_value['background-type']) {
			if (props_value['background-color']) {
				obj['background-type'] = 'color';
				props.control.setting.set(obj);
				setPropsValue( obj );

				if (props_value['background-color'].includes('gradient')) {
					obj['background-type'] = 'gradient';
					props.control.setting.set(obj);
					setPropsValue( obj );
				}
			}

			if (props_value['background-image']) {
				obj['background-type'] = 'image';
				props.control.setting.set(obj);
				setPropsValue( obj );
			}
		}
	};

	const updatePaletteuse = (value,index,defaultset) =>{
		
		props.control.container[0].setAttribute('paletteused', value);
		props.control.container[0].setAttribute('paletteindex', index);		
		props.control.container[0].setAttribute('defaultset', defaultset);		

	}

	var globalPalette = props.customizer.control('astra-settings[global-color-palette]').setting.get()

	const handleGlobalColorPopupBtn = (value,index,defaultset,colorvalue) => {
		
		updatePaletteuse(value,index,defaultset)
		var tempDbValue = Object.assign({},props_value);

		tempDbValue['background-color'] = colorvalue;
		tempDbValue['background-type'] = 'color';
		
		const finalvalue = Object.assign({}, tempDbValue)

		setPropsValue( finalvalue );

		if(props.control.container[0].getAttribute('paletteindex')){	
			tempDbValue['background-color'] = 'var(--ast-global-palette'+props.control.container[0].getAttribute('paletteindex')+')';
			props.control.setting.set(tempDbValue);
		}else{
			props.control.setting.set(tempDbValue);
		}
		
	}

	const toggleClose = () => {
		setPropsValue(prevState => ({
			...prevState,
			isVisible: !props_value.isVisible
		}));
	};

	var paletteSelectedIndex = ''
	if(tempDbValue['background-color'] && tempDbValue['background-color'].includes("palette")){
		var regex = /\d+/g;
		var string = tempDbValue['background-color'];
		paletteSelectedIndex = string.match(regex)[0];	
	}

	const renderReset = () => {
		return <span className="customize-control-title">
			<div className="ast-global-color-btn-wrap">
					<button	className="ast-global-color-btn components-button is-secondary" 
					onClick={e => {
						e.preventDefault();
						setPropsValue(prevState => ({
							...prevState,
							isVisible: !props_value.isVisible
						}));
					}}>
						<Dashicon icon='admin-site-alt3' style={{
							width: 14,
							height: 14,
							fontSize: 14
						}}/>
					</button>
					{ props_value.isVisible && (
						<Popover position={"bottom center"} onClose={ toggleClose } className="ast-global-palette-popup">
							<label className="ast-global-color-palette-manage-label">{ __( 'Global Colors','astra' ) }</label>
							<Button
								className='ast-global-color-palette-manage'
								onClick={ () =>props.customizer.control('astra-settings[global-color-palette]').focus() }
								tabIndex={ 0 }
							>
								<Dashicon icon='admin-generic' style={{
									width: 12,
									height: 12,
									fontSize: 12
								}}/>
							</Button>
							<hr/>
							{ Object.keys( globalPalette.pattern1 ).map( ( item, index ) => { 
													
								return ( 
									<Button
										className='ast-global-color-individual-btn'
										onClick={ () =>handleGlobalColorPopupBtn( true,index,'no',globalPalette.pattern1[item][0] ) }
										tabIndex={ 0 }
										key={index}
										title={ globalPalette.pattern1[item][1]}
									>
										<div className={ paletteSelectedIndex === item ? 'ast-global-color-sticker selected' : 'ast-global-color-sticker' }
											style={{ background:globalPalette.pattern1[item][0] }} 
										/>
										<div className="ast-global-color-title">{ globalPalette.pattern1[item][1]}</div>
										<div className="ast-global-color-hexcode">{ globalPalette.pattern1[item][0]}</div>
									</Button>
								)
							} )}
						</Popover>
					)}
				</div>
				<div className="ast-color-btn-reset-wrap">
					<button
						className="ast-reset-btn components-button components-circular-option-picker__clear is-secondary is-small"
						disabled={JSON.stringify(props_value) === JSON.stringify(props.control.params.default)} onClick={e => {
						e.preventDefault();
						let value = JSON.parse(JSON.stringify(props.control.params.default));

						if (undefined !== value && '' !== value) {
							if (undefined === value['background-color'] || '' === value['background-color']) {
								value['background-color'] = '';
							}

							if (undefined === value['background-image'] || '' === value['background-image']) {
								value['background-image'] = '';
							}

							if (undefined === value['background-media'] || '' === value['background-media']) {
								value['background-media'] = '';
							}
						}

						props.control.setting.set(value);
						setPropsValue( value );
						// refs.ChildAstraColorPickerControl.onResetRefresh();
					}}>
						<Dashicon icon='image-rotate'/>
					</button>
				</div>
			</span>;
	};

	const onSelectImage = ( media, backgroundType ) => {
		let obj = {
			...props_value
		};
		obj['background-media'] = media.id;
		obj['background-image'] = media.url;
		obj['background-type'] = backgroundType;
		props.control.setting.set(obj);
		setPropsValue( obj );
	};

	const onChangeImageOptions = ( mainKey, value, backgroundType ) => {
		let obj = {
			...props_value
		};
		obj[mainKey] = value;
		obj['background-type'] = backgroundType;
		props.control.setting.set(obj);
		setPropsValue( obj );
	};

	const renderSettings = () => {
		return <>
			<AstraColorPickerControl
				color={undefined !== props_value['background-color'] && props_value['background-color'] ? props_value['background-color'] : ''}
				onChangeComplete={(color, backgroundType) => handleChangeComplete(color, backgroundType)}
				media={undefined !== props_value['background-media'] && props_value['background-media'] ? props_value['background-media'] : ''}
				backgroundImage={undefined !== props_value['background-image'] && props_value['background-image'] ? props_value['background-image'] : ''}
				backgroundAttachment={undefined !== props_value['background-attachment'] && props_value['background-attachment'] ? props_value['background-attachment'] : ''}
				backgroundPosition={undefined !== props_value['background-position'] && props_value['background-position'] ? props_value['background-position'] : ''}
				backgroundRepeat={undefined !== props_value['background-repeat'] && props_value['background-repeat'] ? props_value['background-repeat'] : ''}
				backgroundSize={undefined !== props_value['background-size'] && props_value['background-size'] ? props_value['background-size'] : ''}
				onSelectImage={(media, backgroundType) => onSelectImage(media, backgroundType)}
				onChangeImageOptions={(mainKey, value, backgroundType) => onChangeImageOptions(mainKey, value, backgroundType)}
				backgroundType={undefined !== props_value['background-type'] && props_value['background-type'] ? props_value['background-type'] : 'color'}
				allowGradient={true} allowImage={true} 
				defautColorPalette = {props.customizer.control('astra-settings[global-color-palette]').setting.get()}
				isPaletteUsed={ (value,index,defaultset) => updatePaletteuse(value,index,defaultset)} 
				container ={props.control.container[0]}
				disablePalette={true} 
				colorIndicator = {dbValue['background-color']}
				/>
		</>;
	};

	const handleChangeComplete = ( color, backgroundType ) => {
		let value = '';

		if (color) {
			if (typeof color === 'string' || color instanceof String) {
				value = color;
			} else if (undefined !== color.rgb && undefined !== color.rgb.a && 1 !== color.rgb.a) {
				value = `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`;
			} else {
				value = color.hex;
			}
		}

		let obj = {
			...props_value
		};
		obj['background-color'] = value;
		obj['background-type'] = backgroundType;
		
		setPropsValue( obj );

		if(props.control.container[0].getAttribute('paletteindex')){	
			obj['background-color'] = 'var(--ast-global-palette'+props.control.container[0].getAttribute('paletteindex')+')';

			props.control.setting.set(obj);
		}else{
			props.control.setting.set(obj);
		}

	};

	const {
		label,
		description
	} = props.control.params;

	let labelHtml = <span className="customize-control-title">{label ? label : __('Background', 'astra')}</span>;
	let descriptionHtml = description ?
		<span className="description customize-control-description">{description}</span> : null;
	let inputHtml = null;

	inputHtml = <div className="background-wrapper">
		<div className="background-container">
			{renderReset()}
			{renderSettings()}
		</div>
	</div>;
	return <>
		<label>
			{labelHtml}
			{descriptionHtml}
		</label>

		<div className="customize-control-content">
			{inputHtml}
		</div>
	</>;

};

Background.propTypes = {
	control: PropTypes.object.isRequired
};

export default React.memo( Background );
