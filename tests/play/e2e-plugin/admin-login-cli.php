<?php

if ( class_exists( 'WP_CLI_Command' ) && ! class_exists( 'Astra_E2E_Admin_Login_CLI' ) ) :

	/**
	 * WP-Cli command to get login or trigger wp-admin area for Play test cases.
	 *
	 * @since 1.0.0
	 */
	class Astra_E2E_Admin_Login_CLI extends WP_CLI_Command {

		/**
		 * Run CLI command to get login.
		 *
		 *
		 * # Examples
		 *	wp e2e login
		 *
		 *
		 * @since 1.0.0
		 * @param  array $args        Arguments.
		 * @param  array $assoc_args Associated Arguments.
		 */
		public function login( $args = array(), $assoc_args = array() ) {
			$username = isset( $assoc_args['username'] ) ? $assoc_args['username'] : false;
			$password = isset( $assoc_args['password'] ) ? $assoc_args['password'] : false;

			if ( ! $username || ! $password ) {
				WP_CLI::error( 'Invalid arguments. Please enter valid username & password' );
			}

			$creds = array(
				'user_login'    => $username,
				'user_password' => $password,
				'remember'      => false,
			);

			$user = wp_signon( $creds, false );

			if ( is_wp_error( $user ) ) {
				WP_CLI::error( 'Can not process login, error - ' . wp_kses_post( $user->get_error_message() ) );
			}

			flush_rewrite_rules( true );

			WP_CLI::log( 'Admin login successful!' );
		}
	}

	/**
	 * Add Command
	 */
	WP_CLI::add_command( 'e2e', 'Astra_E2E_Admin_Login_CLI' );

endif;
