<?php
/**
 * Post Strctures - Archive Dynamic CSS
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Post Strctures
 */
add_filter( 'astra_dynamic_theme_css', 'astra_post_archive_strcture_dynamic_css' );

/**
 * Archive Dynamic CSS
 *
 * @param  string $dynamic_css          Astra Dynamic CSS.
 * @param  string $dynamic_css_filtered Astra Dynamic CSS Filters.
 * @return String Generated dynamic CSS for Post Strctures.
 *
 * @since x.x.x
 */
function astra_post_archive_strcture_dynamic_css( $dynamic_css, $dynamic_css_filtered = '' ) {

	$current_post_type    = get_post_type();
	$supported_post_types = Astra_Posts_Structure_Loader::get_supported_post_types();

	if ( ! in_array( $current_post_type, $supported_post_types ) ) {
		return $dynamic_css;
	}
	if ( false === astra_get_option( 'ast-archive-' . $current_post_type . '-title', true ) ) {
		return $dynamic_css;
	}

	$layout_type     = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-layout', 'layout-1' );
	$layout_2_active = ( 'layout-2' === $layout_type ) ? true : false;

	if ( $layout_2_active ) {
		$selector = '.ast-archive-entry-banner[data-post-type="' . $current_post_type . '"]';
	} else {
		$selector = 'body.archive .ast-archive-description';
	}

	$horz_alignment   = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-horizontal-alignment' );
	$desk_h_alignment = ( isset( $horz_alignment['desktop'] ) ) ? $horz_alignment['desktop'] : '';
	$tab_h_alignment  = ( isset( $horz_alignment['tablet'] ) ) ? $horz_alignment['tablet'] : '';
	$mob_h_alignment  = ( isset( $horz_alignment['mobile'] ) ) ? $horz_alignment['mobile'] : '';

	if ( 'layout-1' === $layout_type ) {
		$desk_h_alignment = ( '' !== $desk_h_alignment ) ? $desk_h_alignment : 'left';
		$tab_h_alignment  = ( '' !== $tab_h_alignment ) ? $tab_h_alignment : 'left';
		$mob_h_alignment  = ( '' !== $mob_h_alignment ) ? $mob_h_alignment : 'left';
	}

	$elements_gap   = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-elements-gap', 10 );
	$banner_padding = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-padding' );
	$banner_margin  = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-margin' );

	$banner_height      = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-height' );
	$desk_banner_height = ( $layout_2_active && isset( $banner_height['desktop'] ) ) ? astra_get_css_value( $banner_height['desktop'], 'px' ) : '';
	$tab_banner_height  = ( $layout_2_active && isset( $banner_height['tablet'] ) ) ? astra_get_css_value( $banner_height['tablet'], 'px' ) : '';
	$mob_banner_height  = ( $layout_2_active && isset( $banner_height['mobile'] ) ) ? astra_get_css_value( $banner_height['mobile'], 'px' ) : '';

	$text_color       = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-text-color' );
	$title_color      = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-title-color' );
	$link_color       = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-link-color' );
	$link_hover_color = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-link-hover-color' );

	$vert_alignment  = ( $layout_2_active ) ? astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-vertical-alignment', 'center' ) : 'center';
	$width_type      = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-width-type', 'fullwidth' );
	$custom_width    = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-custom-width', 1200 );
	$background_type = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-image-type', 'none' );

	// Banner Text typography dynamic stylings.
	$banner_text_font_family = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-text-font-family' );
	$banner_text_font_weight = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-text-font-weight' );
	$banner_text_font_size   = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-text-font-size' );
	$banner_text_line_height = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-text-line-height' );
	$banner_text_transform   = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-text-transform' );

	// Banner Title typography dynamic stylings.
	$banner_title_font_family = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-title-font-family' );
	$banner_title_font_weight = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-title-font-weight' );
	$banner_title_font_size   = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-title-font-size' );
	$banner_title_line_height = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-title-line-height' );
	$banner_title_transform   = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-title-text-transform', 'capitalize' );

	// Few settings from banner section are also applicable to 'layout-1' so adding this condition & compatibility.
	if ( 'layout-1' === $layout_type ) {
		/**
		 * Desktop CSS.
		 */
		$css_output_desktop = array(
			$selector                               => array(
				'text-align'     => $desk_h_alignment,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'desktop' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'desktop' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'desktop' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'desktop' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'desktop' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'desktop' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'desktop' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'desktop' ),
			),
			$selector . ', ' . $selector . ' *'     => array(
				'color'          => esc_attr( $text_color ),
				'font-family'    => astra_get_css_value( $banner_text_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_text_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_text_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_text_line_height ),
				'text-transform' => esc_attr( $banner_text_transform ),
			),
			$selector . ' .ast-archive-title, ' . $selector . ' .ast-archive-title *' => array(
				'color'          => esc_attr( $title_color ),
				'font-family'    => astra_get_css_value( $banner_title_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_title_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_title_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_title_line_height ),
				'text-transform' => esc_attr( $banner_title_transform ),
			),
			$selector . ' a, ' . $selector . ' a *' => array(
				'color' => esc_attr( $link_color ),
			),
			$selector . ' a:hover, ' . $selector . ' a:hover *' => array(
				'color' => esc_attr( $link_hover_color ),
			),
			$selector . ' > *:not(:last-child)'     => array(
				'margin-bottom' => $elements_gap . 'px',
			),
		);

		/**
		 * Tablet CSS.
		 */
		$css_output_tablet = array(
			$selector                         => array(
				'text-align'     => $tab_h_alignment,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'tablet' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'tablet' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'tablet' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'tablet' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'tablet' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'tablet' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'tablet' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'tablet' ),
			),
			$selector . ' .ast-archive-title' => array(
				'font-size' => astra_responsive_font( $banner_title_font_size, 'tablet' ),
			),
			$selector . ' *'                  => array(
				'font-size' => astra_responsive_font( $banner_text_font_size, 'tablet' ),
			),
		);

		/**
		 * Mobile CSS.
		 */
		$css_output_mobile = array(
			$selector                         => array(
				'text-align'     => $mob_h_alignment,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'mobile' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'mobile' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'mobile' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'mobile' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'mobile' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'mobile' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'mobile' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'mobile' ),
			),
			$selector . ' .ast-archive-title' => array(
				'font-size' => astra_responsive_font( $banner_title_font_size, 'mobile' ),
			),
			$selector . ' *'                  => array(
				'font-size' => astra_responsive_font( $banner_text_font_size, 'mobile' ),
			),
		);

		$site_content_width                           = astra_get_option( 'site-content-width', 1200 );
		$css_output_desktop[ $selector ]['max-width'] = $site_content_width . 'px';
		$css_output_desktop[ $selector ]['margin']    = '0 auto';
		$css_output_desktop[ $selector ]['width']     = '100%';

		if ( 'none' !== $background_type ) {
			if ( class_exists( 'WooCommerce' ) && 'product' === $current_post_type ) {
				if ( 'custom' === $background_type ) {
					$custom_background                                 = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-custom-bg' );
					$css_output_desktop[ 'body.archive ' . $selector ] = astra_get_responsive_background_obj( $custom_background, 'desktop' );
					$css_output_tablet[ 'body.archive ' . $selector ]  = astra_get_responsive_background_obj( $custom_background, 'tablet' );
					$css_output_mobile[ 'body.archive ' . $selector ]  = astra_get_responsive_background_obj( $custom_background, 'mobile' );
				} else {
					global $wp_query;
					$overlay_color = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-featured-overlay', '' );
					$taxonomy      = $wp_query->get_queried_object();
					if ( is_callable( 'is_shop' ) && is_shop() && '' !== $overlay_color ) {
						$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background'] = $overlay_color;
					}
					if ( ! empty( $taxonomy->term_id ) ) {
						$thumbnail_id   = get_term_meta( $taxonomy->term_id, 'thumbnail_id', true );
						$feat_image_src = wp_get_attachment_url( $thumbnail_id );
						$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ] = array(
							'background'            => 'url( ' . esc_url( $feat_image_src ) . ' )',
							'background-repeat'     => 'no-repeat',
							'background-attachment' => 'scroll',
							'background-position'   => 'center center',
							'background-size'       => 'cover',
						);
						if ( '' !== $overlay_color ) {
							$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background']            = 'url( ' . esc_url( $feat_image_src ) . ' ) ' . $overlay_color;
							$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background-blend-mode'] = 'multiply';
						}
					}
				}
			} else {
				$custom_background                                       = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-custom-bg' );
				$css_output_desktop['.archive .ast-archive-description'] = astra_get_responsive_background_obj( $custom_background, 'desktop' );
				$css_output_tablet['.archive .ast-archive-description']  = astra_get_responsive_background_obj( $custom_background, 'tablet' );
				$css_output_mobile['.archive .ast-archive-description']  = astra_get_responsive_background_obj( $custom_background, 'mobile' );
			}
		}
	} else {
		/**
		 * Desktop CSS.
		 */
		$css_output_desktop = array(
			$selector                               => array(
				'text-align'      => $desk_h_alignment,
				'justify-content' => $vert_alignment,
				'min-height'      => $desk_banner_height,
				'padding-top'     => astra_responsive_spacing( $banner_padding, 'top', 'desktop' ),
				'padding-right'   => astra_responsive_spacing( $banner_padding, 'right', 'desktop' ),
				'padding-bottom'  => astra_responsive_spacing( $banner_padding, 'bottom', 'desktop' ),
				'padding-left'    => astra_responsive_spacing( $banner_padding, 'left', 'desktop' ),
				'margin-top'      => astra_responsive_spacing( $banner_margin, 'top', 'desktop' ),
				'margin-right'    => astra_responsive_spacing( $banner_margin, 'right', 'desktop' ),
				'margin-bottom'   => astra_responsive_spacing( $banner_margin, 'bottom', 'desktop' ),
				'margin-left'     => astra_responsive_spacing( $banner_margin, 'left', 'desktop' ),
			),
			$selector . ', ' . $selector . ' *'     => array(
				'color'          => esc_attr( $text_color ),
				'font-family'    => astra_get_css_value( $banner_text_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_text_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_text_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_text_line_height ),
				'text-transform' => esc_attr( $banner_text_transform ),
			),
			$selector . ' h1'       => array(
				'color'          => esc_attr( $title_color ),
				'font-family'    => astra_get_css_value( $banner_title_font_family, 'font' ),
				'font-weight'    => astra_get_css_value( $banner_title_font_weight, 'font' ),
				'font-size'      => astra_responsive_font( $banner_title_font_size, 'desktop' ),
				'line-height'    => esc_attr( $banner_title_line_height ),
				'text-transform' => esc_attr( $banner_title_transform ),
			),
			$selector . ' a, ' . $selector . ' a *' => array(
				'color' => esc_attr( $link_color ),
			),
			$selector . ' a:hover, ' . $selector . ' a:hover *' => array(
				'color' => esc_attr( $link_hover_color ),
			),
			$selector . ' > *:not(:last-child)'     => array(
				'margin-bottom' => $elements_gap . 'px',
			),
		);

		/**
		 * Tablet CSS.
		 */
		$css_output_tablet = array(
			$selector                         => array(
				'text-align'     => $tab_h_alignment,
				'min-height'     => $tab_banner_height,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'tablet' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'tablet' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'tablet' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'tablet' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'tablet' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'tablet' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'tablet' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'tablet' ),
			),
			$selector . ' h1' => array(
				'font-size' => astra_responsive_font( $banner_title_font_size, 'tablet' ),
			),
			$selector . ' *'                  => array(
				'font-size' => astra_responsive_font( $banner_text_font_size, 'tablet' ),
			),
		);

		/**
		 * Mobile CSS.
		 */
		$css_output_mobile = array(
			$selector                         => array(
				'text-align'     => $mob_h_alignment,
				'min-height'     => $mob_banner_height,
				'padding-top'    => astra_responsive_spacing( $banner_padding, 'top', 'mobile' ),
				'padding-right'  => astra_responsive_spacing( $banner_padding, 'right', 'mobile' ),
				'padding-bottom' => astra_responsive_spacing( $banner_padding, 'bottom', 'mobile' ),
				'padding-left'   => astra_responsive_spacing( $banner_padding, 'left', 'mobile' ),
				'margin-top'     => astra_responsive_spacing( $banner_margin, 'top', 'mobile' ),
				'margin-right'   => astra_responsive_spacing( $banner_margin, 'right', 'mobile' ),
				'margin-bottom'  => astra_responsive_spacing( $banner_margin, 'bottom', 'mobile' ),
				'margin-left'    => astra_responsive_spacing( $banner_margin, 'left', 'mobile' ),
			),
			$selector . ' h1' => array(
				'font-size' => astra_responsive_font( $banner_title_font_size, 'mobile' ),
			),
			$selector . ' *'                  => array(
				'font-size' => astra_responsive_font( $banner_text_font_size, 'mobile' ),
			),
		);

		if ( ( 'custom' === $width_type ) ) {
			$css_output_desktop[ $selector . '[data-banner-width-type="custom"]' ]['max-width'] = $custom_width . 'px';
		}

		if ( 'none' !== $background_type ) {
			if ( 'product' !== $current_post_type ) {
				$custom_background = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-custom-bg' );
				$css_output_desktop[ $selector . '[data-banner-background-type="custom"]' ] = astra_get_responsive_background_obj( $custom_background, 'desktop' );
				$css_output_tablet[ $selector . '[data-banner-background-type="custom"]' ]  = astra_get_responsive_background_obj( $custom_background, 'tablet' );
				$css_output_mobile[ $selector . '[data-banner-background-type="custom"]' ]  = astra_get_responsive_background_obj( $custom_background, 'mobile' );
			} else {
				if ( 'custom' === $background_type ) {
					$custom_background = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-custom-bg' );
					$css_output_desktop[ $selector . '[data-banner-background-type="custom"]' ] = astra_get_responsive_background_obj( $custom_background, 'desktop' );
					$css_output_tablet[ $selector . '[data-banner-background-type="custom"]' ]  = astra_get_responsive_background_obj( $custom_background, 'tablet' );
					$css_output_mobile[ $selector . '[data-banner-background-type="custom"]' ]  = astra_get_responsive_background_obj( $custom_background, 'mobile' );
				} else {
					global $wp_query;
					$overlay_color = astra_get_option( 'ast-dynamic-archive-' . $current_post_type . '-banner-featured-overlay', '' );
					$taxonomy      = $wp_query->get_queried_object();
					if ( is_callable( 'is_shop' ) && is_shop() && '' !== $overlay_color ) {
						$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background'] = $overlay_color;
					}
					if ( ! empty( $taxonomy->term_id ) ) {
						$thumbnail_id   = get_term_meta( $taxonomy->term_id, 'thumbnail_id', true );
						$feat_image_src = wp_get_attachment_url( $thumbnail_id );
						$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ] = array(
							'background'            => 'url( ' . esc_url( $feat_image_src ) . ' )',
							'background-repeat'     => 'no-repeat',
							'background-attachment' => 'scroll',
							'background-position'   => 'center center',
							'background-size'       => 'cover',
						);
						if ( '' !== $overlay_color ) {
							$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background']            = 'url( ' . esc_url( $feat_image_src ) . ' ) ' . $overlay_color;
							$css_output_desktop[ $selector . '[data-banner-background-type="featured"]' ]['background-blend-mode'] = 'multiply';
						}
					}
				}
			}
		}
	}

	$dynamic_css .= '
		.ast-archive-entry-banner {
			-js-display: flex;
			display: flex;
			flex-direction: column;
			justify-content: center;
			text-align: center;
			position: relative;
			padding: 50px;
			background: #eeeeee;
		}
		.ast-archive-entry-banner[data-banner-width-type="custom"] {
			margin: 0 auto;
			width: 100%;
		}
		.ast-archive-entry-banner[data-banner-layout="layout-1"] {
			background: inherit;
			padding: 20px 0;
			text-align: left;
		}
	';

	/* Parse CSS from array() */
	$dynamic_css .= astra_parse_css( $css_output_desktop );
	$dynamic_css .= astra_parse_css( $css_output_tablet, '', astra_get_tablet_breakpoint() );
	$dynamic_css .= astra_parse_css( $css_output_mobile, '', astra_get_mobile_breakpoint() );

	return $dynamic_css;
}
