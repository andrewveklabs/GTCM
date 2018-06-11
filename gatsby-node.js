const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const Promise = require(`bluebird`);

// exports.createPages = ({ actions, graphql }) => {
// 	const { createPage } = actions;

// 	return graphql(`
// 		{
// 			allMarkdownRemark(limit: 1000) {
// 				edges {
// 					node {
// 						id
// 						fields {
// 							slug
// 						}
// 						frontmatter {
// 							templateKey
// 							index
// 						}
// 					}
// 				}
// 			}
// 		}
// 	`).then(result => {
// 		if (result.errors) {
// 			result.errors.forEach(e => console.error(e.toString()));
// 			return Promise.reject(result.errors);
// 		}

// 		const posts = result.data.allMarkdownRemark.edges;

// 		posts.forEach(edge => {
// 			const id = edge.node.id;
// 			const index = edge.node.frontmatter.index;
// 			if (edge.node.frontmatter.templateKey == "single-project" || edge.node.frontmatter.templateKey == "blog-post") {
// 				createPage({
// 					path: edge.node.fields.slug,
// 					component: path.resolve(`src/templates/${String(edge.node.frontmatter.templateKey)}.jsx`),
// 					// additional data can be passed via context
// 					context: {
// 						id,
// 						index
// 					}
// 				});
// 			}
// 		});
// 	});
// };

exports.onCreatePage = ({ page, actions }) => {
	const { createPage } = actions;
	return new Promise((resolve, reject) => {
		// Make the front page match everything client side.
		// Normally your paths should be a bit more judicious.
		if (page.path === `/`) {
			page.matchPath = `/:path`;
			createPage(page);
		}
		resolve();
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
