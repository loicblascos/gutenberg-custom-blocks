<?php
/**
 * Block Attributes
 *
 * @package  Gutenberg Custom Blocks
 * @author   Loïc Blascos
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers metadata key 'gcb_metadata'
 *
 * @since 1.0.0
 */
register_meta(
	'post',
	'gcb_metadata',
	[
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	]
);

return [
	'gcb_metadata' => [
		'type'   => 'string',
		'source' => 'meta',
		'meta'   => 'gcb_metadata',
	],
];
