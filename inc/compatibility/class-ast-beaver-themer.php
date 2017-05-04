<?php
/**
 * Beaver Themer Compatibility File.
 *
 * @package Astra
 */

// If plugin - 'Beaver Themer' not exist then return.
if ( ! class_exists( 'FLThemeBuilderLoader' ) ) {
	return;
}

/**
 * Astra Beaver Themer Compatibility
 */
if ( ! class_exists( 'Ast_Beaver_Themer' ) ) :

	/**
	 * Astra Beaver Themer Compatibility
	 *
	 * @since 1.0.0
	 */
	class Ast_Beaver_Themer {

		/**
		 * Member Variable
		 *
		 * @var object instance
		 */
		private static $instance;

		/**
		 * Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self;
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {
			add_action( 'after_setup_theme', 			array( $this, 'header_footer_support' ) );
			add_action( 'wp', 							array( $this, 'theme_header_footer_render' ) );
			add_filter( 'fl_theme_builder_part_hooks', 	array( $this, 'register_part_hooks' ) );
		}

		/**
		 * Function to add Theme Support
		 *
		 * @since 1.0.0
		 */
		function header_footer_support() {

			add_theme_support( 'fl-theme-builder-headers' );
			add_theme_support( 'fl-theme-builder-footers' );
			add_theme_support( 'fl-theme-builder-parts' );
		}

		/**
		 * Function to update Atra header/footer with Beaver template
		 *
		 * @since 1.0.0
		 */
		function theme_header_footer_render() {

			// Get the header ID.
			$header_ids = FLThemeBuilderLayoutData::get_current_page_header_ids();

			// If we have a header, remove the theme header and hook in Theme Builder's.
			if ( ! empty( $header_ids ) ) {
				remove_action( 'ast_header', 'ast_header_markup' );
				add_action( 'ast_header', 'FLThemeBuilderLayoutRenderer::render_header' );
			}

			// Get the footer ID.
			$footer_ids = FLThemeBuilderLayoutData::get_current_page_footer_ids();

			// If we have a footer, remove the theme footer and hook in Theme Builder's.
			if ( ! empty( $footer_ids ) ) {
				remove_action( 'ast_footer', 'ast_footer_markup' );
				add_action( 'ast_footer', 'FLThemeBuilderLayoutRenderer::render_footer' );
			}
		}

		/**
		 * Function to Astra theme parts
		 *
		 * @since 1.0.0
		 */
		function register_part_hooks() {

			return array(
				array(
					'label' => 'Page',
					'hooks' => array(
						'ast_body_top'    => __( 'Before Page', 'astra' ),
						'ast_body_bottom' => __( 'After Page', 'astra' ),
					),
				),
				array(
					'label' => 'Header',
					'hooks' => array(
						'ast_header_before' => __( 'Before Header', 'astra' ),
						'ast_header_after'  => __( 'After Header', 'astra' ),
					),
				),
				array(
					'label' => 'Content',
					'hooks' => array(
						'ast_content_before' => __( 'Before Content', 'astra' ),
						'ast_content_after'  => __( 'After Content', 'astra' ),
						'ast_content_top'    => __( 'Content Top', 'astra' ),
						'ast_content_bottom' => __( 'Content Bottom', 'astra' ),
					),
				),
				array(
					'label' => 'Footer',
					'hooks' => array(
						'ast_footer_before' => __( 'Before Footer', 'astra' ),
						'ast_footer_after'  => __( 'After Footer', 'astra' ),
					),
				),
				array(
					'label' => 'Sidebar',
					'hooks' => array(
						'ast_sidebars_before' => __( 'Before Sidebar', 'astra' ),
						'ast_sidebars_after'  => __( 'After Sidebar', 'astra' ),
					),
				),
				array(
					'label' => 'Posts',
					'hooks' => array(
						'loop_start'               => __( 'Loop Start', 'astra' ),
						'loop_end'                 => __( 'Loop End', 'astra' ),
						'ast_entry_before'         => __( 'Before Post', 'astra' ),
						'ast_entry_after'          => __( 'After Post', 'astra' ),
						'ast_entry_content_before' => __( 'Before Post Content', 'astra' ),
						'ast_entry_content_after'  => __( 'After Post Content', 'astra' ),
						'ast_comments_before'      => __( 'Before Comments', 'astra' ),
						'ast_comments_after'       => __( 'After Comments', 'astra' ),
					),
				),
			);
		}
	}

endif;

/**
 * Kicking this off by calling 'get_instance()' method
 */
Ast_Beaver_Themer::get_instance();
