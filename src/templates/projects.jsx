import React, { Component } from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import ProjectModal from "../components/ProjectModal";
import Modal from "react-modal";
import Img from "gatsby-image";
import { IoIosArrowRight, IoIosLightbulbOutline, IoIosCheckmarkOutline, IoIosSnowy } from "react-icons/lib/io";
import styleguide from "../components/styleguide";
import posed, { PoseGroup } from "react-pose";
import "../styles/projects.scss";

const FeatureIcon = ({ icon, className }) => {
	switch (icon) {
		case "snow":
			return <IoIosSnowy className={className} />;
		case "light":
			return <IoIosLightbulbOutline className={className} />;
		case "check":
			return <IoIosCheckmarkOutline className={className} />;
		default:
			return <IoIosCheckmarkOutline className={className} />;
	}
};

const ProjectCard = ({ title, type, image, features }) => (
	<ProjectCardContainer className="project-card">
		<img className="project-card--image" src={image} alt={title} />
		<div className="project-card--bottom">
			<h4 className="project-card--title">{title}</h4>
			<span className="project-card--type">{type}</span>
			<div className="project-card--features">
				{features.map((feature, index) => (
					<span key={`${feature.title}-${index}`} className="project-card--feature-title">
						<FeatureIcon className="project-card--feature-icon" icon={feature.icon} />
						<span>{feature.title}</span>
					</span>
				))}
			</div>
		</div>
	</ProjectCardContainer>
);

class Projects extends Component {
	state = {
		modalIsOpen: false
	};

	openModal = () => {
		this.setState({ modalIsOpen: true });
	};

	closeModal = () => {
		this.setState({ modalIsOpen: false });
	};

	render() {
		const { allMarkdownRemark: projects, totalPages, markdownRemark } = this.props.data;
		return (
			<Page
				location={this.props.location}
				totalCount={totalPages.totalCount}
				index={markdownRemark.frontmatter.index}
				className="section section--gradient-yellow">
				<div className="project-grid">
					<PoseGroup animateOnMount>
						{projects.edges.length &&
							projects.edges.map(project => (
								<ProjectCard
									onClick={this.openModal}
									key={project.node.id}
									features={project.node.frontmatter.features}
									image={project.node.frontmatter.image}
									type={project.node.frontmatter.type}
									title={project.node.frontmatter.title}
								/>
							))}
					</PoseGroup>
					<div className="more-projects">
						<h3 className="more-projects--title">MORE&nbsp;PROJECTS</h3>
						<IoIosArrowRight className="more-projects--arrow" />
					</div>
				</div>
				<PageNavigator prev={{ title: "Who We Are", url: "/whoweare" }} next={{ title: "Team", url: "/team" }} />
				<Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
					<ProjectModal />
				</Modal>
			</Page>
		);
	}
}

const ProjectCardContainer = posed.div({
	enter: {
		y: 0,
		opacity: 1,
		delay: 1000,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		y: "-10%",
		opacity: 0
	}
});

export default Projects;

export const ProjectPageQuery = graphql`
	query ProjectPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			html
			frontmatter {
				title
				index
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
		allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "single-project" } } }) {
			edges {
				node {
					id
					frontmatter {
						title
						image
						type
						features {
							title
							icon
						}
					}
				}
			}
		}
	}
`;
