import style from './style.scss';
import editor from './editor.scss';

const { __ } = wp.i18n;

const {
	PanelBody,
	PanelColor,
	RangeControl,
	SelectControl,
} = wp.components;

const {
	registerBlockType,
} = wp.blocks;

const {
	BlockAlignmentToolbar,
	InspectorControls,
	BlockControls,
	ColorPalette,
	RichText,
} = wp.editor;

const EditBlock = ( props ) => {

	const {
		attributes: {
			align,
			className,
			content,
			textColor,
			fontSize,
			backgroundColor
		},
		isSelected,
		setAttributes
	} = props;

	return [
		// Show the block alignment toolbar on select
		isSelected && (
			<BlockControls key="controls">
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => setAttributes( { align: value } ) }
				/>
			</BlockControls>
		),
		// Show the block inspector controls on select
		isSelected && (
			<InspectorControls key="inspector">
				<PanelBody title={ __( 'Appearance', 'gutenberg-custom-blocks' ) }>
					<RangeControl
						label={ __( 'Font Size', 'gutenberg-custom-blocks' ) }
						value={ fontSize || 16 }
						onChange={ ( value ) => setAttributes( { fontSize: value } ) }
						min={ 4 }
						max={ 100 }
					/>
				</PanelBody>
				<PanelColor title={ __( 'Text Color', 'gutenberg-custom-blocks' ) } colorValue={ textColor } initialOpen={ false }>
					<ColorPalette
						value={ textColor }
						onChange={ ( value ) => setAttributes( { textColor: value } ) }
					/>
				</PanelColor>
				<PanelColor title={ __( 'Background Color', 'gutenberg-custom-blocks' ) } colorValue={ backgroundColor } initialOpen={ false }>
					<ColorPalette
						value={ backgroundColor }
						onChange={ ( value ) => setAttributes( { backgroundColor: value } ) }
					/>
				</PanelColor>
				<PanelBody title={ __( 'Block Alignment', 'gutenberg-custom-blocks' ) } initialOpen={ false }>
					<BlockAlignmentToolbar
						value={ align }
						onChange={ ( value ) => setAttributes( { align: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		),
		(
			<div key="editable">
				<RichText
					tagName="p"
					className={ className }
					style={ {
						backgroundColor: backgroundColor,
						color: textColor,
						fontSize: ( fontSize ? fontSize : 16 ) + 'px',
					} }
					value={ content }
					onChange={ ( value ) => setAttributes( { content: value } ) }
					placeholder={ __( 'Type your content', 'gutenberg-custom-blocks' ) }
				/>
			</div>
		)
	];

}

export default registerBlockType( 'gcb-blocks/simple', {
	// Block title
	title: __( 'GCB Simple', 'gutenberg-custom-blocks' ),
	// Block description
	description: __( 'Block description', 'gutenberg-custom-blocks' ),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'common',
	// To handle block toolbar controls.
	getEditWrapperProps( attributes ) {

		const { align } = attributes;

		if ( align && align.match( 'left|right|wide|full' ) ) {
			return { 'data-align': align };
		}

	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit : EditBlock,
	// Function callback of save property (to save block content in post_content)
	save : ( props ) => {

		const {
			attributes: {
				align,
				className,
				content,
				textColor,
				fontSize,
				backgroundColor
			}
		} = props;

		if ( ! content ) {
			return;
		}

		return (
			<p
				className={ align ? `align${ align }` : null }
				style={ {
					backgroundColor: backgroundColor,
					color: textColor,
					fontSize: ( fontSize ? fontSize : 16 ) + 'px',
				} }
			>
				{ content }
			</p>
		);
	},
} );
