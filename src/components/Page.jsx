import React, { Component } from "react";
// import PropTypes from "prop-types";
import Layout from "./layout";

import Header from "./Header";
import Indicator from "./Indicator";

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = { zoomedOut: false, index: 0 };
	}
	render() {
		const { id, className, style, others, light, children, totalCount, transition, index, location } = this.props;
		return (
			<Layout location={location}>
				<div id={id} className={`${className} Page-Component`} style={{ ...style, ...(transition && transition.style) }} {...others}>
					<Header color={light ? "white" : "black"} />
					<Indicator light={light} index={index} totalCount={totalCount} />
					{children}
				</div>
			</Layout>
		);
	}
}

export default Page;
