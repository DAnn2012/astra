<?php
/**
 * Footer Navigation Menu component.
 *
 * @package     Astra Builder
 * @author      Brainstorm Force
 * @copyright   Copyright (c) 2020, Brainstorm Force
 * @link        https://www.brainstormforce.com
 * @since       Astra x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'ASTRA_BUILDER_FOOTER_MENU_DIR', ASTRA_THEME_DIR . 'inc/customizer/builder/customizer/configuration/footer/menu' );
define( 'ASTRA_BUILDER_FOOTER_MENU_URI', ASTRA_THEME_URI . 'inc/builder/customizer/configuration/footer/menu' );

if ( ! class_exists( 'Astra_Footer_Menu_Component' ) ) {

	/**
	 * Footer Navigation Menu Initial Setup
	 *
	 * @since x.x.x
	 */
	class Astra_Footer_Menu_Component {

		/**
		 * Constructor function that initializes required actions and hooks
		 */
		public function __construct() {

			require_once ASTRA_BUILDER_FOOTER_MENU_DIR . '/class-astra-footer-menu-component-loader.php';

			// Include front end files.
			if ( ! is_admin() ) {
				require_once ASTRA_BUILDER_FOOTER_MENU_DIR . '/dynamic-css/dynamic.css.php';
			}
		}

		/**
		 * Secondary navigation markup
		 *
		 * @since x.x.x.
		 */
		public static function menu_markup() {

			// Menu Layout.
			$menu_layout_class = '';
			$menu_layout       = astra_get_option( 'footer-menu-layout' );

			if ( ! empty( $menu_layout ) ) {
				$menu_layout_class = 'astra-footer-' . esc_attr( $menu_layout ) . '-menu';
			}

			/**
			 * Filter the classes(array) for Menu (<ul>).
			 *
			 * @since  x.x.x
			 * @var Array
			 */
			$menu_classes = apply_filters( 'astra_menu_classes', array( 'main-header-menu', 'ast-nav-menu', 'ast-flex', $menu_layout_class ) );

			$items_wrap  = '<nav ';
			$items_wrap .= astra_attr(
				'site-navigation',
				array(
					'id'         => 'site-navigation',
					'class'      => 'ast-flex-grow-1 navigation-accessibility footer-navigation',
					'aria-label' => esc_attr__( 'Site Navigation', 'astra-builder' ),
				)
			);
			$items_wrap .= '>';
			$items_wrap .= '<div class="footer-nav-wrap">';
			$items_wrap .= '<ul id="%1$s" class="%2$s">%3$s</ul>';
			$items_wrap .= '</div>';
			$items_wrap .= '</nav>';

			// Secondary Menu.
			$menu_args = array(
				'depth'           => 1,
				'menu_id'         => 'astra-footer-menu',
				'menu_class'      => esc_attr( implode( ' ', $menu_classes ) ),
				'container'       => 'div',
				'container_class' => 'footer-bar-navigation',
				'items_wrap'      => $items_wrap,
				'theme_location'  => 'footer_menu',
			);

			// To add default alignment for navigation which can be added through any third party plugin.
			// Do not add any CSS from theme except header alignment.
			wp_nav_menu( $menu_args );
		}
	}

	/**
	 *  Kicking this off by creating an object.
	 */
	new Astra_Footer_Menu_Component();

}
