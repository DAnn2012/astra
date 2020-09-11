<?php
/**
 * Site_Identity for Astra theme.
 *
 * @package     astra-builder
 * @author      Astra
 * @copyright   Copyright (c) 2020, Astra
 * @link        https://wpastra.com/
 * @since       x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

define( 'ASTRA_HEADER_SITE_IDENTITY_DIR', ASTRA_THEME_DIR . 'inc/customizer/builder/customizer/configuration/header/site-identity' );
define( 'ASTRA_HEADER_SITE_IDENTITY_URI', ASTRA_THEME_URI . 'inc/builder/customizer/configuration/header/site-identity' );

if ( ! class_exists( 'Astra_Header_Site_Identity_Component' ) ) {

	/**
	 * Heading Initial Setup
	 *
	 * @since x.x.x
	 */
	class Astra_Header_Site_Identity_Component {

		/**
		 * Constructor function that initializes required actions and hooks
		 */
		public function __construct() {

			require_once ASTRA_HEADER_SITE_IDENTITY_DIR . '/class-astra-header-site-identity-component-loader.php';

			// Include front end files.
			if ( ! is_admin() ) {
				require_once ASTRA_HEADER_SITE_IDENTITY_DIR . '/dynamic-css/dynamic.css.php';
			}
		}
	}

	/**
	 *  Kicking this off by creating an object.
	 */
	new Astra_Header_Site_Identity_Component();
}
