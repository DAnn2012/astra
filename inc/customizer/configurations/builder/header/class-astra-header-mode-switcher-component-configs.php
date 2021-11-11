<?php
/**
 * Astra Theme Customizer Configuration Builder.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2021, Astra
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
class Astra_Header_Mode_Switcher_Component_Configs extends Astra_Customizer_Config_Base {

	/**
	 * Register Builder Customizer Configurations.
	 *
	 * @param Array                $configurations Astra Customizer Configurations.
	 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
	 * @since x.x.x
	 * @return Array Astra Customizer Configurations with updated configurations.
	 */
	public function register_configuration( $configurations, $wp_customize ) {

		$_section = 'section-mode-switcher';

		$_configs = array(

			/*
			* Header Builder section
			*/
			array(
				'name'     => $_section,
				'type'     => 'section',
				'priority' => 90,
				'title'    => __( 'Dark Mode Switcher', 'astra' ),
				'panel'    => 'panel-header-builder-group',
			),

			/**
			 * Option: Header Builder Tabs
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[header-mode-switcher-tabs]',
				'section'     => $_section,
				'type'        => 'control',
				'control'     => 'ast-builder-header-control',
				'priority'    => 0,
				'description' => '',
			),

			/**
			 * Option: Icon Type
			 */
			array(
				'name'       => ASTRA_THEME_SETTINGS . '[mode-switcher-icon-type]',
				'default'    => astra_get_option( 'mode-switcher-icon-type' ),
				'type'       => 'control',
				'control'    => 'ast-selector',
				'section'    => $_section,
				'priority'   => 10,
				'title'      => __( 'Select Icon', 'astra' ),
				'choices'    => array(
					'light-switcher-1' => 'light-switcher-1',
					'light-switcher-2' => 'light-switcher-2',
					'light-switcher-3' => 'light-switcher-3',
					'light-switcher-4' => 'light-switcher-4',
				),
				'transport'  => 'postMessage',
				'partial'    => array(
					'selector'        => '.ast-header-mode-switcher',
					'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
				),
				'context'    => Astra_Builder_Helper::$general_tab,
				'responsive' => false,
				'divider'    => array( 'ast_class' => 'ast-bottom-divider' ),
			),

			/**
			 * Option: Icon Size
			 */
			array(
				'name'        => ASTRA_THEME_SETTINGS . '[mode-switcher-icon-size]',
				'section'     => $_section,
				'priority'    => 15,
				'transport'   => 'postMessage',
				'default'     => astra_get_option( 'mode-switcher-icon-size' ),
				'title'       => __( 'Icon Size', 'astra' ),
				'type'        => 'control',
				'suffix'      => 'px',
				'control'     => 'ast-responsive-slider',
				'divider'     => array( 'ast_class' => 'ast-bottom-divider' ),
				'input_attrs' => array(
					'min'  => 0,
					'step' => 1,
					'max'  => 200,
				),
				'context'     => Astra_Builder_Helper::$design_tab,
			),

			/**
			 * Option: Switcher Custom Label
			 */
			array(
				'name'      => ASTRA_THEME_SETTINGS . '[mode-switcher-label]',
				'transport' => 'postMessage',
				'partial'   => array(
					'selector'        => '.ast-header-mode-switcher',
					'render_callback' => array( 'Astra_Builder_UI_Controller', 'render_mode_switcher' ),
				),
				'default'   => astra_get_option( 'mode-switcher-label' ),
				'section'   => $_section,
				'priority'  => 30,
				'title'     => __( 'Label', 'astra' ),
				'type'      => 'control',
				'control'   => 'text',
				'context'   => Astra_Builder_Helper::$general_tab,
				'divider'   => array( 'ast_class' => 'ast-bottom-divider ast-top-divider' ),
			),
		);

		$required_condition = array(
			Astra_Builder_Helper::$design_tab_config,
			array(
				'setting'  => ASTRA_THEME_SETTINGS . '[mode-switcher-label]',
				'operator' => '!=',
				'value'    => '',
			),
		);

		// Added typography settings for switcher label.
		$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_typography_options( $_section, $required_condition ) );

		// Added advanced (margin|padding) settings for switcher element.
		$_configs = array_merge( $_configs, Astra_Builder_Base_Configuration::prepare_advanced_tab( $_section ) );

		return array_merge( $configurations, $_configs );
	}
}

/**
 * Kicking this off by creating object of this class.
 */

new Astra_Header_Mode_Switcher_Component_Configs();

