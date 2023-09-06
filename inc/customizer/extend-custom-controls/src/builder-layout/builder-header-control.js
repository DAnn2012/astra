import React from 'react';
import ReactDOM from 'react-dom';

const {__} = wp.i18n;

const toggleBuilderSection = (props) => {
	props.customizer.section.each(function (section) {
		if (section.expanded()) {
			section.collapse();
			return false; // Breaks.
		}
	});
};

const BuilderHeader = (props) => {
	if ("section-footer-builder" === props.control.params.section || "section-header-builder" === props.control.params.section) {
		return (
			<React.Fragment>
				<p className="ast-customize-control-title">
					{ astra.customizer.show_upgrade_notice &&
						<>
							{ <span style={{ marginRight: '10px' }}> <svg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'> <rect width='18' height='18' rx='9' fill='white'/> <path fillRule='evenodd' clipRule='evenodd' d='M9.74702 5.06643C9.46123 4.49128 9.17545 3.91614 8.88188 3.34521C8.41365 4.33365 7.94539 5.32208 7.47713 6.31053C6.31797 8.75734 5.15879 11.2042 4 13.6513C4.27019 13.652 4.54043 13.6517 4.81069 13.6513C5.23742 13.6508 5.66419 13.6502 6.09081 13.654C6.81384 12.2046 7.53195 10.7526 8.25008 9.30066C8.84855 8.09064 9.44702 6.88061 10.0484 5.67201C9.94768 5.47027 9.84735 5.26835 9.74702 5.06643ZM12.9929 11.5845C12.3465 10.257 11.7 8.92955 11.0518 7.60294C10.368 9.02538 9.68354 10.4478 8.99749 11.8691C9.27982 11.8689 9.56208 11.869 9.84432 11.869C10.2206 11.8691 10.597 11.8692 10.9734 11.8687C11.0785 12.106 11.1813 12.3442 11.2841 12.5825C11.4387 12.941 11.5934 13.2995 11.7559 13.6544C12.21 13.6502 12.6641 13.6508 13.1182 13.6514C13.412 13.6518 13.7059 13.6522 13.9997 13.6513C13.6639 12.9624 13.3284 12.2734 12.9929 11.5845Z' fill='#0284C7'/> </svg> </span> }
							<span style={{ verticalAlign: 'super' }}> { __( 'Upgrade to Astra Pro for even more header and footer options, as well as several other wonderful features!', 'astra' ) } </span> <a className='ast-builder-upgrade-link' href={window.AstraBuilderCustomizerData.upgradeUrl} target="_blank">{ __( 'Upgrade Now', 'astra' ) }</a>
						</>
					}
				</p>
				<p className="ast-customize-control-description">
					<span
						className={'button button-secondary ahfb-builder-section-shortcut ' + props.control.params.section}
						data-section={props.control.params.section}
						onClick={() => toggleBuilderSection(props)}>
						<span className="dashicons dashicons-admin-generic"> </span>
					</span>
					<span className="button button-secondary ahfb-builder-hide-button ahfb-builder-tab-toggle">
						<span className="ast-builder-hide-action"> <span
							className="dashicons dashicons-arrow-down-alt2"></span> {__('Hide Builder', 'astra')} </span>
						<span className="ast-builder-show-action"> <span
							className="dashicons dashicons-arrow-up-alt2"></span> {__('Show Builder', 'astra')} </span>
					</span>
				</p>
			</React.Fragment>
		);

	} else {
		return (
			<React.Fragment>
				<div className="ahfb-compontent-tabs nav-tab-wrapper wp-clearfix">
					<a href="#"
					   className={"nav-tab ahfb-general-tab ahfb-compontent-tabs-button " + (('general' === props.tab) ? "nav-tab-active" : "")}
					   data-tab="general">
						<span>
							{ 'section-header-builder-layout' === props.control.params.section || 'section-footer-builder-layout' === props.control.params.section ? __('Elements', 'astra') : __('General', 'astra') }
						</span>
					</a>
					<a href="#"
					   className={"nav-tab ahfb-design-tab ahfb-compontent-tabs-button " + (('design' === props.tab) ? "nav-tab-active" : "")}
					   data-tab="design">
						<span>
							{ __('Designn', 'astra') }
						</span>
					</a>
				</div>
			</React.Fragment>
		)
	}
};

React.memo(BuilderHeader);

export const BuilderHeaderControl = wp.customize.astraControl.extend({
	renderContent: function renderContent() {
		let control = this;

		ReactDOM.render(
			<BuilderHeader
				control={control}
				tab={wp.customize.state('astra-customizer-tab').get()}
				customizer={wp.customize}/>, control.container[0]);
	}
});

