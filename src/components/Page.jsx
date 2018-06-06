import React, { Component } from "react";

import Header from "./Header";
import Indicator from "./Indicator";

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = { zoomedOut: false, index: 0 };
	}
	render() {
		const { id, className, style, others, light, children, totalCount, transition, index, title, line = true } = this.props;
		return (
			<div id={id} className={`${className} Page-Component`} style={{ ...style, ...(transition && transition.style) }} {...others}>
				<Header line={line} color={light ? "white" : "black"} title={title} />
				<Indicator light={light} index={index} totalCount={totalCount + 1} />
				{children}
			</div>
		);
	}
}

export default Page;
