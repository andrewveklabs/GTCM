const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = ({ actions, graphql }) => {
	const { createPage } = actions;

	return graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						id
						fields {
							slug
						}
						frontmatter {
							templateKey
							index
						}
					}
				}
			}
		}
	`).then(result => {
		if (result.errors) {
			result.errors.forEach(e => console.error(e.toString()));
			return Promise.reject(result.errors);
		}

		const posts = result.data.allMarkdownRemark.edges;

		posts.forEach(edge => {
			const id = edge.node.id;
			const index = edge.node.frontmatter.index;
			createPage({
				path: edge.node.fields.slug,
				component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.jsx`),
				// additional data can be passed via context
				context: {
					id,
					index
				}
			});
		});
	});
};

exports.onCreateNode = ({ node, actions, getNode }) => {
	const { createNodeField, createParentChildLink } = actions;

	if (node.internal.type === `MarkdownRemark`) {
		const value = createFilePath({ node, getNode });
		createNodeField({
			name: `slug`,
			node,
			value
		});
	}
};
