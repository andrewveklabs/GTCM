import React, { Component } from "react";

import Header from "./Header";
import Indicator from "./Indicator";
import Layout from "./layout";

class Page extends Component {
	render() {
		const {
			id,
			className,
			style,
			others,
			light,
			children,
			totalCount,
			transition,
			index,
			location,
			title,
			line
		} = this.props;
		return (
			<Layout location={location}>
				<div
					id={id}
					className={`${className} Page-Component`}
					style={{ ...style, ...(transition && transition.style) }}
					{...others}>
					<Header line={line} title={title} color={light ? "white" : "black"} />
					<Indicator light={light} index={index} totalCount={totalCount + 1} />
					{children}
				</div>
			</Layout>
		);
	}
}

export default Page;
