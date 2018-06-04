import React from "react";
import "../styles/NewsWidget.scss";
import LineThrough from "./LineThrough";
import Button from "./Button";

const NewsWidget = ({ title, date, author, slug }) => {
	return (
		<div className="latest-post">
			<h3 className="latest-post--title">
				<LineThrough>{title}</LineThrough>
			</h3>

			<span className="latest-post--author">
				<h6>by</h6>&nbsp;
				<h5>{author}</h5>
			</span>
			<span className="latest-post--divider">&nbsp;/&nbsp;</span>
			<span className="latest-post--date">
				<h6>year</h6>&nbsp;
				<h5>{date}</h5>
			</span>
			<Button simple to={slug} className="latest-post--read-link button-simple">
				Read
			</Button>
		</div>
	);
};

export default NewsWidget;
