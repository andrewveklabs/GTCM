import React from "react";
import PropTypes from "prop-types";
import Content, { HTMLContent } from "../components/Content";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import Button from "../components/Button";
import { IoIosArrowThinRight } from "react-icons/lib/io";
import posed, { PoseGroup } from "react-pose";
import styleguide from "../components/styleguide";

import "../styles/whoweare.scss";

export const WhoWeArePageTemplate = ({
	title,
	content,
	contentComponent,
	index,
	totalCount,
	transition,
	image,
	caption,
	location
}) => {
	const PageContent = contentComponent || Content;

	return (
		<Page
			location={location}
			transition={transition}
			index={index}
			totalCount={totalCount}
			className="section section--gradient-gray">
			<div className="double-flex">
				<div className="left-side">
					<span className="since-date">Since 2002</span>
					<h2 className="sub-title">A Construction management company based in Alberta</h2>
					<ArrowPose initialPose="exit" pose="enter">
						<IoIosArrowThinRight className="arrow-right" />
					</ArrowPose>
					<p className="about-blurb">
						<HTMLContent content={content} />
						<Button simple>Read More</Button>
					</p>
				</div>
				<div className="right-side">
					<WeAreImage
						initialPose="exit"
						pose="enter"
						className="whoweare-image"
						src={image}
						alt="Golden Triangle Construction Workers"
					/>
					<DescriptionCard initialPose="exit" pose="enter" className="whoweare-image--caption">
						<span className="whoweare-image--caption--title">ABOUT US</span>
						<h5 className="whoweare-image--caption--body">{caption}</h5>
					</DescriptionCard>
				</div>
			</div>
			<PageNavigator prev={{ title: "Home", url: "/" }} next={{ title: "Projects", url: "/projects" }} />
		</Page>
	);
};

const ArrowPose = posed.div({
	enter: {
		x: 0,
		opacity: 1,
		delay: 400,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		x: "-10%",
		opacity: 0
	}
});

const WeAreImage = posed.img({
	enter: {
		y: 0,
		opacity: 1,
		delay: 400,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		y: "10%",
		opacity: 0
	}
});

const DescriptionCard = posed.div({
	enter: {
		y: 0,
		opacity: 1,
		delay: 750,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 700 }
		}
	},
	exit: {
		y: "15%",
		opacity: 0
	}
});

WhoWeArePageTemplate.propTypes = {
	title: PropTypes.string.isRequired,
	content: PropTypes.string,
	contentComponent: PropTypes.func
};

const WhoWeArePage = ({ data, location }) => {
	const { markdownRemark: post } = data;

	return (
		<WhoWeArePageTemplate
			location={location}
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
	data: PropTypes.object.isRequired,
	location: PropTypes.object.isRequired
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
