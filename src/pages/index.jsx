import React from "react";
import pose from "popmotion-pose";
import NewsWidget from "../components/NewsWidget";
import PageNavigator from "../components/PageNavigator";
import Page from "../components/Page";

import bg from "../../static/img/news-mock.jpg";
import fullLogo from "../img/Full.svg";
import "../styles/index.scss";

const IndexPage = ({ data, transition, location }) => {
	const { title, date } = data.allMarkdownRemark.edges[0].node.frontmatter;
	const { slug } = data.allMarkdownRemark.edges[0].node.fields;
	const { totalCount } = data.totalPages;

	return (
		<Page
			location={location}
			transition={transition}
			index={1}
			totalCount={totalCount}
			light
			id="front-page"
			className="top-level-page page"
			style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
			<img src={fullLogo} alt="GTCM logo" className="logo" />
			<PageNavigator light next={{ title: "Who We Are", url: "/whoweare" }} />
			<NewsWidget slug={slug} title={title} date={date} author="GTCM" />
		</Page>
	);
};

export default IndexPage;

export const pageQuery = graphql`
	query IndexQuery {
		allMarkdownRemark(
			limit: 1
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
		) {
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
