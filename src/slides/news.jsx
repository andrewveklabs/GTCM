import React from "react";
import Page from "../components/Page";
import LineThrough from "../components/LineThrough";
import { IoIosArrowRight } from "react-icons/lib/io";
import _ from "lodash";

import "../styles/news.scss";

const News = ({ title, posts }) => (
	<Page title={title} className="section section--gradient-gray">
		<div className="double-flex full-right">
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
				<div className="more-news">
					<h4 className="more-news--title">MORE NEWS</h4>
					<IoIosArrowRight className="more-news--arrow" />
				</div>
			</div>
			<div className="post-list">
				{posts.filter((p, i) => i !== 0).map(post => (
					<div key={post.node.id} className="post-list--item">
						<img src={post.node.frontmatter.image} alt={post.node.frontmatter.title} className="post-list--image" />
						<div className="post-list--info">
							<h5 className="post-list--title">{_.truncate(post.node.frontmatter.title, { length: 55 })}</h5>
							<span className="post-list--author">
								by <strong>{post.node.frontmatter.author}</strong>
							</span>
						</div>
					</div>
				))}
			</div>
		</div>
	</Page>
);

export default News;
