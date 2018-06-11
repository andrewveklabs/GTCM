import React from "react";
import Page from "../components/Page";
import LineThrough from "../components/LineThrough";

import "../styles/news.scss";

const News = ({ title, posts }) => (
	<Page title={title} className="section section--gradient-gray">
		<div className="double-flex">
			<div className="featured-post">
				<img alt={posts[0].node.frontmatter.title} src={posts[0].node.frontmatter.image} className="featured-post--image" />
				<div className="featured-post--info">
					<h4 className="featured-post--title">
						<LineThrough>{posts[0].node.frontmatter.title}</LineThrough>
					</h4>
					<span className="featured-post--author">
						by <strong>{posts[0].node.frontmatter.author}</strong>
					</span>
				</div>
			</div>
			<div className="post-list">
				{posts.filter((p, i) => i !== 0).map(post => (
					<div key={post.node.id} className="post-list--item">
						<img src={post.node.frontmatter.image} alt={post.node.frontmatter.title} className="post-list--image" />
						<h5 className="post-list--title">{post.node.frontmatter.title}</h5>
					</div>
				))}
			</div>
		</div>
	</Page>
);

export default News;
