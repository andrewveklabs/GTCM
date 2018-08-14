import React from "react";
import Link from "gatsby-link";
import { IoIosArrowLeft, IoIosArrowRight } from "react-icons/lib/io";

const NavigatorArrow = ({ left, right, text, url }) => {
	if (left) {
		return (
			<Link to={url} className="page-navigator--part page-navigator--left">
				<span className="page-navigator--icon">
					<IoIosArrowLeft />
				</span>
				<span className="page-navigator--text">{text}</span>
			</Link>
		);
	} else if (right) {
		return (
			<Link to={url} className="page-navigator--part page-navigator--right">
				<span className="page-navigator--text">{text}</span>
				<span className="page-navigator--icon">
					<IoIosArrowRight />
				</span>
			</Link>
		);
	}
};

const PageNavigator = ({ next, prev, light }) => {
	return (
		<div className={`page-navigator ${light ? "light" : ""}`}>
			{prev ? <NavigatorArrow text={prev.title} url={prev.url} left /> : ""}
			{next ? <NavigatorArrow text={next.title} url={next.url} right /> : ""}
		</div>
	);
};

export default PageNavigator;
