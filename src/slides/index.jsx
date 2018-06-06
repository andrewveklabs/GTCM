import React from "react";
import Page from "../components/Page";
import NewsWidget from "../components/NewsWidget";
import PageNavigator from "../components/PageNavigator";

const IndexSlide = ({ slug, title, date, bg, totalCount }) => (
	<Page index={1} totalCount={totalCount} light id="front-page" className="top-level-page page" style={{ backgroundImage: `url(${bg})` }}>
		<PageNavigator light next={{ title: "Who We Are", url: "/whoweare" }} />
		<NewsWidget slug={slug} title={title} date={date} author="GTCM" />
	</Page>
);

export default IndexSlide;
