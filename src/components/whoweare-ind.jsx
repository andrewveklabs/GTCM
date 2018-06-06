import React from "react";
// import Content, { HTMLContent } from "../components/Content";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import Button from "../components/Button";
import { IoIosArrowThinRight } from "react-icons/lib/io";
import { StaticQuery } from "gatsby";

import "../styles/whoweare.scss";

const WhoWeAreInd = () => {
	return (
		<StaticQuery
			query={graphql`
				query WhoWeAreInd {
					allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "whoweare" } } }) {
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
				}
			`}
			render={({ data }) => (
				<Page title={data.edges.node.frontmatter.title} index={data.edges.node.frontmatter.index} totalCount={1} className="section section--gradient-gray">
					<div className="double-flex">
						<div className="left-side">
							<span className="since-date">Since 2002</span>
							<h2 className="sub-title">A Construction management company based in Alberta</h2>
							<IoIosArrowThinRight className="arrow-right" />
							<p className="about-blurb">
								<p>{data.edges.node.html}</p>
								<Button simple>Read More</Button>
							</p>
						</div>
						<div className="right-side">
							<img className="whoweare-image" src={data.edges.node.frontmatter.image} alt="Golden Triangle Construction Workers" />
							<div className="whoweare-image--caption">
								<span className="whoweare-image--caption--title">ABOUT US</span>
								<h5 className="whoweare-image--caption--body">{data.edges.node.frontmatter.caption}</h5>
							</div>
						</div>
					</div>
					<PageNavigator prev={{ title: "Home", url: "/" }} next={{ title: "Projects", url: "/projects" }} />
				</Page>
			)}
		/>
	);
};

export default WhoWeAreInd;
