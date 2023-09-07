/**
 * Meta Options build.
 */
import { useState, useEffect } from 'react';
import { PluginSidebar, PluginSidebarMoreMenuItem } from '@wordpress/edit-post';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import AstCheckboxControl from './ast-checkbox.js';
import AstRadioImageControl from './ast-radio-image.js';
import AstSelectorControl from './ast-selector.js';
import svgIcons from '../../../../assets/svg/svgs.json';
import { SelectControl, PanelBody, Modal } from '@wordpress/components';
import parse from 'html-react-parser';

const { __ } = wp.i18n;

const MetaSettings = props => {

	const modalIcon = parse( svgIcons['meta-popup-icon'] );
	const astraLogo = parse( svgIcons['astra-brand-icon'] );
	const brandIcon = parse( svgIcons['astra-brand-icon'] );

    const [ isOpen, setOpen ] = useState( false );

    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );

	const is_hide_content_layout_sidebar = astMetaParams.is_hide_content_layout_sidebar;

	// Adjust spacing & borders for table.
	const topTableSpacing = <tr className="ast-extra-spacing"><td className="ast-border"></td><td></td></tr>;
	const bottomTableSpacing = <tr className="ast-extra-spacing ast-extra-spacing-bottom"><td className="ast-border"></td><td></td></tr>;

	const icon = parse( svgIcons['astra-meta-settings'] );
	const sidebarOptions = Object.entries( astMetaParams.sidebar_options ).map( ( [ key, name ] ) => {
		return ( { label: name, value: key } );
	} );

	const contentLayoutOptions = Object.entries( astMetaParams.content_layout ).map( ( [ key, name ] ) => {
		return ( { label: name, value: key } );
	} );

	const contentStyleOptions = Object.entries( astMetaParams.content_style ).map( ( [ key, name ] ) => {
		return ( { label: name, value: key } );
	} );

	const sidebarStyleOptions = Object.entries( astMetaParams.content_style ).map( ( [ key, name ] ) => {
		return ( { label: name, value: key } );
	} );

	// Taransparent and Sticky Header Options.
	const headerOptions = Object.entries( astMetaParams.header_options ).map( ( [ key, name ] ) => {
		return ( { label: name, value: key } );
	} );

	// Page header optins.
	const pageHeaderOptions = Object.entries( astMetaParams.page_header_options ).map( ( [ key, name ] ) => {
		return ( { label: name, value: key } );
	} );

	// Checkbox control
	const disableSections = Object.entries( astMetaParams.disable_sections ).map( ( [ key, value ] ) => {
		let sectionValue = ( 'disabled' === props.meta[value['key']] ) ? true : false;
		return (
		<AstCheckboxControl
			label = { value['label'] }
			value = { sectionValue }
			key = { key }
			name = { value['key'] }
			onChange = { ( val ) => {
				props.setMetaFieldValue( val, value['key'] );
			} }
		/>);
	});
	const headers_meta_options = Object.entries( astMetaParams.headers_meta_options ).map( ( [ key, value ] ) => {
		let sectionValue = ( 'disabled' === props.meta[value['key']] ) ? true : false;
		return (
		<AstCheckboxControl
			label = { value['label'] }
			value = { sectionValue }
			key = { key }
			name = { value['key'] }
			onChange = { ( val ) => {
				props.setMetaFieldValue( val, value['key'] );
			} }
		/>);
	});

	// Checkbox control
	const stickyHeadderOptions = Object.entries( astMetaParams.sticky_header_options ).map( ( [ key, value ] ) => {
		let stickyValue =  ( 'disabled' === props.meta[value['key']] ) ? true : false;
		return (
		<AstCheckboxControl
			label = { value['label'] }
			value = { stickyValue }
			key = { key }
			name = { value['key'] }
			onChange = { ( val ) => {
				props.setMetaFieldValue( val, value['key'] );
			} }
		/>);
	});

	// Migrate meta layout, content style and sidebar options if old user.
	useEffect(() => {
		if ( astMetaParams.v4_1_6_migration && undefined !== props.meta['astra-migrate-meta-layouts'] && 'set' !== props.meta['astra-migrate-meta-layouts'] ) {
			props.setMetaFieldValue( 'set', 'astra-migrate-meta-layouts' );
			switch ( props.meta['site-content-layout'] ) {
				case 'plain-container':
					props.setMetaFieldValue( 'normal-width-container', 'ast-site-content-layout' );
					props.setMetaFieldValue( 'unboxed', 'site-content-style' );
					props.setMetaFieldValue( 'unboxed', 'site-sidebar-style' );
					break;
				case 'boxed-container':
					props.setMetaFieldValue( 'normal-width-container', 'ast-site-content-layout' );
					props.setMetaFieldValue( 'boxed', 'site-content-style' );
					props.setMetaFieldValue( 'boxed', 'site-sidebar-style' );
					break;
				case 'content-boxed-container':
					props.setMetaFieldValue( 'normal-width-container', 'ast-site-content-layout' );
					props.setMetaFieldValue( 'boxed', 'site-content-style' );
					props.setMetaFieldValue( 'unboxed', 'site-sidebar-style' );
					break;
				case 'page-builder':
					props.setMetaFieldValue( 'full-width-container', 'ast-site-content-layout' );
					props.setMetaFieldValue( 'unboxed', 'site-content-style' );
					props.setMetaFieldValue( 'unboxed', 'site-sidebar-style' );
					break;
				case 'narrow-container':
					props.setMetaFieldValue( 'narrow-width-container', 'ast-site-content-layout' );
					props.setMetaFieldValue( 'unboxed', 'site-content-style' );
					props.setMetaFieldValue( 'unboxed', 'site-sidebar-style' );
					break;
				default:
					props.setMetaFieldValue( 'default', 'ast-site-content-layout' );
					props.setMetaFieldValue( 'default', 'site-content-style' );
					props.setMetaFieldValue( 'default', 'site-sidebar-style' );
					break;
			}
		}
	}, [props.meta['astra-migrate-meta-layouts']] );

	return (
		<>
			{/* Meta settings icon */}
			<PluginSidebarMoreMenuItem
				target="theme-meta-panel"
				icon={ icon }
			>
				{ astMetaParams.title }
			</PluginSidebarMoreMenuItem>

			{/* Meta seetings popup area */}
				<PluginSidebar
				isPinnable={ true }
				icon={ icon }
				name="theme-meta-panel"
				title={ astMetaParams.title }
			>

				<div className="ast-sidebar-container components-panel__body is-opened" id="astra_settings_meta_box">

					{/* Content Layout Setting */}
					{ ! is_hide_content_layout_sidebar && (<PanelBody
						title={ __( 'Container', 'astra' ) }
						initialOpen={ true }
					>
						<label id='ast-label-container-layout' className='ast-sub-section-title'>{ __( 'Container Layout', 'astra' ) }</label>
						<div className="ast-sidebar-layout-meta-wrap components-base-control__field">
							<AstRadioImageControl
								metavalue = { ( undefined !== props.meta['ast-site-content-layout'] && ''!== props.meta['ast-site-content-layout'] ? props.meta['ast-site-content-layout'] : 'default' ) }
								choices = { contentLayoutOptions }
								id = { 'ast-site-content-layout' }
								onChange={ ( val ) => {						
									if ( val === 'narrow-container' ) props.setMetaFieldValue( 'no-sidebar', 'site-sidebar-layout');
									props.setMetaFieldValue( val, 'ast-site-content-layout' );
								} }
							/>
						</div>
						<label id='ast-label-container-style' className='ast-sub-section-title'>{ __( 'Container Style', 'astra' ) }</label>
						<div className="ast-sidebar-layout-meta-wrap components-base-control__field">
							<AstSelectorControl
								metavalue = { ( undefined !== props.meta['site-content-style'] && ''!== props.meta['site-content-style'] ? props.meta['site-content-style'] : 'default' ) }
								choices = { contentStyleOptions }
								id = { 'site-content-style' }
								onChange={ ( val ) => {
									props.setMetaFieldValue( val, 'site-content-style' );
								} }
							/>
						</div>
						<p className='description'>
							{ __( 'Container style will apply only when layout is set to either normal or narrow.', 'astra' ) }
						</p>
					</PanelBody>
					)}				

					{/* Sidebar Setting */}
					<PanelBody
						title={ __( 'Sidebar', 'astra' ) }
						initialOpen={ false }
					>
						<label id='ast-label-sidebar-layout' className='ast-sub-section-title'>{ __( 'Sidebar Layout', 'astra' ) }</label>
						<div className="ast-sidebar-layout-meta-wrap components-base-control__field">
							<AstRadioImageControl
								metavalue = { ( undefined !== props.meta['site-sidebar-layout'] && ''!== props.meta['site-sidebar-layout'] ? props.meta['site-sidebar-layout'] : 'default' ) }
								choices = { sidebarOptions }
								id = { 'site-sidebar-layout' }
								onChange={ ( val ) => {
									props.setMetaFieldValue( val, 'site-sidebar-layout' );
								} }
							/>
						</div>
						{ ! astMetaParams.v4_1_6_migration && (
							<p className='description'>
								{ __( 'Sidebar will only apply when container layout is set to normal.', 'astra' ) }
							</p>
						)}
						<label id='ast-label-sidebar-style' className='ast-sub-section-title'>{ __( 'Sidebar Style', 'astra' ) }</label>
						<div className="ast-sidebar-layout-meta-wrap components-base-control__field">
							<AstSelectorControl
								metavalue = { ( undefined !== props.meta['site-sidebar-style'] && ''!== props.meta['site-sidebar-style'] ? props.meta['site-sidebar-style'] : 'default' ) }
								choices = { sidebarStyleOptions }
								id = { 'site-sidebar-style' }
								onChange={ ( val ) => {
									props.setMetaFieldValue( val, 'site-sidebar-style' );
								} }
							/>
						</div>
					</PanelBody>

					{/* Disable Section Setting */}
					{ ! is_hide_content_layout_sidebar && ( <PanelBody
						title={ __( 'Disable Elements', 'astra' ) }
						initialOpen={ false }
					>
						<div className="ast-sidebar-layout-meta-wrap components-base-control__field">
							{ disableSections }
						</div>
					</PanelBody> ) }

					{ is_hide_content_layout_sidebar && ( <PanelBody
						title={ __( 'Disable Elements', 'astra' ) }
						initialOpen={ true }
					>
						<div className="ast-sidebar-layout-meta-wrap components-base-control__field">
							{ disableSections }
						</div>
					</PanelBody> ) }

					{  ! is_hide_content_layout_sidebar && ( undefined !== props.meta['ast-global-header-display'] && 'disabled' !== props.meta['ast-global-header-display'] ) &&
						<div className="ast-custom-layout-panel components-panel__body">
							<h2 className="components-panel__body-title">
								<button className="components-button components-panel__body-toggle" onClick = { openModal }>
									<span className="ast-title-container">
										<div className="ast-title"> { __( 'Advanced Settings', 'astra' ) }</div>
									</span>
									{modalIcon}
								</button>
							</h2>
						</div>
					}

					{/* Header related all settings */}
					{ isOpen && (
						<Modal
							title={ __( 'Advanced Settings', 'astra' ) }
							className = "ast-header-settings-modal"
							shouldCloseOnClickOutside = { false }
							onRequestClose={ closeModal }
							icon={ brandIcon }
						>
							<div className="ast-meta-settings-content">
								<table className="ast-meta-settings-hook-table widefat">
									<tbody>
										{ topTableSpacing }
										<tr className="ast-advanced-hook-row">
											<td className="ast-advanced-hook-row-heading">
												<label> { __( 'Header Rows', 'astra' ) }</label>
											</td>
											<td className="ast-advanced-hook-row-content">
												<section className="components-base-control__field">
													{/* Individual header settings. */}
													{ headers_meta_options }
												</section>
											</td>
										</tr>
										{ bottomTableSpacing }
										{ topTableSpacing }
										<tr className="ast-advanced-hook-row">
											<td className="ast-advanced-hook-row-heading">
												<label> { astMetaParams.transparent_header_title }</label>
											</td>
											<td className="ast-advanced-hook-row-content">
												<section>
													{/* Transparent Header Setting */}
													<div className="components-base-control__field">
														<AstSelectorControl
															metavalue = { ( undefined !== props.meta['theme-transparent-header-meta'] && ''!== props.meta['theme-transparent-header-meta'] ? props.meta['theme-transparent-header-meta'] : 'default' ) }
															choices = { headerOptions }
															id = { 'theme-transparent-header-meta' }
															onChange={ ( val ) => {
																props.setMetaFieldValue( val, 'theme-transparent-header-meta' );
															} }
														/>
													</div>
												</section>
											</td>
										</tr>
										{ bottomTableSpacing }
										{/* Sticky Header Setting */}
										{ 'disabled' !== props.meta['ast-main-header-display'] && astMetaParams.is_addon_activated && astMetaParams.sticky_addon_enabled &&
											<>
												{ topTableSpacing }
												<tr className="ast-advanced-hook-row">
													<td className="ast-advanced-hook-row-heading">
														<label> { astMetaParams.sticky_header_title }</label>
													</td>
													<td className="ast-advanced-hook-row-content">
														<section>
															<AstSelectorControl
																metavalue = { ( undefined !== props.meta['stick-header-meta'] && ''!== props.meta['stick-header-meta'] ? props.meta['stick-header-meta'] : 'default' ) }
																choices = { headerOptions }
																id = { 'stick-header-meta' }
																onChange={ ( val ) => {
																	props.setMetaFieldValue( val, 'stick-header-meta' );
																} }
															/>
														</section>
													</td>
												</tr>
												{ topTableSpacing }
											</>
										}
										{ astMetaParams.is_addon_activated && astMetaParams.sticky_addon_enabled && 'enabled' == props.meta['stick-header-meta'] &&
											<>
												<tr className="ast-advanced-hook-row">
													<td className="ast-advanced-hook-row-heading">
														<label> { astMetaParams.sticky_header_title }</label>
													</td>
													<td className="ast-advanced-hook-row-content">
														<section>
															<div className="ast-sticky-header-options components-base-control__field">
																{stickyHeadderOptions}
															</div>
														</section>
													</td>
												</tr>
												{ topTableSpacing }
											</>
										}
									</tbody>
								</table>
							</div>
							<div className="ast-cl-footer-container">
								<div className="ast-button-container">
									<span className="ast-cl-popup-notice">
										<i className='dashicons dashicons-warning'></i>
										{ __( 'Make sure to update your post for changes to take effect.', 'astra' ) } </span>
									<button className="button button-default" onClick= { closeModal }> { __( 'Return To Post', 'astra' ) }</button>
								</div>
							</div>
						</Modal>
					) }

					{/* Page Header Setting */}
					{ ( astMetaParams.is_bb_themer_layout && astMetaParams.is_addon_activated && astMetaParams.page_header_availability ) &&
						<PanelBody
							title={ astMetaParams.page_header_title }
							initialOpen={ false }
						>
							<div className="ast-sidebar-layout-meta-wrap components-base-control__field">
								<SelectControl
									value={ ( undefined !== props.meta['adv-header-id-meta'] && '' !== props.meta['adv-header-id-meta'] ) ? props.meta['adv-header-id-meta'] : '' }
									options={ pageHeaderOptions.reverse() }
									onChange={ ( val ) => {
										props.setMetaFieldValue( val, 'adv-header-id-meta' );
									} }
								/>
							</div>
							<br/>
							<p className='description'>
								{ __( 'If you would like to apply custom header for this page, select the one from the list above. Page headers can be created and customized from ', 'astra' ) }
								<a href={ astMetaParams.page_header_edit_link } target='__blank'>
									{ __( 'here.', 'astra' ) }
								</a>
							</p>
						</PanelBody>
					}

					{ ( ! astMetaParams.is_addon_activated && astMetaParams.show_upgrade_notice ) &&
						<div className="ast-pro-upgrade-cta-wrapper">
							{astraLogo}
							<p className="ast-upgrade-description"> { __( 'Unlock your full design potential and build a website to be proud of with Astra Pro.', 'astra' ) } </p>
							<a href={ astMetaParams.upgrade_pro_link } className='ast-pro-upgrade-link' target='_blank'> { __( 'Upgrade Now', 'astra' ) } </a>
						</div>
					}
				</div>
			</PluginSidebar>
		</>
	);
}

export default compose(
	withSelect( ( select ) => {
		const postMeta = select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		const oldPostMeta = select( 'core/editor' ).getCurrentPostAttribute( 'meta' );
		return {
			meta: { ...oldPostMeta, ...postMeta },
			oldMeta: oldPostMeta,
		};
	} ),
	withDispatch( ( dispatch ) => ( {
		setMetaFieldValue: ( value, field ) => dispatch( 'core/editor' ).editPost(
			{ meta: { [ field ]: value } }
		),
	} ) ),
)( MetaSettings );
