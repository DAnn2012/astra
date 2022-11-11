<?php
/**
 * Class Astra_Menu.
 *
 * @package Astra
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

class Astra_Menu {

	/**
	 * Instance
	 *
	 * @access private
	 * @var object Class object.
	 * @since x.x.x
	 */
	private static $instance;

	/**
	 * Initiator
	 *
	 * @since x.x.x
	 * @return object initialized object of class.
	 */
	public static function get_instance() {
		if ( ! isset( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Menu page title
	 *
	 * @since 1.0
	 * @var array $menu_page_title
	 */
	public static $menu_page_title;

	/**
	 * Page title
	 *
	 * @since 1.0
	 * @var string $page_title
	 */
	public static $page_title = 'Astra';

	/**
	 * Plugin slug
	 *
	 * @since 1.0
	 * @var array $plugin_slug
	 */
	public static $plugin_slug = 'astra';

	/**
	 * Constructor
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		$this->initialize_hooks();
	}

	/**
	 * Init Hooks.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function initialize_hooks() {

		self::$menu_page_title = apply_filters( 'astra_menu_page_title', __( 'Astra Options', 'astra' ) );
		self::$page_title      = apply_filters( 'astra_page_title', __( 'Astra', 'astra' ) );
		self::$plugin_slug     = self::get_theme_page_slug();

		add_action( 'admin_menu', array( $this, 'setup_menu' ) );
		add_action( 'admin_init', array( $this, 'settings_admin_scripts' ) );

		add_action( 'after_setup_theme', array( $this, 'init_admin_settings' ), 99 );

		// Start dashboard view.
		add_action( 'astra_render_admin_page_content', array( $this, 'render_content' ), 10, 2 );
	}

	/**
	 * Admin settings init.
	 *
	 * @since x.x.x
	 */
	public function init_admin_settings() {
		if ( ! is_customize_preview() ) {
			add_action( 'admin_head', array( $this, 'admin_submenu_css' ) );
		}
	}

	/**
	 * Add custom CSS for admin area sub menu icons.
	 *
	 * @since x.x.x
	 */
	public function admin_submenu_css() {
		echo '<style class="astra-menu-appearance-style">
				#toplevel_page_' . esc_attr( self::$plugin_slug ) . ' .wp-menu-image.svg {
					background-size: 18px auto !important;
				}
			</style>';
	}

	/**
	 * Theme options page Slug getter including White Label string.
	 *
	 * @since x.x.x
	 * @return string Theme Options Page Slug.
	 */
	public static function get_theme_page_slug() {
		return apply_filters( 'astra_theme_page_slug', self::$plugin_slug );
	}

	/**
	 *  Initialize after Astra gets loaded.
	 *
	 * @since x.x.x
	 */
	public function settings_admin_scripts() {
		// Enqueue admin scripts.
		if ( ! empty( $_GET['page'] ) && ( self::$plugin_slug === $_GET['page'] || false !== strpos( $_GET['page'], self::$plugin_slug . '_' ) ) ) { //phpcs:ignore
			add_action( 'admin_enqueue_scripts', array( $this, 'styles_scripts' ) );
			add_filter( 'admin_footer_text', array( $this, 'add_footer_link' ), 99 );
		}
	}

	/**
	 * Add submenu to admin menu.
	 *
	 * @since x.x.x
	 */
	public function setup_menu() {
		global $submenu;
		$capability = 'manage_options';

		if ( ! current_user_can( $capability ) ) {
			return;
		}

		$astra_icon = apply_filters( 'astra_menu_icon', 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik05IDE4QzEzLjk3MDcgMTggMTggMTMuOTcwNyAxOCA5QzE4IDQuMDI5MyAxMy45NzA3IDAgOSAwQzQuMDI5MyAwIDAgNC4wMjkzIDAgOUMwIDEzLjk3MDcgNC4wMjkzIDE4IDkgMThaTTQgMTIuOTk4TDguMzk2IDRMOS40NDE0MSA2LjAzMTI1TDUuODgzNzkgMTIuOTk4SDRaTTguNTM0NjcgMTEuMzc1TDEwLjM0OTEgNy43MjA3TDEzIDEzSDEwLjk3NzFMMTAuMjc5MyAxMS40NDM0SDguNTM0NjdIOC41TDguNTM0NjcgMTEuMzc1WiIgZmlsbD0iI2ZmZiIvPgo8L3N2Zz4K' );

		add_menu_page(
			self::$page_title,
			self::$page_title,
			$capability,
			self::$plugin_slug,
			array( $this, 'render_admin_dashboard' ),
			$astra_icon,
			59
		);

		// Add Customize submenu.
		add_submenu_page(
			self::$plugin_slug,
			__( 'Customize', 'astra' ),
			__( 'Customize', 'astra' ),
			$capability,
			'customize.php'
		);

		// Add Custom Layout submenu.
		$show_custom_layout_submenu = ( defined( 'ASTRA_EXT_VER' ) && ! Astra_Ext_Extension::is_active( 'advanced-hooks' ) ) ? false : true;
		if ( $show_custom_layout_submenu ) {
			add_submenu_page(
				self::$plugin_slug,
				__( 'Custom Layouts', 'astra' ),
				__( 'Custom Layouts', 'astra' ),
				$capability,
				( defined( 'ASTRA_EXT_VER' ) && Astra_Ext_Extension::is_active( 'advanced-hooks' ) ) ? 'edit.php?post_type=astra-advanced-hook' : 'admin.php?page=' . self::$plugin_slug . '&path=custom-layouts'
			);
		}

		// Add Spectra submenu.
		add_submenu_page(
			self::$plugin_slug,
			__( 'Spectra', 'astra' ),
			__( 'Spectra', 'astra' ),
			$capability,
			defined( 'UAGB_VER' ) ? admin_url( 'options-general.php?page=' . UAGB_SLUG ) : 'admin.php?page=' . self::$plugin_slug . '&path=spectra'
		);

		// Rename to Home menu.
		$submenu[ self::$plugin_slug ][0][0] = __( 'Dashboard', 'astra' );
	}

	/**
	 * Renders the admin settings.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function render_admin_dashboard() {
		$page_action    = '';
		$menu_page_slug = ( ! empty( $_GET['page'] ) ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : self::$plugin_slug; //phpcs:ignore

		if ( isset( $_GET['action'] ) ) { //phpcs:ignore
			$page_action = sanitize_text_field( wp_unslash( $_GET['action'] ) ); //phpcs:ignore
			$page_action = str_replace( '_', '-', $page_action );
		}

		include_once ASTRA_THEME_ADMIN_DIR . 'views/admin-base.php';
	}

	/**
	 * Renders the admin settings content.
	 *
	 * @since x.x.x
	 * @param sting $menu_page_slug current page name.
	 * @param sting $page_action current page action.
	 *
	 * @return void
	 */
	public function render_content( $menu_page_slug, $page_action ) {
		if ( self::$plugin_slug === $menu_page_slug ) {
			include_once ASTRA_THEME_ADMIN_DIR . 'views/dashboard-app.php';
		}
	}

	/**
	 * Enqueues the needed CSS/JS for the builder's admin settings page.
	 *
	 * @since x.x.x
	 */
	public function styles_scripts() {

		if ( is_customize_preview() ) {
			return;
		}

		wp_enqueue_style( 'astra-admin-font', 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap', array(), ASTRA_THEME_VERSION ); // Styles.

		wp_enqueue_style( 'wp-components' );

		$localize = array(
			'current_user'                       => ! empty( wp_get_current_user()->user_firstname ) ? ucfirst( wp_get_current_user()->user_firstname ) : ucfirst( wp_get_current_user()->display_name ),
			'admin_base_url'                     => admin_url(),
			'plugin_dir'                         => ASTRA_THEME_URI,
			'plugin_ver'                         => ASTRA_THEME_VERSION,
			'version'                            => ASTRA_THEME_VERSION,
			'pro_available'                      => defined( 'ASTRA_EXT_VER' ) ? true : false,
			'theme_name'                         => astra_get_theme_name(),
			'plugin_name'                        => astra_get_addon_name(),
			'quick_settings'                     => self::astra_get_quick_links(),
			'ajax_url'                           => admin_url( 'admin-ajax.php' ),
			'is_whitelabel'                      => astra_is_white_labelled(),
			'show_self_branding'                 => is_callable( 'Astra_Ext_White_Label_Markup::show_branding' ) ? Astra_Ext_White_Label_Markup::show_branding() : true,
			'admin_url'                          => admin_url( 'admin.php' ),
			'home_slug'                          => self::$plugin_slug,
			'upgrade_url'                        => ASTRA_PRO_UPGRADE_URL,
			'customize_url'                      => admin_url( 'customize.php' ),
			'astra_base_url'                     => admin_url( 'admin.php?page=' . self::$plugin_slug ),
			'astra_changelog_data'               => self::astra_get_theme_changelog_feed_data(),
			'logo_url'                           => apply_filters( 'astra_admin_menu_icon', ASTRA_THEME_URI . 'inc/assets/images/astra-logo.svg' ),
			'update_nonce'                       => wp_create_nonce( 'astra_update_admin_setting' ),
			'integrations'                       => self::astra_get_integrations_status(),
			'show_plugins'                       => apply_filters( 'astra_show_free_extend_plugins', true ), // Legacy filter support.
			'useful_plugins'                     => self::astra_get_useful_plugins(),
			'extensions'                         => self::astra_get_pro_extensions(),
			'plugin_manager_nonce'               => wp_create_nonce( 'astra_plugin_manager_nonce' ),
			'plugin_installer_nonce'             => wp_create_nonce( 'updates' ),
			'free_vs_pro_link'                   => admin_url( 'admin.php?page=' . self::$plugin_slug . '&path=free-vs-pro' ),
			'show_builder_migration'             => Astra_Builder_Helper::is_new_user() ? false : true,
			'plugin_installing_text'             => __( 'Installing', 'astra' ) . '&hellip;',
			'plugin_installed_text'              => __( 'Installed', 'astra' ),
			'plugin_activating_text'             => __( 'Activating', 'astra' ) . '&hellip;',
			'recommendedPluiginDeactivatingText' => __( 'Deactivating', 'astra' ) . '&hellip;',
			'plugin_activated_text'              => __( 'Activated', 'astra' ),
			'plugin_activate_text'               => __( 'Activate', 'astra' ),
			'starter_templates_data'             => self::get_starter_template_plugin_data(),
			'astra_docs_data'                    => self::get_astra_docs_data(),
		);

		$this->settings_app_scripts( apply_filters( 'astra_react_admin_localize', $localize ) );
	}

	/**
	 * Get customizer quick links for easy navigation.
	 *
	 * @return array
	 * @since x.x.x
	 */
	public static function astra_get_quick_links() {
		return apply_filters(
			'astra_quick_settings',
			array(
				'logo-favicon' => array(
					'title'     => __( 'Site Identity', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[control]=custom_logo' ),
				),
				'header'       => array(
					'title'     => __( 'Header Settings', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[panel]=panel-header-group' ),
				),
				'footer'       => array(
					'title'     => __( 'Footer Settings', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-footer-group' ),
				),
				'colors'       => array(
					'title'     => __( 'Color', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-colors-background' ),
				),
				'typography'   => array(
					'title'     => __( 'Typography', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-typography' ),
				),
				'button'       => array(
					'title'     => __( 'Button', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-buttons' ),
				),
				'blog-options' => array(
					'title'     => __( 'Blog Options', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-blog-group' ),
				),
				'layout'       => array(
					'title'     => __( 'Layout', 'astra' ),
					'quick_url' => admin_url( 'customize.php?autofocus[section]=section-container-layout' ),
				),
				'menus'        => array(
					'title'     => __( 'Menus', 'astra' ),
					'quick_url' => admin_url( 'nav-menus.php' ),
				),
			)
		);
	}

	/**
	 * Get Starter Templates plugin data.
	 *
	 * @return array
	 * @since x.x.x
	 */
	public static function get_starter_template_plugin_data() {
		$st_data = array(
			'title'            => __( 'Starter Templates', 'astra' ),
			'description'      => __( 'Create professional designed pixel perfect websites in minutes. Get access to 280+ pre-made full website templates for your favorite page builder.', 'astra' ),
			'is_available'     => defined( 'ASTRA_PRO_SITES_VER' ) || defined( 'ASTRA_SITES_VER' ) ? true : false,
			'redirection_link' => admin_url( 'themes.php?page=starter-templates' ),
		);

		$skip_free_version = false;
		$pro_plugin_status = self::get_plugin_status( 'astra-pro-sites/astra-pro-sites.php' );

		if ( 'installed' === $pro_plugin_status ) {
			$skip_free_version = true;
			$st_data['slug']   = 'astra-pro-sites';
			$st_data['status'] = $pro_plugin_status;
			$st_data['path']   = 'astra-pro-sites/astra-pro-sites.php';
		}

		$free_plugin_status = self::get_plugin_status( 'astra-sites/astra-sites.php' );
		if ( ! $skip_free_version ) {
			$st_data['slug']   = 'astra-sites';
			$st_data['status'] = $free_plugin_status;
			$st_data['path']   = 'astra-sites/astra-sites.php';
		}

		return $st_data;
	}

	/**
	 * Get plugin status
	 *
	 * @since x.x.x
	 *
	 * @param  string $plugin_init_file Plguin init file.
	 * @return mixed
	 */
	public static function get_plugin_status( $plugin_init_file ) {

		$installed_plugins = get_plugins();

		if ( ! isset( $installed_plugins[ $plugin_init_file ] ) ) {
			return 'install';
		} elseif ( is_plugin_active( $plugin_init_file ) ) {
			return 'activated';
		} else {
			return 'installed';
		}
	}

	/**
	 * Get Astra's pro extension list.
	 *
	 * @since x.x.x
	 * @return array
	 * @access public
	 */
	public static function astra_get_pro_extensions() {
		return apply_filters(
			'astra_addon_list',
			array(
				'colors-and-background' => array(
					'title'     => __( 'Colors & Background', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/colors-background-module/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/colors-background-module/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'typography'            => array(
					'title'     => __( 'Typography', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/typography-module/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/typography-module/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'spacing'               => array(
					'title'     => __( 'Spacing', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/spacing-addon-overview/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/spacing-addon-overview/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'blog-pro'              => array(
					'title'     => __( 'Blog Pro', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/blog-pro-overview/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/blog-pro-overview/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'mobile-header'         => array(
					'title'     => __( 'Mobile Header', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/mobile-header-with-astra/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/mobile-header-with-astra/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'header-sections'       => array(
					'title'     => __( 'Header Sections', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/header-sections-pro/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/header-sections-pro/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'sticky-header'         => array(
					'title'     => __( 'Sticky Header', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/sticky-header-pro/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/sticky-header-pro/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'site-layouts'          => array(
					'title'     => __( 'Site Layouts', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/site-layout-overview/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/site-layout-overview/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'advanced-footer'       => array(
					'title'     => __( 'Footer Widgets', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/footer-widgets-astra-pro/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/footer-widgets-astra-pro/', 'astra-dashboard', 'learn-more', 'welcome-page' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'scroll-to-top'         => array(
					'title'     => __( 'Scroll To Top', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/scroll-to-top-pro/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/scroll-to-top-pro/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'nav-menu'              => array(
					'title'     => __( 'Nav Menu', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/nav-menu-addon/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/nav-menu-addon/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'advanced-hooks'        => array(
					'title'           => __( 'Custom Layouts', 'astra' ),
					'description'     => __( 'Add content conditionally in the various hook areas of the theme.', 'astra' ),
					'manage_settings' => true,
					'class'           => 'ast-addon',
					'title_url'       => astra_get_pro_url( 'https://wpastra.com/docs/custom-layouts-pro/', 'welcome_page', 'features', 'astra_theme' ),
					'links'           => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/custom-layouts-pro/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'advanced-headers'      => array(
					'title'           => __( 'Page Headers', 'astra' ),
					'description'     => __( 'Make your header layouts look more appealing and sexy!', 'astra' ),
					'manage_settings' => true,
					'class'           => 'ast-addon',
					'title_url'       => astra_get_pro_url( 'https://wpastra.com/docs/page-headers-overview/', 'welcome_page', 'features', 'astra_theme' ),
					'links'           => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/page-headers-overview/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'woocommerce'           => array(
					'title'     => __( 'WooCommerce', 'astra' ),
					'class'     => 'ast-addon',
					'condition'	=> class_exists( 'WooCommerce' ) ? true : false,
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/woocommerce-module-overview/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/woocommerce-module-overview/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'edd'                   => array(
					'title'     => __( 'Easy Digital Downloads', 'astra' ),
					'class'     => 'ast-addon',
					'condition'	=> class_exists( 'Easy_Digital_Downloads' ) ? true : false,
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/easy-digital-downloads-module-overview/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/easy-digital-downloads-module-overview/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'learndash'             => array(
					'title'       => __( 'LearnDash', 'astra' ),
					'condition'	=> class_exists( 'SFWD_LMS' ) ? true : false,
					'description' => __( 'Supercharge your LearnDash website with amazing design features.', 'astra' ),
					'class'       => 'ast-addon',
					'title_url'   => astra_get_pro_url( 'https://wpastra.com/docs/learndash-integration-in-astra-pro/', 'welcome_page', 'features', 'astra_theme' ),
					'links'       => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/learndash-integration-in-astra-pro/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'lifterlms'             => array(
					'title'     => __( 'LifterLMS', 'astra' ),
					'class'     => 'ast-addon',
					'condition'	=> class_exists( 'LifterLMS' ) ? true : false,
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/lifterlms-module-pro/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/lifterlms-module-pro/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
				'white-label'           => array(
					'title'     => __( 'White Label', 'astra' ),
					'class'     => 'ast-addon',
					'title_url' => astra_get_pro_url( 'https://wpastra.com/docs/how-to-white-label-astra/', 'welcome_page', 'features', 'astra_theme' ),
					'links'     => array(
						array(
							'link_class'   => 'ast-learn-more',
							'link_url'     => astra_get_pro_url( 'https://wpastra.com/docs/how-to-white-label-astra/', 'welcome_page', 'features', 'astra_theme' ),
							'link_text'    => __( 'Documentation', 'astra' ),
							'target_blank' => true,
						),
					),
				),
			)
		);
	}

	/**
	 * Get Astra's useful plugins.
	 * Extend this in following way -
	 *
	 * array(
	 *      'title' => "Plugin Name",
	 *      'subtitle' => "Plugin description goes here.",
	 *      'status' => self::get_plugin_status( 'plugin-slug/plugin-slug.php' ),
	 *      'logoPath' => array(
	 *          'internal_icon' => true, // true = will take internal Astra's any icon. false = provide next custom icon link.
	 *          'icon_path' => "spectra", // If internal_icon false then - example custom SVG URL: ASTRA_THEME_URI . 'inc/assets/images/astra.svg'.
	 *      ),
	 *  ),
	 *
	 * @since x.x.x
	 * @return array
	 * @access public
	 */
	public static function astra_get_useful_plugins() {
		return apply_filters(
			'astra_useful_plugins',
			array(
				array(
					'title'    => __( 'Spectra', 'astra' ),
					'subtitle' => __( 'Free WordPress Page Builder', 'astra' ),
					'status'   => self::get_plugin_status( 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' ),
					'slug'     => 'ultimate-addons-for-gutenberg',
					'path'     => 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php',
					'logoPath' => array(
						'internal_icon' => true,
						'icon_path'     => 'spectra',
					),
				),
				array(
					'title'    => __( 'Yoast SEO', 'astra' ),
					'subtitle' => __( 'SEO plugin', 'astra' ),
					'status'   => self::get_plugin_status( 'wordpress-seo/wp-seo.php' ),
					'slug'     => 'wordpress-seo',
					'path'     => 'wordpress-seo/wp-seo.php',
					'logoPath' => array(
						'internal_icon' => true,
						'icon_path'     => 'yoast-seo',
					),
				),
				array(
					'title'    => __( 'Elementor', 'astra' ),
					'subtitle' => __( 'Popular Page Builder', 'astra' ),
					'status'   => self::get_plugin_status( 'elementor/elementor.php' ),
					'slug'     => 'elementor',
					'path'     => 'elementor/elementor.php',
					'logoPath' => array(
						'internal_icon' => true,
						'icon_path'     => 'elementor',
					),
				),
				array(
					'title'    => __( 'WooCommerce', 'astra' ),
					'subtitle' => __( 'eCommerce plugin', 'astra' ),
					'status'   => self::get_plugin_status( 'woocommerce/woocommerce.php' ),
					'slug'     => 'woocommerce',
					'path'     => 'woocommerce/woocommerce.php',
					'logoPath' => array(
						'internal_icon' => true,
						'icon_path'     => 'woocommerce',
					),
				),
				array(
					'title'    => __( 'WPForms Lite', 'astra' ),
					'subtitle' => __( 'WordPress form builder', 'astra' ),
					'status'   => self::get_plugin_status( 'wpforms-lite/wpforms.php' ),
					'slug'     => 'wpforms-lite',
					'path'     => 'wpforms-lite/wpforms.php',
					'logoPath' => array(
						'internal_icon' => true,
						'icon_path'     => 'wp-forms',
					),
				),
			)
		);
	}

	/**
	 * Get Astra's recommended integrations.
	 * Extend this in following way -
	 *
	 * array(
	 *      'title' => "Plugin Name",
	 *      'subtitle' => "Plugin description goes here.",
	 *      'isPro' => false,
	 *      'status' => self::get_plugin_status( 'plugin-slug/plugin-slug.php' ),
	 *      'logoPath' => array(
	 *          'internal_icon' => true, // true = will take internal Astra's any icon. false = provide next custom icon link.
	 *          'icon_path' => "spectra", // If internal_icon false then - example custom SVG URL: ASTRA_THEME_URI . 'inc/assets/images/astra.svg'.
	 *      ),
	 *  ),
	 *
	 * @since x.x.x
	 * @return array
	 * @access public
	 */
	public static function astra_get_integrations_status() {
		return apply_filters(
			'astra_integrated_plugins',
			array(
				array(
					'title'    => __( 'Spectra', 'astra' ),
					'subtitle' => __( 'Feature-rich Gutenberg blocks that help build websites faster.', 'astra' ),
					'isPro'    => false,
					'status'   => self::get_plugin_status( 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' ),
					'slug'     => 'ultimate-addons-for-gutenberg',
					'path'     => 'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php',
					'logoPath' => array(
						'internal_icon' => true,
						'icon_path'     => 'spectra',
					),
				),
				array(
					'title'    => __( 'WooCommerce', 'astra' ),
					'subtitle' => __( 'An eCommerce toolkit that helps you sell anything. Beautifully.', 'astra' ),
					'isPro'    => false,
					'status'   => self::get_plugin_status( 'woocommerce/woocommerce.php' ),
					'slug'     => 'woocommerce',
					'path'     => 'woocommerce/woocommerce.php',
					'logoPath' => array(
						'internal_icon' => true,
						'icon_path'     => 'woocommerce',
					),
				),
				array(
					'title'    => __( 'CartFlows', 'astra' ),
					'subtitle' => __( 'Create beautiful checkout pages & sales flows for WooCommerce.', 'astra' ),
					'isPro'    => false,
					'status'   => self::get_plugin_status( 'cartflows/cartflows.php' ),
					'slug'     => 'cartflows',
					'path'     => 'cartflows/cartflows.php',
					'logoPath' => array(
						'internal_icon' => true,
						'icon_path'     => 'cart-flows',
					),
				),
			)
		);
	}

	/**
	 * Get Theme Rollback versions.
	 *
	 * @since x.x.x
	 * @param $product astra-theme / astra-addon
	 * @return array
	 * @access public
	 */
	public static function astra_get_rollback_versions( $product = 'astra-theme' ) {

		$rollback_versions = Astra_Rollback_version::get_theme_all_versions();

		if ( 'astra-addon' === $product ) {
			$product_id        = bsf_extract_product_id( ASTRA_EXT_DIR );
			$product_details   = get_brainstorm_product( $product_id );
			$installed_version = isset( $product_details['version'] ) ? $product_details['version'] : '';
			$product_versions  = BSF_Rollback_Version::bsf_get_product_versions( $product_id ); // Get Remote versions
			// Show versions above than latest install version of the product.
			$rollback_versions = BSF_Rollback_Version::sort_product_versions( $product_versions, $installed_version );
		}

		$rollback_versions_options = array();

		foreach ( $rollback_versions as $version ) {

			$version = array(
				'label' => $version,
				'value' => $version,
			);

			$rollback_versions_options[] = $version;
		}

		return $rollback_versions_options;
	}

	/**
	 * Get Changelogs from API.
	 *
	 * @since x.x.x
	 * @return array $changelog_data Changelog Data.
	 */
	public static function astra_get_theme_changelog_feed_data() {
		$changelog_data = array();
		$posts          = json_decode( wp_remote_retrieve_body( wp_remote_get( 'https://wpastra.com/wp-json/wp/v2/changelog?product=97&per_page=3' ) ) ); // Astra theme.

		if ( isset( $posts ) && is_array( $posts ) ) {
			foreach ( $posts as $post ) {
				$changelog_data[] = array(
					'title'       => $post->title->rendered,
					'date'        => gmdate( 'l F j, Y', strtotime( $post->date ) ),
					'description' => $post->content->rendered,
					'link'        => $post->link,
				);
			}
		}

		return $changelog_data;
	}

	/**
	 * Settings app scripts
	 *
	 * @since x.x.x
	 * @param array $localize Variable names.
	 */
	public function settings_app_scripts( $localize ) {
		$handle            = 'astra-admin-dashboard-app';
		$build_path        = ASTRA_THEME_ADMIN_DIR . 'assets/build/';
		$build_url         = ASTRA_THEME_ADMIN_URL . 'assets/build/';
		$script_asset_path = $build_path . 'dashboard-app.asset.php';

		$script_info = file_exists( $script_asset_path ) ? include $script_asset_path : array(
			'dependencies' => array(),
			'version'      => ASTRA_THEME_VERSION,
		);

		$script_dep = array_merge( $script_info['dependencies'], array( 'updates', 'wp-hooks' ) );

		wp_register_script(
			$handle,
			$build_url . 'dashboard-app.js',
			$script_dep,
			$script_info['version'],
			true
		);

		wp_register_style(
			$handle,
			$build_url . 'dashboard-app.css',
			array(),
			ASTRA_THEME_VERSION
		);

		wp_register_style(
			'astra-admin-google-fonts',
			'https://fonts.googleapis.com/css2?family=Inter:wght@200&display=swap',
			array(),
			ASTRA_THEME_VERSION
		);

		wp_enqueue_script( $handle );

		wp_set_script_translations( $handle, 'astra' );

		wp_enqueue_style( 'astra-admin-google-fonts' );
		wp_enqueue_style( $handle );

		wp_style_add_data( $handle, 'rtl', 'replace' );

		wp_localize_script( $handle, 'astra_admin', $localize );
	}

	/**
	 *  Add footer link.
	 *
	 * @since x.x.x
	 */
	public function add_footer_link() {
		echo '<span id="footer-thankyou"> Thank you for using <span class="focus:text-astra-hover active:text-astra-hover hover:text-astra-hover"> ' . esc_attr( astra_get_theme_name() ) . '.</span></span>';
	}

	/**
	 * Get Docs from API.
	 *
	 * @since x.x.x
	 * @return array $astra_docs_data Astra Docs Data.
	 */
	public static function get_astra_docs_data() {
		$astra_docs_data = json_decode( wp_remote_retrieve_body( wp_remote_get( 'https://specialtime.s2-tastewp.com/wp-json/powerful-docs/v1/get-docs' ) ) ); // Astra theme.
		return $astra_docs_data;
	}
}

Astra_Menu::get_instance();
