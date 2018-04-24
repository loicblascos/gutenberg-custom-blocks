<?php
/**
 * Gutenberg Custom Blocks Plugin
 *
 * @package Gutenberg Custom Blocks
 * @author  Loïc Blascos
 *
 * @wordpress-plugin
 * Plugin Name:  Gutenberg Custom Blocks
 * Description:  Custom blocks for Gutenberg
 * Version:      1.0.2
 * Author:       Loïc Blascos
 * Text Domain:  gutenberg-custom-blocks
 * Domain Path:  /languages
 * License:      GPL2+
 * License URI:  http://www.gnu.org/licenses/gpl-2.0.txt
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'GCB_VERSION', '1.0.2' );
define( 'GCB_FILE', __FILE__ );
define( 'GCB_BASE', plugin_basename( __FILE__ ) );
define( 'GCB_PATH', plugin_dir_path( __FILE__ ) );
define( 'GCB_URL', plugin_dir_url( __FILE__ ) );

/**
 * Load plugin text domain for translations.
 *
 * @since 1.0.0
 */
function gutenberg_custom_blocks_textdomain() {

	load_plugin_textdomain(
		'gutenberg-custom-blocks',
		false,
		basename( dirname( __FILE__ ) ) . '/languages'
	);

	// Translate plugin description.
	__( 'Custom blocks for Gutenberg', 'gutenberg-custom-blocks' );

}

add_action( 'plugins_loaded', 'gutenberg_custom_blocks_textdomain' );

// Include compatibility class.
$compat = require_once( GCB_PATH . 'compat.php' );

// If compatibility issue.
if ( ! $compat ) {
	// Stop execution of the plugin.
	return;
}

// Include autoload.
require_once( GCB_PATH . 'includes/class-autoload.php' );

// Class names as strings to prevent parsing errors for PHP inferior to 5.3.
$blocks   = '\Gutenberg_Custom_Blocks\Includes\Blocks';
$template = '\Gutenberg_Custom_Blocks\Includes\Template';

new $blocks();
new $template();
