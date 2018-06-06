import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";

export const ProjectPageTemplate = ({ title, content, contentComponent, index, totalCount, transition }) => {
	// const PageContent = contentComponent || Content;

	return (
		<Page transition={transition} index={index} totalCount={totalCount} className="section section--gradient-yellow">
			<PageNavigator prev={{ title: "Who We Are", url: "/whoweare" }} next={{ title: "Team", url: "/team" }} />
		</Page>
	);
};

ProjectPageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func
};

const ProjectPage = ({ data }) => {
	const { markdownRemark: post } = data;

	return <ProjectPageTemplate index={post.frontmatter.index} totalCount={data.totalPages.totalCount} contentComponent={HTMLContent} title={post.frontmatter.title} content={post.html} />;
};

ProjectPage.propTypes = {
	data: PropTypes.object.isRequired
};

export default ProjectPage;

export const ProjectPageQuery = graphql`
	query ProjectPage($id: String!) {
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
