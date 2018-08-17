import React from "react";
import NewsWidget from "../components/NewsWidget";
import { graphql } from "gatsby";
import Page from "../components/Page";
import posed from "react-pose";
import styleguide from "../components/styleguide";
import Img from "gatsby-image";

import fullLogo from "../img/Full.svg";
import "../styles/index.scss";

const IndexPage = ({ data, transition, location }) => {
	const { title, date } = data.allMarkdownRemark.edges[0].node.frontmatter;
	const { slug } = data.allMarkdownRemark.edges[0].node.fields;
	const { totalCount } = data.totalPages;
	const heroimage = data.heroimage.childImageSharp.fluid;

	return (
		<Page
			location={location}
			index={1}
			totalCount={totalCount}
			light
			line={false}
			id="front-page"
			next={{ title: "Who We Are", url: "/whoweare" }}
			className="top-level-page page">
			<Img outerWrapperClassName="hero-image" fluid={heroimage} />
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
		delayChildren: 900,
		transition: {
			default: { ease: "easeInOut", duration: 750 }
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
		heroimage: file(relativePath: { eq: "news-mock.jpg" }) {
			childImageSharp {
				fluid(maxWidth: 2500, quality: 100) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
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
