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

return [
	'align' => [
		'type'    => 'string',
		'default' => 'none',
	],
	'className' => [
		'type'    => 'string',
	],
	'order' => [
		'type'    => 'string',
		'default' => 'desc',
	],
	'orderBy' => [
		'type'    => 'string',
		'default' => 'date',
	],
	'categories' => [
		'type' => 'string',
	],
	'postsToShow' => [
		'type'    => 'integer',
		'default' => 5,
	],
	'displayThumb' => [
		'type'    => 'boolean',
		'default' => true,
	],
	'horizontal' => [
		'type'    => 'boolean',
		'default' => true,
	],
];
