<?php
/**
 * Plugin Name: REST Delete Astra Settings
 * Plugin URI:  https://github.com/brainstormforce/astra
 * Description: Plugin to add REST Endpoint to delete Astra Settings.
 * Author:      Brainstorm Force
 * Author URI:  https://brainstormforce.com
 *
 * @package Astra
 */

namespace Astra\E2E;

require_once __DIR__ . '/rest-api/namespace.php';
require_once __DIR__ . '/customizer-settings/namespace.php';

REST\bootstrap();
Customizer_Settings\bootstrap();
