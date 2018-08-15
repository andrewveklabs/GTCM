import React, { Component } from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import Button from "../components/Button";
import { IoIosArrowThinRight } from "react-icons/lib/io";
import posed from "react-pose";
import styleguide from "../components/styleguide";
import Modal from "react-modal";

import "../styles/whoweare.scss";

const ArrowPose = posed.div({
	enter: {
		x: 0,
		opacity: 1,
		delay: 200,
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
		delay: 200,
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
		delay: 550,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 700 }
		}
	},
	exit: {
		y: "15%",
		opacity: 0
	}
});

Modal.setAppElement("#___gatsby");

class WhoWeArePage extends Component {
	state = {
		isOpen: false
	};

	openModal = () => {
		console.log("opened");

		this.setState({ isOpen: true });
	};

	render() {
		const { data, location } = this.props;
		const { markdownRemark: post } = data;

		return (
			<Page
				location={location}
				index={post.frontmatter.index}
				totalCount={data.totalPages.totalCount}
				title="Who We Are"
				className="section section--gradient-gray">
				<div className="double-flex">
					<div className="left-side">
						<span className="since-date">Since 2002</span>
						<h2 className="sub-title">A Construction management company based in Alberta</h2>
						<ArrowPose initialPose="exit" pose="enter">
							<IoIosArrowThinRight className="arrow-right" />
						</ArrowPose>
						<p className="about-blurb">
							<HTMLContent content={post.html} />
							<Button onClick={this.openModal} noLink simple>
								Read More
							</Button>
						</p>
					</div>
					<div className="right-side">
						<WeAreImage
							initialPose="exit"
							pose="enter"
							className="whoweare-image"
							src={post.frontmatter.image}
							alt="Golden Triangle Construction Workers"
						/>
						<DescriptionCard initialPose="exit" pose="enter" className="whoweare-image--caption">
							<h6 className="whoweare-image--caption--title">OUR MISSION</h6>
							<span className="whoweare-image--caption--body">{post.frontmatter.caption}</span>
						</DescriptionCard>
					</div>
				</div>
				<PageNavigator prev={{ title: "Home", url: "/" }} next={{ title: "Projects", url: "/projects" }} />
				<Modal
					closeTimeoutMS={225}
					className="Modal"
					onRequestClose={() => this.setState({ isOpen: false })}
					overlayClassName="Overlay"
					shouldCloseOnOverlayClick={true}
					shouldCloseOnEsc={true}
					isOpen={this.state.isOpen}>
					<div>
						<h6 className="blue no-lh">ABOUT US</h6>
						{post.frontmatter.readmore}
					</div>
					<div>
						<h6 style={{ marginTop: "1rem" }} className="blue no-lh">
							OUR VISION
						</h6>
						{post.frontmatter.vision}
					</div>
				</Modal>
			</Page>
		);
	}
}

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
				readmore
				vision
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
