import PropTypes from 'prop-types';
import {__} from '@wordpress/i18n';
import {useEffect, useState} from 'react';
import parse from 'html-react-parser';
import svgIcons from '../../../../../assets/svg/svgs.json';

const ResponsiveSpacingComponent = props => {

	let value = props.control.setting.get()
	value = (undefined === value || '' === value) ? props.control.params.value : value;
	const [state, setState] = useState(value);

	useEffect( () => {
		// If settings are changed externally.
		if( state !== value ) {
			setState(value);
		}
	}, [props]);

	const onConnectedClick = () => {
		let parent = event.target.parentElement.parentElement;
		let inputs = parent.querySelectorAll('.ast-spacing-input');

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].classList.remove('connected');
			inputs[i].setAttribute('data-element-connect', '');
		}

		event.target.parentElement.classList.remove('disconnected');
	};

	const onDisconnectedClick = () => {
		let elements = event.target.dataset.elementConnect;
		let parent = event.target.parentElement.parentElement;
		let inputs = parent.querySelectorAll('.ast-spacing-input');

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].classList.add('connected');
			inputs[i].setAttribute('data-element-connect', elements);
		}

		event.target.parentElement.classList.add('disconnected');
	};

	const onSpacingChange = (device, choiceID) => {
		const {
			choices
		} = props.control.params;
		let updateState = {
			...state
		};
		let deviceUpdateState = {
			...updateState[device]
		};

		if (!event.target.classList.contains('connected')) {
			deviceUpdateState[choiceID] = event.target.value;
		} else {
			for (let choiceID in choices) {
				deviceUpdateState[choiceID] = event.target.value;
			}
		}

		updateState[device] = deviceUpdateState;
		props.control.setting.set(updateState);
		setState(updateState);
	};

	const onUnitChange = (device, unitKey = '') => {
		let updateState = {
			...state
		};
		updateState[`${device}-unit`] = unitKey;
		props.control.setting.set(updateState);
		setState(updateState);
	};

	const renderResponsiveInput = (device) => {
		return <input key={device} type='hidden' onChange={() => onUnitChange(device, '')}
					  className={`ast-spacing-unit-input ast-spacing-${device}-unit`} data-device={`${device}`}
					  value={state[`${device}-unit`]}></input>;
	};

	const allEqual = arr => arr.every(val => val === arr[0]);

	const renderInputHtml = (device, active = '') => {
		const {
			linked_choices,
			id,
			choices,
			inputAttrs,
			unit_choices,
			connected
		} = props.control.params;

		const currentValues = Object.keys(choices).map(choiceID => {
			return state[device][choiceID];
		});

		const areValuesDifferent = allEqual(currentValues);

		let connectedClass = ( ( false === connected ) || ( false === areValuesDifferent ) ) ? '' : 'connected';
		let disconnectedClass = ( ( false === connected ) || ( false === areValuesDifferent ) ) ? '' : 'disconnected';
		let itemLinkDesc = __('Link Values Together', 'astra');
		let linkHtml = null;
		let htmlChoices = null;
		let respHtml = null;

		if (linked_choices) {
			const linkActive = parse( svgIcons['hyper-link-enable'] );
			const linkDeactivated = parse( svgIcons['hyper-link-disable'] );

			linkHtml = <li key={'connect-disconnect' + device} className={ `ast-spacing-input-item-link ${disconnectedClass}` }>
					<span key={'connect' + device}
						  className="ast-spacing-connected wp-ui-highlight"
						  onClick={() => {
							  onConnectedClick();
						  }} data-element-connect={id} title={itemLinkDesc}>
							{linkActive}
						  </span>
				<span key={'disconnect' + device} className="ast-spacing-disconnected"
					  onClick={() => {
						  onDisconnectedClick();
					  }} data-element-connect={id} title={itemLinkDesc}>
					{linkDeactivated}
				</span>
			</li>;
		}

		if( choices ) {
			htmlChoices = Object.keys(choices).map(choiceID => {
				let html = <li key={choiceID} {...inputAttrs} className='ast-spacing-input-item'>
					<input type='number' className={`ast-spacing-input ast-spacing-${device} ${connectedClass}`} data-id={choiceID}
						   value={state[device][choiceID]} onChange={() => onSpacingChange(device, choiceID)}
						   data-element-connect={id}/>
					<span className="ast-spacing-title">{choices[choiceID]}</span>
				</li>;
				return html;
			});
		}

		if( unit_choices ) {
			respHtml = Object.values(unit_choices).map(unitKey => {
				let unitClass = '';

				if (state[`${device}-unit`] === unitKey) {
					unitClass = 'active';
				}

				let html = <li key={unitKey} className={`single-unit ${unitClass}`}
							   onClick={() => onUnitChange(device, unitKey)} data-unit={unitKey}>
					<span className="unit-text">{unitKey}</span>
				</li>;
				return html;
			});
		}


		return <ul key={device} className={`ast-spacing-wrapper ${device} ${active}`}>
			{linkHtml}
			{htmlChoices}
			<ul key={'responsive-units'}
				className={`ast-spacing-responsive-units ast-spacing-${device}-responsive-units`}>
				{respHtml}
			</ul>
		</ul>;
	};

	const {
		label,
		description
	} = props.control.params;
	let htmlLabel = null;
	let htmlDescription = null;
	let inputHtml = null;
	let responsiveHtml = null;

	if (label) {
		htmlLabel = <span className="customize-control-title">{label}</span>;
	}

	if (description) {
		htmlDescription = <span className="description customize-control-description">{description}</span>;
	}

	inputHtml = <>
		{renderInputHtml('desktop', 'active')}
		{renderInputHtml('tablet')}
		{renderInputHtml('mobile')}
	</>;

	const responsiveDesktop = parse( svgIcons['desktop-responsive'] );
	const responsiveTablet = parse( svgIcons['tablet-responsive'] );
	const responsiveMobile = parse( svgIcons['mobile-responsive'] );

	responsiveHtml = <>
		<div className="unit-input-wrapper ast-spacing-unit-wrapper">
			{renderResponsiveInput('desktop')}
			{renderResponsiveInput('tablet')}
			{renderResponsiveInput('mobile')}
		</div>
		<ul key={'ast-spacing-responsive-btns'} className="ast-spacing-responsive-btns">
			<li key={'desktop'} className="desktop active">
				<button type="button" className="preview-desktop active" data-device="desktop">
					{responsiveDesktop}
				</button>
			</li>
			<li key={'tablet'} className="tablet">
				<button type="button" className="preview-tablet" data-device="tablet">
					{responsiveTablet}
				</button>
			</li>
			<li key={'mobile'} className="mobile">
				<button type="button" className="preview-mobile" data-device="mobile">
					{responsiveMobile}
				</button>
			</li>
		</ul>
	</>;

	return <label key={'ast-spacing-responsive'} className='ast-spacing-responsive' htmlFor="ast-spacing">
		{htmlLabel}
		{htmlDescription}
		<div className="ast-spacing-responsive-units-screen-wrap">
			{responsiveHtml}
		</div>
		<div className="ast-spacing-responsive-outer-wrapper">
			<div className="input-wrapper ast-spacing-responsive-wrapper">
				{inputHtml}
			</div>
		</div>
	</label>;

};

ResponsiveSpacingComponent.propTypes = {
	control: PropTypes.object.isRequired
};

export default ResponsiveSpacingComponent;
