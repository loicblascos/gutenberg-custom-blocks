const { Component } = wp.element;

export default class gcb_input extends Component {

	render() {

		const {
            attributes: { gcb_metadata },
            setAttributes
        } = this.props;

        return (
            <input
                value={ gcb_metadata }
                onChange={ ( event ) => setAttributes( { gcb_metadata: event.target.value } ) }
            />
        );

	}

}
