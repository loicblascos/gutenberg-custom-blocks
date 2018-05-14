import style from './style.scss';
import editor from './editor.scss';

import Input from './input.js';

const { __ } = wp.i18n;

const {
	PanelBody,
} = wp.components;

const {
	registerBlockType,
} = wp.blocks;

const {
	InspectorControls,
} = wp.editor;

export default registerBlockType( 'gcb-blocks/meta', {
	// Block title
	title: __( 'GCB Meta', 'gutenberg-custom-blocks' ),
	// Block description
	description: __( 'Block description', 'gutenberg-custom-blocks' ),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'common',
	// Use the block just once per post
	useOnce: true,
	// Remove support for block markup.
    supports: {
		html: false,
    },
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit : ( props ) => {

		const {	isSelected } = props;

		const panel = (
			<PanelBody title={ __( 'Enter your meta value', 'gutenberg-custom-blocks' ) }>
				<Input { ...props }></Input>
			</PanelBody>
		);

		return [
			// Show the block inspector controls on select
			isSelected && (
				<InspectorControls key="inspector">
					{ panel }
				</InspectorControls>
			),
			panel
		];

	},
	// Function callback of save property (to save block content in post_content)
	save : ( props ) => {
		return null;
	},
} );
