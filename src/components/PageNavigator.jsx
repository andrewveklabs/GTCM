import React, { Component } from "react";
import { createPortal } from "react-dom";
import { navigate } from "gatsby";
import { IoIosArrowLeft, IoIosArrowRight } from "react-icons/lib/io";
import styled from "styled-components";
import posed from "react-pose";
import styleguide from "./styleguide";

const NavigatorArrow = ({ left, right, text, onClick }) => (
	<span
		onClick={onClick}
		className={`page-navigator--part page-navigator--${left ? "left" : ""}${right ? "right" : ""}`}>
		{left && (
			<span className="page-navigator--icon">
				<IoIosArrowLeft />
			</span>
		)}
		<span className="page-navigator--text">{text}</span>
		{right && (
			<span className="page-navigator--icon">
				<IoIosArrowRight />
			</span>
		)}
	</span>
);

class PageNavigator extends Component {
	state = {
		pose: ""
	};

	handleClick = (url, pose) => {
		this.setState({ pose });
		setTimeout(() => {
			navigate(url);
		}, 100);
	};

	render() {
		const { next, prev, light } = this.props;
		return (
			<div className={`page-navigator ${light ? "light" : ""}`}>
				{createPortal(
					<Swiper animateOnMount pose={`enter${this.state.pose}`} initialPose={`exit${this.state.pose}`} />,
					typeof document !== "undefined" && document.getElementById("___gatsby")
				)}
				{prev && <NavigatorArrow onClick={() => this.handleClick(prev.url, "Left")} text={prev.title} left />}
				{next && <NavigatorArrow onClick={() => this.handleClick(next.url, "Right")} text={next.title} right />}
			</div>
		);
	}
}

const Swiper = styled(
	posed.div({
		enter: {
			y: "-100%",
			transition: {
				ease: styleguide.bezierArray,
				duration: 250
			}
		},
		exit: {
			y: 0
		},
		enterLeft: {
			y: "100%",
			transition: {
				type: "keyframes",
				values: ["-100%", 0],
				duration: 250
			}
		},
		enterRight: {
			y: "100%",
			transition: {
				type: "keyframes",
				values: ["100%", 0],
				duration: 250
			}
		},
		exitLeft: {
			y: "0%",
			transition: {
				type: "keyframes",
				values: [0, "100%"],
				duration: 250
			}
		},
		exitRight: {
			y: "0%",
			transition: {
				type: "keyframes",
				values: [0, "-100%"],
				duration: 250
			}
		}
	})
)`
	z-index: 999;
	background: ${styleguide.blue};
	top: 0;
	left: 0;
	position: absolute;
	width: 100vw;
	height: 100vh;
`;

export default PageNavigator;
