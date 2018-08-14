import React from "react";

const splitText = text => {
	if (text.length > 25) {
		let words = text.split(" ");
		words.splice(words.length / 2, 0, "<br />");
		words = words.join(" ").split("<br />");
		return words;
	} else {
		return text;
	}
};

const LineThrough = ({ children }) => {
	const html = splitText(children);
	return <strike className="line-through">{html.map(span => <span key={span}>{span}</span>)}</strike>;
};

export default LineThrough;
