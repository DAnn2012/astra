<?php
/**
 * Scroll To Top Addon
 *
 * @since x.x.x
 * @package Astra
 */

define( 'ASTRA_SCROLL_TO_TOP_DIR', ASTRA_THEME_DIR . 'inc/addons/scroll-to-top/' );
define( 'ASTRA_SCROLL_TO_TOP_URL', ASTRA_THEME_URI . 'inc/addons/scroll-to-top/' );

/**
 * Scroll To Top Initial Setup
 *
 * @since x.x.x
 */
class Astra_Scroll_To_Top {

	/**
	 * Member Variable
	 *
	 * @var object instance
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor function that initializes required actions and hooks
	 */
	public function __construct() {

		require_once ASTRA_SCROLL_TO_TOP_DIR . 'classes/class-astra-scroll-to-top-loader.php';

		// Include front end files.
		if ( ! is_admin() ) {
			require_once ASTRA_SCROLL_TO_TOP_DIR . 'css/static-css.php';
			require_once ASTRA_SCROLL_TO_TOP_DIR . 'css/dynamic-css.php';
		}
	}
}

/**
 *  Kicking this off by calling 'get_instance()' method.
 */
Astra_Scroll_To_Top::get_instance();
