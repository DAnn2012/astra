<?php
/**
 * Scroll to Top - Customizer.
 *
 * @package Astra
 * @since x.x.x
 */

/**
 * Customizer Initialization
 *
 * @since x.x.x
 */
class Astra_Scroll_To_Top_Loader {

	/**
	 * Member Variable
	 *
	 * @var null $instance
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			/** @psalm-suppress InvalidPropertyAssignmentValue */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			self::$instance = new self();
			/** @psalm-suppress InvalidPropertyAssignmentValue */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		}
		return self::$instance;
	}

	/**
	 *  Constructor
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		add_filter( 'astra_theme_defaults', array( $this, 'theme_defaults' ) );
		add_action( 'customize_register', array( $this, 'new_customize_register' ), 2 );
		add_action( 'customize_preview_init', array( $this, 'preview_scripts' ) );
		add_action( 'wp_footer', array( $this, 'html_markup_loader' ) );
	}

	/**
	 * Set Options Default Values
	 *
	 * @param  array $defaults  Astra options default value array.
	 * @return array
	 * @since x.x.x
	 */
	public function theme_defaults( $defaults ) {

		$defaults['scroll-to-top-enable']          = true;
		$defaults['scroll-to-top-icon-size']       = 15;
		$defaults['scroll-to-top-icon-position']   = 'right';
		$defaults['scroll-to-top-on-devices']      = 'both';
		$defaults['scroll-to-top-icon-radius']     = '';
		$defaults['scroll-to-top-icon-color']      = '';
		$defaults['scroll-to-top-icon-h-color']    = '';
		$defaults['scroll-to-top-icon-bg-color']   = '';
		$defaults['scroll-to-top-icon-h-bg-color'] = '';

		return $defaults;
	}

	/**
	 * Add customizer configs for scroll to top in the Theme Customizer.
	 *
	 * @param WP_Customize_Manager $wp_customize Theme Customizer object.
	 * @since x.x.x
	 */
	public function new_customize_register( $wp_customize ) {
		require_once ASTRA_SCROLL_TO_TOP_DIR . 'classes/customizer/class-astra-scroll-to-top-configs.php';
	}

	/**
	 * Customizer Preview
	 *
	 * @since x.x.x
	 */
	public function preview_scripts() {
		/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
		if ( SCRIPT_DEBUG ) {
			/** @psalm-suppress RedundantCondition */ // phpcs:ignore Generic.Commenting.DocComment.MissingShort
			wp_enqueue_script( 'astra-scroll-to-top-customize-preview-js', ASTRA_SCROLL_TO_TOP_URL . 'assets/js/unminified/customizer-preview.js', array( 'customize-preview', 'astra-customizer-preview-js' ), ASTRA_THEME_VERSION, true );
		} else {
			wp_enqueue_script( 'astra-scroll-to-top-customize-preview-js', ASTRA_SCROLL_TO_TOP_URL . 'assets/js/minified/customizer-preview.min.js', array( 'customize-preview', 'astra-customizer-preview-js' ), ASTRA_THEME_VERSION, true );
		}
	}

	/**
	 * Scroll to Top addon markup loader
	 *
	 * Loads appropriate template file based on the style option selected in options panel.
	 *
	 * @since x.x.x
	 */
	public function html_markup_loader() {
		if ( true === astra_get_option( 'scroll-to-top-enable', true ) ) {
			get_template_part( 'template-parts/scroll-to-top' );
		}
	}
}

/**
*  Kicking this off by calling 'get_instance()' method
*/
Astra_Scroll_To_Top_Loader::get_instance();