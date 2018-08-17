import React from "react";
import Page from "../components/Page";
import LineThrough from "../components/LineThrough";
import { IoIosArrowRight } from "react-icons/lib/io";
import _ from "lodash";
import { graphql } from "gatsby";
import Img from "gatsby-image";

import "../styles/news.scss";

const News = ({ data, location }) => {
	const { news, totalPages } = data;
	const posts = news.edges;
	console.log(posts);

	return (
		<Page
			location={location}
			prev={{ title: "Contact", url: "/contact" }}
			title="News"
			index={data.markdownRemark.frontmatter.index}
			totalCount={totalPages.totalCount}
			className="section section--gradient-gray">
			<div className="double-flex full-right">
				<div className="featured-post">
					<Img
						alt={posts[0].node.frontmatter.title}
						fluid={posts[0].node.frontmatter.image.childImageSharp.fluid}
						className="featured-post--image"
					/>
					<div className="featured-post--info">
						<h4 className="featured-post--title">
							<LineThrough>{posts[0].node.frontmatter.title}</LineThrough>
						</h4>
						<span className="featured-post--author">
							by <strong>{posts[0].node.frontmatter.author}</strong>
						</span>
					</div>
					<div className="more-news">
						<h4 className="more-news--title">MORE NEWS</h4>
						<IoIosArrowRight className="more-news--arrow" />
					</div>
				</div>
				<div className="post-list">
					{posts.filter((p, i) => i !== 0).map(post => (
						<div key={post.node.id} className="post-list--item">
							<Img
								fluid={post.node.frontmatter.image.childImageSharp.fluid}
								alt={post.node.frontmatter.title}
								className="post-list--image"
							/>
							<div className="post-list--info">
								<h5 className="post-list--title">{_.truncate(post.node.frontmatter.title, { length: 55 })}</h5>
								{post.node.frontmatter.author && (
									<span className="post-list--author">
										by <strong>{post.node.frontmatter.author}</strong>
									</span>
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</Page>
	);
};

export default News;

export const NewsPageQuery = graphql`
	query NewsPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				index
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
		news: allMarkdownRemark(
			limit: 4
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
						image {
							childImageSharp {
								fluid(maxWidth: 600, quality: 100) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
						author
						date(formatString: "YYYY")
					}
				}
			}
		}
	}
`;
