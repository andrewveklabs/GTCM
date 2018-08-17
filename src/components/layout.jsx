import React, { Component } from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

import "normalize.css";
import logo from "../img/ICON_PNG.png";
import "../styles/main.scss";

class Layout extends Component {
	render() {
		const { children, index } = this.props;

		return (
			<div>
				<Helmet
					titleTemplate="%s | Golden Triangle Construction Management"
					defaultTitle="GTCM | Golden Triangle Construction Management"
					index={index}>
					<link rel="icon" type="image/png" href={logo} sizes="16x16" />
				</Helmet>
				{children}
			</div>
		);
	}
}

Layout.propTypes = {
	children: PropTypes.func
};

export default Layout;
