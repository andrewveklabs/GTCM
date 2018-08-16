import React from "react";
import pose from "popmotion-pose";
import NewsWidget from "../components/NewsWidget";
import PageNavigator from "../components/PageNavigator";
import Page from "../components/Page";
import posed from "react-pose";
import styleguide from "../components/styleguide";

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
			index={1}
			totalCount={totalCount}
			light
			id="front-page"
			next={{ title: "Who We Are", url: "/whoweare" }}
			className="top-level-page page"
			style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}>
			<img src={fullLogo} alt="GTCM logo" className="logo" />
			<div className="hero-tagline">
				<Tagline className="hero-tagline--inner" pose="enter" initialPose="exit">
					<Tag pose="enter" initialPose="exit">
						Build Trust.<br />Build Better.
					</Tag>
				</Tagline>
			</div>
			<NewsWidget slug={slug} title={title} date={date} author="GTCM" />
		</Page>
	);
};

const Tag = posed.h1({
	enter: {
		y: 0,
		opacity: 1,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		y: "35%",
		opacity: 0
	}
});

const Tagline = posed.div({
	enter: {
		opacity: 1,
		width: "100%",
		delayChildren: 1000,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 750 }
		}
	},
	exit: {
		width: 0,
		opacity: 0
	}
});

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
