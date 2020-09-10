<?php
/**
 * Database Background Process
 *
 * @package Astra
 * @since 2.1.3
 */

if ( class_exists( 'Astra_WP_Background_Process' ) ) :

	/**
	 * Database Background Process
	 *
	 * @since 2.1.3
	 */
<<<<<<< HEAD:inc/theme-update/class-astra-theme-wp-background-process.php
	class Astra_Theme_WP_Background_Process extends WP_Background_Process {
=======
	class WP_Background_Process_Astra_Theme extends Astra_WP_Background_Process {
>>>>>>> abe1ab417773da8e749dbb1bccece8dcf98871d7:inc/theme-update/class-wp-background-process-astra-theme.php

		/**
		 * Database Process
		 *
		 * @var string
		 */
		protected $action = 'astra_theme_db_migration';

		/**
		 * Task
		 *
		 * Override this method to perform any actions required on each
		 * queue item. Return the modified item for further processing
		 * in the next pass through. Or, return false to remove the
		 * item from the queue.
		 *
		 * @since 2.1.3
		 *
		 * @param object $process Queue item object.
		 * @return mixed
		 */
		protected function task( $process ) {

			do_action( 'astra_batch_process_task_' . $process, $process );

			if ( function_exists( $process ) ) {
				call_user_func( $process );
			}

			if ( 'update_db_version' === $process ) {
				Astra_Theme_Background_Updater::update_db_version();
			}

			return false;
		}

		/**
		 * Complete
		 *
		 * Override if applicable, but ensure that the below actions are
		 * performed, or, call parent::complete().
		 *
		 * @since 2.1.3
		 */
		protected function complete() {
			do_action( 'astra_database_migration_complete' );
			parent::complete();
		}

	}

endif;
