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
		'type' => 'string',
	],
	'className' => [
		'type' => 'string',
	],
	'content' => [
		'type'     => 'array',
		'source'   => 'children',
		'selector' => 'p',
		'default'  => [],
	],
	'align' => [
		'type' => 'string',
	],
	'textColor' => [
		'type' => 'string',
	],
	'backgroundColor' => [
		'type' => 'string',
	],
	'fontSize' => [
		'type' => 'string',
	],
];
