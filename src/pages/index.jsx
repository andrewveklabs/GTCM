import React from "react";
import SwipeableViews from "react-swipeable-views";

import IndexSlide from "../slides/index";
import WhoWeAre from "../slides/whoweare";
import Projects from "../slides/projects";

import bg from "../../static/img/home-hero.jpg";
import "normalize.css";
import "../styles/main.scss";
import "../styles/index.scss";
import "../styles/whoweare.scss";

class IndexPage extends React.Component {
	componentDidMount() {
		//Collect Screenshots of pages
	}

	render() {
		const data = this.props.data;
		const { totalCount } = this.props.data.totalPages;

		return (
			<SwipeableViews resistance enableMouseEvents slideStyle={{ position: "relative" }}>
				<IndexSlide totalCount={totalCount} slug={data.NewsWidget.edges[0].node.fields.slug} title={data.NewsWidget.edges[0].node.frontmatter.title} date={data.NewsWidget.edges[0].node.frontmatter.date} bg={bg} />
				<WhoWeAre
					totalCount={totalCount}
					title={data.WhoWeAre.edges[0].node.frontmatter.title}
					image={data.WhoWeAre.edges[0].node.frontmatter.image}
					caption={data.WhoWeAre.edges[0].node.frontmatter.caption}
					index={data.WhoWeAre.edges[0].node.frontmatter.index}
					content={data.WhoWeAre.edges[0].node.html}
				/>
				<Projects
					totalCount={totalCount}
					title={data.Projects.edges[0].node.frontmatter.title}
					image={data.WhoWeAre.edges[0].node.frontmatter.image}
					caption={data.WhoWeAre.edges[0].node.frontmatter.caption}
					index={data.Projects.edges[0].node.frontmatter.index}
					projects={data.SingleProject.edges}
				/>
			</SwipeableViews>
		);
	}
}

export default IndexPage;

export const pageQuery = graphql`
	query Pages {
		NewsWidget: allMarkdownRemark(limit: 1, sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { templateKey: { eq: "blog-post" } } }) {
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
		Projects: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "projects" } } }) {
			edges {
				node {
					frontmatter {
						title
						index
					}
				}
			}
		}
		SingleProject: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "single-project" } } }) {
			edges {
				node {
					id
					frontmatter {
						title
						image
						type
						features {
							title
							icon
						}
					}
				}
			}
		}
		WhoWeAre: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "whoweare" } } }) {
			edges {
				node {
					html
					frontmatter {
						title
						index
						image
						caption
					}
				}
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
