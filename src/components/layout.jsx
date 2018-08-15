import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Transition from "./Transition";

import "normalize.css";
import "../styles/main.scss";

class Layout extends Component {
	render() {
		const { children, index, location } = this.props;

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
