import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";

import "../styles/whoweare.scss";

export const WhoWeArePageTemplate = ({ title, content, contentComponent, index, totalCount, transition }) => {
	const PageContent = contentComponent || Content;

	return (
		<Page transition={transition} index={index} totalCount={totalCount} className="section section--gradient-gray">
			<div className="double-flex">
				<div className="left-side">
					<span className="since-date">Since 2002</span>
					<p className="about-blurb">
						<PageContent content={content} />
					</p>
				</div>
			</div>
			<PageNavigator prev={{ title: "Home", url: "/" }} next={{ title: "Projects", url: "/projects" }} />
		</Page>
	);
};

WhoWeArePageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func
};

const WhoWeArePage = ({ data }) => {
	const { markdownRemark: post } = data;

	return <WhoWeArePageTemplate index={post.frontmatter.index} totalCount={data.totalPages.totalCount} contentComponent={HTMLContent} title={post.frontmatter.title} content={post.html} />;
};

WhoWeArePage.propTypes = {
	data: PropTypes.object.isRequired
};

export default WhoWeArePage;

export const WhoWeArePageQuery = graphql`
	query WhoWeArePage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			html
			frontmatter {
				title
				index
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
