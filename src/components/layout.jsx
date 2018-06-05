import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "normalize.css";
import "../styles/main.scss";

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = { navView: false, index: 0 };
	}

	zoomOut = () => {
		this.setState(prevState => ({
			navView: !prevState.navView
		}));
	};

	render() {
		const { children, index } = this.props;

		return (
			<div>
				<Helmet title="GTCM" index={index} />
				{children}
			</div>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.func
};

export default Layout;
