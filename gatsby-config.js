module.exports = {
	siteMetadata: {
		title: "GTCM",
		siteUrl: "https://gtcm.ca"
	},
	plugins: [
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: `Golden Triangle Construction Management`,
				short_name: `GTCM`,
				start_url: `/`,
				background_color: "#ffffff",
				theme_color: "#FFDC41",
				display: `standalone`,
				icon: `src/img/ICON_PNG.png` // This path is relative to the root of the site.
			}
		},
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/static/img`,
				name: "img"
			}
		},
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sass",
		// {
		// 	resolve: `gatsby-plugin-sitemap`
		// },
		{
			resolve: "gatsby-source-filesystem",
			options: {
				path: `${__dirname}/src/pages`,
				name: "pages"
			}
		},
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		"gatsby-plugin-netlify-cache",
		{
			resolve: "gatsby-transformer-remark",
			options: {
				plugins: [
					{
						resolve: `gatsby-remark-relative-images`,
						options: {
							name: "img"
						}
					},
					{
						resolve: "gatsby-remark-images",
						options: {
							maxWidth: 1000,
							quality: 80,
							sizeByPixelDensity: true,
							linkImagesToOriginal: false
						}
					}
				]
			}
		},
		// {
		// 	resolve: "gatsby-plugin-netlify-cms",
		// 	options: {
		// 		modulePath: `${__dirname}/src/cms/cms.js`
		// 	}
		// },
		{
			resolve: `gatsby-plugin-styled-components`,
			options: {
				displayName: false
			}
		},
		{
			resolve: `gatsby-plugin-google-fonts`,
			options: {
				fonts: [`Raleway\:300,400,500,600,700`, `Roboto\:300,400,500,600,700`]
			}
		},
		"gatsby-plugin-netlify" // make sure to keep it last in the array
	]
};
