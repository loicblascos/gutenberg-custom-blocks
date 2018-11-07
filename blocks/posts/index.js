import style from './style.scss';
import editor from './editor.scss';

import Posts from './posts';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';

import { stringify } from 'querystringify';

const { __ } = wp.i18n;

const {
	withSelect,
} = wp.data;

const {
	PanelBody,
	ToggleControl,
	QueryControls,
} = wp.components;

const {
	registerBlockType,
} = wp.blocks;

const {
	BlockAlignmentToolbar,
	InspectorControls,
	BlockControls,
} = wp.editor;

const editBlock = ( props ) => {

	const {
		attributes: {
			align,
			order,
			orderBy,
			categories,
			postsToShow,
			displayThumb,
			horizontal
		},
		categoriesList,
		isSelected,
		setAttributes
	} = props;

	const toolBar = isSelected && (
		<BlockAlignmentToolbar
			value={ align }
			onChange={ ( value ) => setAttributes( { align: value } ) }
			controls={ [ 'center', 'wide', 'full' ] }
		/>
	);

	const inspectorControls = isSelected && (
		<InspectorControls key="inspector">
			<PanelBody title={ __( 'Latest Posts Settings', 'gutenberg-custom-blocks' ) }>
				<QueryControls
					{ ...{ order, orderBy } }
					numberOfItems={ postsToShow }
					categoriesList={ categoriesList }
					selectedCategoryId={ categories }
					onOrderChange={ ( value ) => setAttributes( { order: value } ) }
					onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
					onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : 'undefined' } ) }
					onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
				/>
			</PanelBody>
			<ToggleControl
				label={ __( 'Horizontal Layout', 'gutenberg-custom-blocks' ) }
				checked={ horizontal }
				onChange={ ( value ) => setAttributes( { horizontal: value } ) }
			/>
			<ToggleControl
				label={ __( 'Display Thumbnail', 'gutenberg-custom-blocks' ) }
				checked={ displayThumb }
				onChange={ ( value ) => setAttributes( { displayThumb: value } ) }
			/>
			<PanelBody title={ __( 'Block Alignment' ) }>
				{ toolBar }
			</PanelBody>
		</InspectorControls>
	);

	return [
		inspectorControls,
		<BlockControls key="controls">
			{ toolBar }
		</BlockControls>,
		<Posts { ...props }></Posts>
	]

};

export default registerBlockType( 'gcb-blocks/posts', {
	// Block title
	title: __( 'GCB Posts', 'gutenberg-custom-blocks' ),
	// Block description
	description: __( 'Block description', 'gutenberg-custom-blocks' ),
	// Block icon (https://developer.wordpress.org/resource/dashicons/)
	icon: 'smiley',
	// Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed
	category: 'common',
	// To handle block toolbar controls.
	getEditWrapperProps( attributes ) {

		const { align } = attributes;

		if ( align && align.match( 'center|wide|full' ) ) {
			return { 'data-align': align };
		}

	},
	// Function callback of edit property (to render block and block controls in Gutenberg editor)
	edit: withSelect( ( select, props ) => {

		const {	postsToShow, order, orderBy, categories } = props.attributes;
		const { getEntityRecords } = select( 'core' );
		const postsQuery = pickBy( {
			categories,
			order,
			orderby: orderBy,
			per_page: postsToShow,
			_embed: true,
		}, ( value ) => ! isUndefined( value ) );

		const categoriesQuery = {
			per_page: 100,
		};

		return {
			posts: getEntityRecords( 'postType', 'post', postsQuery ),
			categoriesList: getEntityRecords( 'taxonomy', 'category', categoriesQuery ),
		};

	} )( editBlock ),
	// Function callback of save property (to save block content in post_content)
	save : function( props ) {
		return null;
	},
} );
