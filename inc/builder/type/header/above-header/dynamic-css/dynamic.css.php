<?php
/**
 * Above Header - Dynamic CSS
 *
 * @package astra-builder
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Above Header Row.
 */
add_filter( 'astra_dynamic_theme_css', 'astra_above_header_row_setting', 11 );

/**
 * Above Header Row - Dynamic CSS
 *
 * @param  string $dynamic_css          Astra Dynamic CSS.
 * @param  string $dynamic_css_filtered Astra Dynamic CSS Filters.
 * @return String Generated dynamic CSS for Heading Colors.
 *
 * @since x.x.x
 */
function astra_above_header_row_setting( $dynamic_css, $dynamic_css_filtered = '' ) {

	$parse_css = '';

	// Common CSS options.
	$hba_header_height  = astra_get_option( 'hba-header-height' );
	$hba_header_divider = astra_get_option( 'hba-header-separator' );
	$hba_border_color   = astra_get_option( 'hba-header-bottom-border-color' );

	// Background CSS options.
	$hba_header_bg_obj  = astra_get_option( 'hba-header-bg-obj-responsive' );
	$desktop_background = isset( $hba_header_bg_obj['desktop']['background-color'] ) ? $hba_header_bg_obj['desktop']['background-color'] : '';
	$tablet_background  = isset( $hba_header_bg_obj['tablet']['background-color'] ) ? $hba_header_bg_obj['tablet']['background-color'] : '';
	$mobile_background  = isset( $hba_header_bg_obj['mobile']['background-color'] ) ? $hba_header_bg_obj['mobile']['background-color'] : '';

	// Spacing CSS options.
	$hba_header_spacing = astra_get_option( 'hba-header-spacing' );

	/**
	 * Above Header General options
	 */
	$common_css_output = array(
		'.ast-above-header-bar' => array(
			'min-height'          => astra_get_css_value( $hba_header_height, 'px' ),
			'border-bottom-width' => astra_get_css_value( $hba_header_divider, 'px' ),
			'border-bottom-color' => esc_attr( $hba_border_color ),
			'border-bottom-style' => 'solid',
		),
	);

	$parse_css .= astra_parse_css( $common_css_output );

	// Above Header Background Responsive - Desktop.
	$desktop_bg = array(
		'.ast-above-header.ast-above-header-bar'        => astra_get_responsive_background_obj( $hba_header_bg_obj, 'desktop' ),
		'.ast-header-break-point .ast-above-header-bar' => array(
			'background-color' => esc_attr( $desktop_background ),
		),
	);
	$parse_css .= astra_parse_css( $desktop_bg );

	// Above Header Background Responsive - Tablet.
	$tablet_bg  = array(
		'.ast-above-header.ast-above-header-bar'        => astra_get_responsive_background_obj( $hba_header_bg_obj, 'tablet' ),
		'.ast-header-break-point .ast-above-header-bar' => array(
			'background-color' => esc_attr( $tablet_background ),
		),
	);
	$parse_css .= astra_parse_css( $tablet_bg, '', astra_get_tablet_breakpoint() );

	// Above Header Background Responsive - Mobile.
	$mobile_bg  = array(
		'.ast-above-header.ast-above-header-bar'        => astra_get_responsive_background_obj( $hba_header_bg_obj, 'mobile' ),
		'.ast-header-break-point .ast-above-header-bar' => array(
			'background-color' => esc_attr( $mobile_background ),
		),
	);
	$parse_css .= astra_parse_css( $mobile_bg, '', astra_get_mobile_breakpoint() );

	// Trim white space for faster page loading.
	$dynamic_css .= Astra_Enqueue_Scripts::trim_css( $parse_css );

	$_section = 'section-above-header-builder';

	$selector = '.site-above-header-wrap[data-section="ast_header_above"]';

	$parent_selector = '.ast-above-header.ast-above-header-bar';

	$dynamic_css .= Astra_Builder_Base_Dynamic_CSS::prepare_advanced_margin_padding_css( $_section, $parent_selector );

	return $dynamic_css;
}
