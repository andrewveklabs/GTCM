import React from "react";
import Page from "../components/Page";
import NewsWidget from "../components/NewsWidget";

const IndexSlide = ({ slug, title, date, bg, light }) => (
	<Page light={light} id="front-page" className="top-level-page page" style={{ backgroundImage: `url(${bg})` }}>
		<NewsWidget slug={slug} title={title} date={date} author="GTCM" />
	</Page>
);

export default IndexSlide;
