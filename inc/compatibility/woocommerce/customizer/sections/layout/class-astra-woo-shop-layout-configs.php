<?php
/**
 * WooCommerce Options for Astra Theme.
 *
 * @package     Astra
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       Astra 1.1.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Astra_Woo_Shop_Layout_Configs' ) ) {

	/**
	 * Customizer Sanitizes Initial setup
	 */
	class Astra_Woo_Shop_Layout_Configs extends Astra_Customizer_Config_Base {

		/**
		 * Register Astra-WooCommerce Shop Layout Customizer Configurations.
		 *
		 * @param Array                $configurations Astra Customizer Configurations.
		 * @param WP_Customize_Manager $wp_customize instance of WP_Customize_Manager.
		 * @since 1.4.3
		 * @return Array Astra Customizer Configurations with updated configurations.
		 */
		public function register_configuration( $configurations, $wp_customize ) {

			$_configs = array(

				/**
				 * Option: Shop Columns
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[shop-grids]',
					'type'              => 'control',
					'control'           => 'ast-responsive-slider',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_responsive_slider' ),
					'section'           => 'section-woo-shop-skin',
					'default'           => astra_get_option(
						'shop-grids',
						array(
							'desktop' => 4,
							'tablet'  => 3,
							'mobile'  => 2,
						)
					),
					'priority'          => 11,
					'title'             => __( 'Shop Columns', 'astra' ),
					'input_attrs'       => array(
						'step' => 1,
						'min'  => 1,
						'max'  => 6,
					),
					'divider'           => array( 'ast_class' => 'ast-top-section-divider ast-bottom-section-divider' ),
				),

				/**
				 * Option: Products Per Page
				 */
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[shop-no-of-products]',
					'type'        => 'control',
					'section'     => 'section-woo-shop-skin',
					'title'       => __( 'Products Per Page', 'astra' ),
					'default'     => astra_get_option( 'shop-no-of-products' ),
					'control'     => 'number',
					'priority'    => 15,
					'input_attrs' => array(
						'min'  => 1,
						'step' => 1,
						'max'  => 100,
					),
				),

				/**
				 * Option: Divider
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[woo-shop-structure-divider]',
					'section'  => 'woocommerce_product_catalog',
					'title'    => __( 'Shop Skin Structure', 'astra' ),
					'type'     => 'control',
					'control'  => 'ast-heading',
					'priority' => 15,
					'settings' => array(),
					'divider'  => array( 'ast_class' => 'ast-section-spacing' ),
				),

				/**
				 * Option: Single Post Meta
				 */
				array(
					'name'              => ASTRA_THEME_SETTINGS . '[shop-product-structure]',
					'type'              => 'control',
					'control'           => 'ast-sortable',
					'sanitize_callback' => array( 'Astra_Customizer_Sanitizes', 'sanitize_multi_choices' ),
					'section'           => 'woocommerce_product_catalog',
					'default'           => astra_get_option( 'shop-product-structure' ),
					'priority'          => 15,
					'choices'           => array(
						'title'      => __( 'Title', 'astra' ),
						'price'      => __( 'Price', 'astra' ),
						'ratings'    => __( 'Ratings', 'astra' ),
						'short_desc' => __( 'Short Description', 'astra' ),
						'add_cart'   => __( 'Add To Cart', 'astra' ),
						'category'   => __( 'Category', 'astra' ),
					),
					'divider'           => array( 'ast_class' => 'ast-section-spacing' ),
				),


				/**
				 * Option: Divider
				 */
				array(
					'name'     => ASTRA_THEME_SETTINGS . '[woo-shop-skin-divider]',
					'section'  => 'woocommerce_product_catalog',
					'title'    => __( 'Shop Skin Layout', 'astra' ),
					'type'     => 'control',
					'control'  => 'ast-heading',
					'priority' => 10,
					'settings' => array(),
					'divider'  => array( 'ast_class' => 'ast-section-spacing ast-bottom-spacing' ),
				),
				

				/**
				 * Link to the shop skin layout.
				 */
				array(
					'name'           => ASTRA_THEME_SETTINGS . '[shop-skin-section-link]',
					'type'           => 'control',
					'control'        => 'ast-customizer-link',
					'section'        => 'woocommerce_product_catalog',
					'panel'          => 'woocommerce',
					'priority'       => 10,
					'is_button_link' => true,
					'link_type'      => 'section',
					'linked'         => 'section-woo-shop-skin',
					'link_text'      => __( 'Shop Skin Layout', 'astra' ),
				),

				/**
				 * Option: Shop Archive Content Width
				 */
				array(
					'name'       => ASTRA_THEME_SETTINGS . '[shop-archive-width]',
					'type'       => 'control',
					'control'    => 'ast-selector',
					'section'    => 'section-woo-shop-skin',
					'default'    => astra_get_option( 'shop-archive-width' ),
					'priority'   => 10,
					'title'      => __( 'Shop Archive Content Width', 'astra' ),
					'choices'    => array(
						'default' => __( 'Default', 'astra' ),
						'custom'  => __( 'Custom', 'astra' ),
					),
					'transport'  => 'refresh',
					'renderAs'   => 'text',
					'responsive' => false,
					'divider'    => array( 'ast_class' => 'ast-section-spacing' ),
				),

				/**
				 * Option: Enter Width
				 */
				array(
					'name'        => ASTRA_THEME_SETTINGS . '[shop-archive-max-width]',
					'type'        => 'control',
					'control'     => 'ast-slider',
					'section'     => 'section-woo-shop-skin',
					'default'     => astra_get_option( 'shop-archive-max-width' ),
					'priority'    => 10,
					'title'       => __( 'Custom Width', 'astra' ),
					'transport'   => 'postMessage',
					'suffix'      => 'px',
					'input_attrs' => array(
						'min'  => 768,
						'step' => 1,
						'max'  => 1920,
					),
					'context'     => array(
						Astra_Builder_Helper::$general_tab_config,
						array(
							'setting'  => ASTRA_THEME_SETTINGS . '[shop-archive-width]',
							'operator' => '===',
							'value'    => 'custom',
						),
					),
					'divider'     => array( 'ast_class' => 'ast-top-dotted-divider' ),
				),
			);

			$configurations = array_merge( $configurations, $_configs );

			return $configurations;

		}
	}
}

new Astra_Woo_Shop_Layout_Configs();

