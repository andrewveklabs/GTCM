import React from "react";
import PropTypes from "prop-types";
import { AboutPageTemplate } from "../../templates/whoweare";

const WhoWeArePagePreview = ({ entry, widgetFor }) => <WhoWeArePageTemplate title={entry.getIn(["data", "title"])} content={widgetFor("body")} />;

WhoWeArePagePreview.propTypes = {
	entry: PropTypes.shape({
		getIn: PropTypes.func
	}),
	widgetFor: PropTypes.func
};

export default WhoWeArePagePreview;
