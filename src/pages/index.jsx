import React from "react";
// import PropTypes from "prop-types";

// import Link from "gatsby-link";
// import Header from "../components/Header";
import NewsWidget from "../components/NewsWidget";
// import Indicator from "../components/Indicator";
import PageNavigator from "../components/PageNavigator";
import Page from "../components/Page";

import bg from "../../static/img/home-hero.jpg";
import "../styles/index.scss";

const IndexPage = ({ data, transition }) => {
	const { title, date } = data.allMarkdownRemark.edges[0].node.frontmatter;
	const { slug } = data.allMarkdownRemark.edges[0].node.fields;
	const { totalCount } = data.totalPages;

	return (
		<Page transition={transition} index={1} totalCount={totalCount} light id="front-page" className="top-level-page page" style={{ backgroundImage: `url(${bg})` }}>
			<PageNavigator light next={{ title: "Who We Are", url: "/whoweare" }} />
			<NewsWidget slug={slug} title={title} date={date} author="GTCM" />
		</Page>
	);
};

export default IndexPage;

IndexPage.propTypes = {};

export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(limit: 1, sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { templateKey: { eq: "blog-post" } } }) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
						date(formatString: "YYYY")
					}
				}
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
