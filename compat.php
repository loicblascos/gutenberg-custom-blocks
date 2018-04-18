<?php
/**
 * Check compatibility
 *
 * @package  Gutenberg Custom Blocks
 * @author   Loïc Blascos
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Compatibility class
 *
 * @class Gutenberg_Custom_Blocks_Compat
 * @since 1.0.0
 */
class Gutenberg_Custom_Blocks_Compat {

	/**
	 * Holds notice messages
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var array
	 */
	private static $notices = array();

	/**
	 * Run checks
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static function check() {

		self::compare();

		if ( empty( self::$notices ) ) {
			return true;
		}

		add_action( 'admin_init', array( __CLASS__, 'add_notice' ) );

		return false;
	}

	/**
	 * Add notice.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static function add_notice() {

		// To take into account translations after localization.
		self::$notices = array();
		self::compare();

		// Suppress "Plugin activated" notice.
		unset( $_GET['activate'] );
		// Deactivate plugin.
		deactivate_plugins( GCB_BASE );

		add_action( 'admin_notices', array( __CLASS__, 'display' ) );

	}

	/**
	 * Compare compatibility versions.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private static function compare() {

		global $wp_version;

		// Check WordPress version compatibility.
		if ( version_compare( $wp_version, '4.9', '<' ) ) {

			self::$notices[] = __(
				'Gutenberg Custom Blocks plugin requires at least WordPress 4.9.
				Please upgrade WordPress before activating the plugin.',
				'gutenberg-custom-blocks'
			);

		}

		// Check PHP version compatibility.
		if ( version_compare( PHP_VERSION, '5.4', '<' ) ) {

			self::$notices[] = __(
				'Gutenberg Custom Blocks plugin requires at least PHP 5.4.
				Please contact your hosting provider to upgrade your PHP version.',
				'gutenberg-custom-blocks'
			);
		}

		// Check if plugin was built with npm.
		if ( ! file_exists( dirname( __FILE__ ) . '/assets' ) ) {

			self::$notices[] = __(
				'Gutenberg Custom Blocks plugin requires files to be built.
				Run <code>npm install</code> to install dependencies
				<code>npm run build</code> to build the files or <code>npm run dev</code> to build the files and watch for changes.',
				'gutenberg-custom-blocks'
			);

		}

	}

	/**
	 * Display admin notice.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public static function display() {

		echo '<div class="error">';
			echo '<p>';
				echo wp_kses_post( join( '<br>', self::$notices ) );
			echo '</p>';
		echo '</div>';

	}

}

return Gutenberg_Custom_Blocks_Compat::check();
