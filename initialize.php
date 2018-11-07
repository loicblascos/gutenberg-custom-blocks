<?php
/**
 * Initialize plugin
 *
 * @package Gutenberg Custom Blocks
 * @author  Loïc Blascos
 */

namespace Gutenberg_Custom_Blocks;

use Gutenberg_Custom_Blocks\Includes\Template;
use Gutenberg_Custom_Blocks\Includes\Blocks;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Include autoloader.
require_once GCB_PATH . 'includes/class-autoload.php';

/**
 * Init plugin.
 *
 * @since 1.0.0
 */
function init() {

	new template();
	new blocks();

}

add_action( 'plugins_loaded', 'Gutenberg_Custom_Blocks\init' );
