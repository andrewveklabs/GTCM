import React, { Component } from "react";
import Header from "./Header";

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = { zoomedOut: false, index: 0 };
	}
	render() {
		const { id, className, style, others, light, children, transition, title, line = true, blueLine = false } = this.props;
		return (
			<div id={id} className={`${className} Page-Component`} style={{ ...style, ...(transition && transition.style) }} {...others}>
				<Header line={line} color={light ? "white" : "black"} blueLine={blueLine} title={title} />
				{children}
			</div>
		);
	}
}

export default Page;
