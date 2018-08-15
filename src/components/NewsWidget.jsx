import React from "react";
import "../styles/NewsWidget.scss";
import posed, { PoseGroup } from "react-pose";
import LineThrough from "./LineThrough";
import Button from "./Button";
import styleguide from "./styleguide";

const NewsWidget = ({ title, date, author, slug }) => {
	return (
		<WidgetContainer initialPose="exit" pose="enter" className="latest-post">
			<WidgetText className="latest-post--title">
				<LineThrough>{title}</LineThrough>
			</WidgetText>

			<WidgetInfo initialPose="exit" pose="enter" className="latest-post--author">
				<h6>by</h6>&nbsp;
				<h5>{author}</h5>
			</WidgetInfo>
			<WidgetInfo initialPose="exit" pose="enter" className="latest-post--divider">
				&nbsp;/&nbsp;
			</WidgetInfo>
			<WidgetInfo initialPose="exit" pose="enter" className="latest-post--date">
				<h6>year</h6>&nbsp;
				<h5>{date}</h5>
			</WidgetInfo>
			<Button simple to={slug} className="latest-post--read-link button-simple">
				Read
			</Button>
		</WidgetContainer>
	);
};

const WidgetContainer = posed.div({
	enter: {
		opacity: 1,
		y: 0,
		delay: 450,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 700 }
		}
	},
	exit: {
		opacity: 0,
		y: "60%"
	}
});

const WidgetText = posed.h3({
	enter: {
		opacity: 1,
		x: 0,
		delay: 1000,
		transition: {
			default: { type: "tween", ease: "easeOut", duration: 600 }
		}
	},
	exit: {
		opacity: 0,
		x: "2.5%"
	}
});

const WidgetInfo = posed.span({
	enter: {
		opacity: 1,
		x: 0,
		delay: 1100,
		transition: {
			default: { type: "tween", ease: "easeOut", duration: 500 }
		}
	},
	exit: {
		opacity: 0,
		x: "100%"
	}
});

export default NewsWidget;
