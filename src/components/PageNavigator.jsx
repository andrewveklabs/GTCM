import React, { PureComponent } from "react";
import { Link, navigateTo } from "gatsby";
import { IoIosArrowLeft, IoIosArrowRight } from "react-icons/lib/io";

class NavigatorArrow extends PureComponent {
	render() {
		const { left, right, text, url, leftClicked, rightClicked } = this.props;
		if (left) {
			return (
				<Link to={url} onClick={leftClicked} className="page-navigator--part page-navigator--left">
					<span className="page-navigator--icon">
						<IoIosArrowLeft />
					</span>
					<span className="page-navigator--text">{text}</span>
				</Link>
			);
		} else if (right) {
			return (
				<Link to={url} onClick={rightClicked} className="page-navigator--part page-navigator--right">
					<span className="page-navigator--text">{text}</span>
					<span className="page-navigator--icon">
						<IoIosArrowRight />
					</span>
				</Link>
			);
		}
	}
}

const PageNavigator = ({ next, prev, light, leftClicked, rightClicked }) => {
	return (
		<div className={`page-navigator ${light ? "light" : ""}`}>
			{prev ? <NavigatorArrow leftClicked={leftClicked} text={prev.title} url={prev.url} left /> : ""}
			{next ? <NavigatorArrow rightClicked={rightClicked} text={next.title} url={next.url} right /> : ""}
		</div>
	);
};

export default PageNavigator;
