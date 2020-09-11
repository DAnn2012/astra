<?php
/**
 * Astra Theme Customizer Configuration Builder.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       x.x.x
 */

// No direct access, please.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Customizer_Config_Base' ) ) {
	return;
}

/**
 * Register Builder Customizer Configurations.
 *
 * @since x.x.x
 */
class Astra_Header_Search_Component_Configs extends Astra_Customizer_Config_Base {


	/**
	 * Register Builder Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since x.x.x
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$_section              = 'section-hb-search';
		$defaults              = Astra_Theme_Options::defaults();

		$_configs = array(

			/*
			* Header Builder section
			*/
			array(
				'name'     => $_section,
				'type'     => 'section',
				'priority' => 80,
				'title'    => __( 'Search', 'astra-builder' ),
				'panel'    => 'panel-header-builder-group',
			),

			/**
			 * Option: Header Builder Tabs
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[hs-search-tabs]',
				'section'     => $_section,
				'type'        => 'control',
				'control'     => 'ast-builder-header-control',
				'priority'    => 0,
				'description' => '',
			),

			/**
			 * Option: Search Color.
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[header-search-icon-color]',
				'default'   => '',
				'type'      => 'control',
				'section'   => $_section,
				'priority'  => 8,
				'transport' => 'postMessage',
				'control'   => 'ast-color',
				'title'     => __( 'Color', 'astra-builder' ),
				'context'   => array(
					array(
						'setting' => 'ast_selected_tab',
						'value'   => 'design',
					),
				),
			),

			/**
			 * Option: Search Size
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[header-search-icon-space]',
				'section'     => $_section,
				'priority'    => 2,
				'transport'   => 'postMessage',
				'default'     => $defaults['header-search-icon-space'],
				'title'       => __( 'Icon Size', 'astra-builder' ),
				'type'        => 'control',
				'control'     => 'ast-responsive-slider',
				'input_attrs' => array(
					'min'  => 0,
					'step' => 1,
					'max'  => 50,
				),
				'context'     => array(
					array(
						'setting' => 'ast_selected_tab',
						'value'   => 'general',
					),
				),
			),
		);

		if ( defined( 'ASTRA_EXT_VER' ) ) {
			/**
			 * Option: Pro Search Bar Configs.
			 */
			$_addon_dependent_configs = array(
				// Option: Header Search Style.
				array(
					'name'      => ASTRA_THEME_SETTINGS . '[header-search-box-type]',
					'default'   => $defaults['header-search-box-type'],
					'section'   => $_section,
					'priority'  => 10,
					'title'     => __( 'Search Style', 'astra-builder' ),
					'type'      => 'control',
					'control'   => 'select',
					'choices'   => array(
						'slide-search' => __( 'Slide Search', 'astra-builder' ),
						'full-screen'  => __( 'Full Screen Search', 'astra-builder' ),
						'header-cover' => __( 'Header Cover Search', 'astra-builder' ),
						'search-box'   => __( 'Search Box', 'astra-builder' ),
					),
					'context'   => array(
						array(
							'setting' => 'ast_selected_tab',
							'value'   => 'general',
						),
					),
					'transport' => 'postMessage',
					'partial'   => array(
						'selector'            => '.ast-header-search',
						'container_inclusive' => false,
						'render_callback'     => array( 'Astra_Builder_Header', 'header_search' ),
					),
				),
			);

			$_configs = array_merge( $_configs, $_addon_dependent_configs );
		}

		$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_advanced_tab( $_section ) );

		return array_merge( $configurations, $_configs );
	}
}

/**
 * Kicking this off by creating object of this class.
 */

new Astra_Header_Search_Component_Configs();

