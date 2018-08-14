import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import Button from "../components/Button";
import { IoIosArrowThinRight } from "react-icons/lib/io";

import "../styles/whoweare.scss";

export const WhoWeArePageTemplate = ({
	title,
	content,
	contentComponent,
	index,
	totalCount,
	transition,
	image,
	caption
}) => {
	const PageContent = contentComponent || Content;

	return (
		<Page transition={transition} index={index} totalCount={totalCount} className="section section--gradient-gray">
			<div className="double-flex">
				<div className="left-side">
					<span className="since-date">Since 2002</span>
					<h2 className="sub-title">A Construction management company based in Alberta</h2>
					<IoIosArrowThinRight className="arrow-right" />
					<p className="about-blurb">
						<HTMLContent content={content} />
						<Button simple>Read More</Button>
					</p>
				</div>
				<div className="right-side">
					<img className="whoweare-image" src={image} alt="Golden Triangle Construction Workers" />
					<div className="whoweare-image--caption">
						<span className="whoweare-image--caption--title">ABOUT US</span>
						<h5 className="whoweare-image--caption--body">{caption}</h5>
					</div>
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

	return (
		<WhoWeArePageTemplate
			index={post.frontmatter.index}
			totalCount={data.totalPages.totalCount}
			contentComponent={HTMLContent}
			title={post.frontmatter.title}
			content={post.html}
			image={post.frontmatter.image}
			caption={post.frontmatter.caption}
		/>
	);
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
				image
				caption
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
