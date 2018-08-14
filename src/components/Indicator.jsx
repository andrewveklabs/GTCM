import React, { Component } from "react";
import "../styles/Indicator.scss";

export default class Indicator extends Component {
	render() {
		const { light, index, totalCount } = this.props;
		return (
			<div className={`indicator ${light ? "light" : ""}`}>
				<h1 className="indicator--current">{index < 10 ? `0${index}` : index}</h1>
				<h5 className="indicator--total">/{totalCount < 10 ? `0${totalCount}` : totalCount}</h5>
			</div>
		);
	}
}
