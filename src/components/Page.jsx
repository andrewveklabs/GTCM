import React, { Component } from "react";
import Header from "./Header";

class Page extends Component {
	constructor(props) {
		super(props);
		this.state = { zoomedOut: false, index: 0 };
	}
	render() {
		const { id, className, style, light, children, transition, title, line = true, blueLine = false, onExplore } = this.props;
		return (
			<div id={id} className={`${className} Page-Component`} style={{ ...style, ...(transition && transition.style) }}>
				<Header onExplore={onExplore} line={line} color={light ? "white" : "black"} blueLine={blueLine} title={title} />
				{children}
			</div>
		);
	}
}

export default Page;
