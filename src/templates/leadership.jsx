import React, { Component } from "react";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import "../styles/team.scss";
import posed from "react-pose";
import styleguide from "../components/styleguide";
import Modal from "react-modal";
import { graphql } from "gatsby";
import CareerModal from "../components/CareerModal";
import Img from "gatsby-image";

Modal.setAppElement("#___gatsby");

class Team extends Component {
	state = {
		isOpen: false
	};

	openModal = () => {
		this.setState({ isOpen: true });
	};

	componentDidMount() {
		if (this.props.location.hash === "#careers") {
			this.openModal();
		}
	}

	render() {
		const { data, location } = this.props;
		const { markdownRemark: team } = data;

		return (
			<Page
				location={location}
				prev={{ title: "Projects", url: "/projects" }}
				next={{ title: "Contact", url: "/contact" }}
				index={team.frontmatter.index}
				totalCount={data.totalPages.totalCount}
				title="Leadership"
				className="section section--team section--gradient-gray">
				<div className="team-members">
					{team.frontmatter.members.map((member, i) => (
						<div key={member.name} className="team-member">
							<TeamImage i={i} pose="enter" initialPose="exit">
								<Img className="team-member--image" fluid={member.image.childImageSharp.fluid} alt={member.name} />
							</TeamImage>
							<TeamInfo i={i} pose="enter" initialPose="exit" className="team-member--info">
								<h3 className="team-member--name">{member.name}</h3>
								<span className="team-member--title">{member.title}</span>
							</TeamInfo>
						</div>
					))}
				</div>
				<h5 onClick={this.openModal} className="team-career--button">
					Careers
				</h5>
				<Modal
					closeTimeoutMS={225}
					className="Project-Modal"
					onRequestClose={() => this.setState({ isOpen: false })}
					overlayClassName="Overlay"
					shouldCloseOnOverlayClick={true}
					shouldCloseOnEsc={true}
					isOpen={this.state.isOpen}>
					<CareerModal text={team.frontmatter.careertext} />
				</Modal>
			</Page>
		);
	}
}

const TeamImage = posed.div({
	enter: {
		y: 0,
		opacity: 1,
		delay: ({ i }) => i * 150 + 100,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		y: "10%",
		opacity: 0
	}
});

const TeamInfo = posed.div({
	enter: {
		y: 0,
		width: "80%",
		opacity: 1,
		delay: ({ i }) => i * 150 + 300,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		y: "10%",
		width: "10%",
		opacity: 0
	}
});

export default Team;

export const TeamPageQuery = graphql`
	query TeamPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				index
				careertext
				members {
					name
					title
					image {
						childImageSharp {
							fluid(quality: 100) {
								...GatsbyImageSharpFluid_withWebp
							}
						}
					}
				}
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
