import React, { Component } from "react";
import "../styles/Indicator.scss";
import posed, { PoseGroup } from "react-pose";
import styleguide from "./styleguide";

export default class Indicator extends Component {
	render() {
		const { light, index, totalCount } = this.props;
		return (
			<div className={`indicator ${light ? "light" : ""}`}>
				<PoseGroup animateOnMount>
					<CurrentCount className="indicator--current">{index < 10 ? `0${index}` : index}</CurrentCount>
					<TotalCount className="indicator--total">/{totalCount < 10 ? `0${totalCount}` : totalCount}</TotalCount>
				</PoseGroup>
			</div>
		);
	}
}

const TotalCount = posed.h5({
	enter: {
		opacity: 0.65,
		y: 0,
		delay: 950,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1300 }
		}
	},
	exit: {
		opacity: 0,
		y: "15%"
	}
});

const CurrentCount = posed.h1({
	enter: {
		opacity: 1,
		y: 0,
		delay: 650,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		opacity: 0,
		y: "15%"
	}
});
