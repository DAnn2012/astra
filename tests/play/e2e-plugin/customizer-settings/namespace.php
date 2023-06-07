<?php
/**
 * Customizer Settings.
 * Display the customizer settings in the customizer footer.
 *
 * @package astra
 */

namespace Astra\E2E\Customizer_Settings;

/**
 * Bootstrap the plugin.
 *
 * @return void
 */
function bootstrap() {
	add_action(
		'init',
		function () {
			if ( is_customize_preview() ) {
				add_action( 'wp_footer', __NAMESPACE__ . '\\dump_customizer_settings' );
			}
		}
	);

	add_action(
		'wp_head',
		function () {
			echo '<style id="astra-e2e-custom-css">
				body a {
					text-decoration: underline;
				}
			</style>';
		}
	);
}

/**
 * Dump the customizer settings in JSON format.
 *
 * @return void
 */
function dump_customizer_settings() {
	$customizer_settings = get_option( 'astra-settings', array() );

	echo '<pre>';
	echo wp_json_encode( $customizer_settings, JSON_PRETTY_PRINT );
	echo '</pre>';
}
