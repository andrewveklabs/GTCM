import React, { Component } from "react";
import { StaticQuery } from "gatsby";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import html2canvas from "html2canvas";

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = { navView: false, index: 0, imageURL: "" };
		this.layoutRef = React.createRef();
	}

	zoomOut = () => {
		this.setState(prevState => ({
			navView: !prevState.navView
		}));
	};

	CaptureScreen = () => {
		if (typeof window !== "undefined") {
			document.querySelector(".page-navigator, .indicator, .page-title, strike, .explore-image").style.visibility = "hidden";
			html2canvas(this.layoutRef.current).then(canvas => {
				console.log(canvas);
				this.setState({ imageURL: canvas.toDataURL("image/png") });
				document.querySelector(".page-navigator, .indicator, .page-title, strike, .explore-image").style.visibility = "visible";
			});
		}
	};

	render() {
		const { children, index, transition } = this.props;

		return (
			<div style={transition && transition.style} ref={this.layoutRef}>
				<Helmet title="GTCM" index={index} />
				{children}
				<button style={{ position: "absolute", left: 0, top: 0 }} onClick={this.CaptureScreen}>
					Capture
				</button>
				<img className="explore-image" src={this.state.imageURL} alt="" />
			</div>
		);
	}
}

class PageQuery extends StaticQuery {}

Layout.propTypes = {
	children: PropTypes.func
};

export default Layout;
