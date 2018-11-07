<?php
/**
 * Check WP and PHP compatibility
 *
 * @codingStandardsIgnoreFile
 *
 * @package Gutenberg Custom Blocks
 * @author  Loïc Blascos
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Compatibility class
 *
 * @class GCB_Compatibility
 * @since 1.0.0
 */
class GCB_Compatibility {

	/**
	 * Minium required WordPress version
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var string
	 */
	private $wp_min;

	/**
	 * Minium required PHP version
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var string
	 */
	private $php_min;

	/**
	 * Holds plugin name
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var string
	 */
	private $plugin;

	/**
	 * Holds plugin basename
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var string
	 */
	private $basename;

	/**
	 * Holds notice messages
	 *
	 * @since 1.0.0
	 * @access private
	 *
	 * @var array
	 */
	private $notices = array();

	/**
	 * Constructor
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $wp_min   Minium required WordPress version.
	 * @param string $php_min  Minium required PHP version.
	 * @param string $plugin   Plugin name.
	 * @param string $basename Plugin basename.
	 */
	public function __construct( $wp_min = '3.7', $php_min = '5.2.4', $plugin = 'Plugin', $basename = '' ) {

		$this->wp_min   = $wp_min;
		$this->php_min  = $php_min;
		$this->plugin   = $plugin;
		$this->basename = $basename;

	}

	/**
	 * Check if it's compatible
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return boolean
	 */
	public function check() {

		$this->compare_versions();

		if ( empty( $this->notices ) ) {
			return true;
		}

		add_action( 'admin_init', array( $this, 'add_notices' ) );

		return false;

	}

	/**
	 * Compare compatibility versions.
	 *
	 * @since 1.0.0
	 * @access private
	 */
	private function compare_versions() {

		global $wp_version;

		// Check WordPress version compatibility.
		if ( version_compare( $wp_version, $this->wp_min, '<' ) ) {

			$this->notices[] = sprintf(
				/* translators: %1$s: Plugin name, %2$s: Minium required WordPress version */
				__( "<strong>%1\$s</strong> requires at least <code>WordPress %2\$s</code>.\nPlease update WordPress to activate the plugin.", 'gutenberg-custom-blocks' ),
				$this->plugin,
				$this->wp_min
			);

		}

		// Check PHP version compatibility.
		if ( version_compare( PHP_VERSION, $this->php_min, '<' ) ) {

			$this->notices[] = sprintf(
				/* translators: %1$s: Plugin name, %2$s: Minium required PHP version */
				__( "<strong>%1\$s</strong> requires at least <code>PHP %2\$s</code>.\nPlease contact your hosting provider to upgrade your PHP version.", 'gutenberg-custom-blocks' ),
				$this->plugin,
				$this->php_min
			);

		}

		// Check if plugin was built with npm.
		if ( ! file_exists( dirname( __FILE__ ) . '/assets' ) ) {

			$this->notices[] = sprintf(
				/* translators: %1$s: Plugin name */
				__( "%1\$s plugin requires files to be built.\nRun <code>npm install</code> to install dependencies\n<code>npm run build</code> to build the files or <code>npm run dev</code> to build the files and watch for changes.", 'gutenberg-custom-blocks' ),
				$this->plugin,
				$this->php_min
			);

		}

	}

	/**
	 * Add admin notices.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function add_notices() {

		// To take into account translations after localization.
		$this->notices = array();
		$this->compare_versions();

		if ( ! empty( $this->basename ) ) {

			// Suppress "Plugin activated" notice.
			unset( $_GET['activate'] );
			// Deactivate plugin.
			deactivate_plugins( $this->basename );

		}

		add_action( 'admin_notices', array( $this, 'display_notices' ) );

	}

	/**
	 * Display admin notices.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function display_notices() {

		array_map( function( $notice ) {
			echo '<div class="error">' . wp_kses_post( wpautop( $notice ) ) . '</div>';
		}, $this->notices );

	}

}

return new GCB_Compatibility( '4.7.0', '5.4.0', GCB_NAME, GCB_BASE );
