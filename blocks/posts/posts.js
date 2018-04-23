const { __ } = wp.i18n;
const { Component } = wp.element;

const {
	decodeEntities,
} = wp.utils;

const {
    Spinner,
	Placeholder,
} = wp.components;

export default class gcb_posts extends Component {

	render() {

		const {
            attributes: {
                categories,
                postsToShow,
                displayThumb,
                horizontal
            },
            isSelected,
        } = this.props;

        const posts = this.props.posts.data;
        const hasPosts = Array.isArray( posts ) && posts.length;

        if ( ! hasPosts ) {

            return (
                <Placeholder key="placeholder"
                    icon="admin-post"
                    label={ __( 'Posts', 'gutenberg-custom-blocks' ) }
                >
                    { ! Array.isArray( posts ) ?
                        <Spinner /> :
                        __( 'No posts found.', 'gutenberg-custom-blocks' )
                    }
                </Placeholder>
            );

        }

         // Removing posts from display should be instant.
        const displayed = posts.length > postsToShow ? posts.slice( 0, postsToShow ) : posts;

        return (
            <section className={'gcb-posts ' + (horizontal ? 'gcb-horizontal-layout' : '')}>

                { displayed.map( ( post, i ) =>

                    <article class="gcb-post">
                        { !!displayThumb && !!post.featured_media > 0 &&
                            <div class="gcb-media-holder">
                                <a href={ post.link } target="_blank">
                                    <img
                                        src={ post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url }
                                        height={ post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.height }
                                        width={ post._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.width }
                                        alt={ decodeEntities( post._embedded['wp:featuredmedia'][0].alt_text ) }
                                    />
                                </a>
                            </div>
                        }

                        <div class="gcb-content-holder">

                            { !!(post.categories.length > 0) &&
                                <ul class="gcb-post-terms">
                                {
                                    post._embedded['wp:term'][0].map( ( term, i ) =>
                                        <li>
                                            <a href={ term.link } target="_blank">
                                                { decodeEntities( term.name ) }
                                            </a>
                                        </li>
                                    )
                                }
                                </ul>
                            }
                            <h3 class="gcb-post-title">
                                <a href={ post.link } target="_blank">
                                    { decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)', 'gutenberg-custom-blocks' ) }
                                </a>
                            </h3>
                            <time class="gcb-post-date" dateTime={ moment( post.date_gmt ).utc().format() }>
                                { moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
                            </time>
                            <span class="gcb-post-author">
                                { ', ' + __( 'by', 'gutenberg-custom-blocks' ) + ' ' }
                                <a href={ post._embedded.author[0].link } target="_blank">
                                    { decodeEntities( post._embedded.author[0].name ) }
                                </a>
                            </span>

                            { !!(!post.excerpt.protected) && !!post.excerpt.rendered &&
                                <div
                                    className="gcb-post-excerpt"
                                    dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } }
                                />
                            }

                            <div>
                                <a href={ post.link } className="gcb-post-readmore"  target="_blank">
                                    { __( 'Read more', 'gutenberg-custom-blocks' ) }
                                </a>
                            </div>

                        </div>

                    </article>

                ) }

            </section>
        );

	}

}
