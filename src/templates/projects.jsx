import React, { Component } from "react";
import styled from "styled-components";
import Page from "../components/Page";
import ProjectModal from "../components/ProjectModal";
import Modal from "react-modal";
import Img from "gatsby-image";
import { IoIosArrowRight, IoIosLightbulbOutline, IoIosCheckmarkOutline, IoIosSnowy } from "react-icons/lib/io";
import styleguide from "../components/styleguide";
import posed, { PoseGroup } from "react-pose";
import "../styles/projects.scss";
import { graphql } from "gatsby";

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

const ProjectCard = ({ title, type, image, features, hostRef, transition, ongoing, onClick }) => (
	<div onClick={onClick} className="project-card" style={{ transition }} ref={hostRef}>
		{ongoing && <Badge>ongoing</Badge>}
		<Img className="project-card--image" fluid={image.childImageSharp.fluid} alt={title} />
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
	</div>
);

class Projects extends Component {
	state = {
		modalIsOpen: false,
		transition: "",
		sidetransition: "",
		project: {}
	};

	openModal = (project, html) => {
		this.setState({ project, projectHTML: html, modalIsOpen: true });
	};

	render() {
		const { allMarkdownRemark: projects, totalPages, markdownRemark } = this.props.data;
		return (
			<Page
				prev={{ title: "Who We Are", url: "/whoweare" }}
				next={{ title: "Leadership", url: "/leadership" }}
				location={this.props.location}
				totalCount={totalPages.totalCount}
				title="Projects"
				line={false}
				index={markdownRemark.frontmatter.index}
				className="section section--gradient-yellow">
				<div className="project-grid">
					<PoseGroup animateOnMount>
						{projects.edges.length &&
							projects.edges.map((project, index) => (
								<ProjectCardContainer
									onPoseComplete={() => {
										setTimeout(() => {
											this.setState({ transition: "225ms" });
										}, 1500);
									}}
									ongoing={project.node.frontmatter.ongoing}
									transition={this.state.transition}
									index={index}
									onClick={() => this.openModal(project.node.frontmatter, project.node.html)}
									key={project.node.id}
									features={project.node.frontmatter.features}
									image={project.node.frontmatter.image}
									type={project.node.frontmatter.type}
									title={project.node.frontmatter.title}
								/>
							))}
					</PoseGroup>
					<MoreProjects
						onPoseComplete={() => {
							setTimeout(() => {
								this.setState({ sidetransition: "225ms" });
							}, 1000);
						}}
						style={{ transition: this.state.sidetransition }}
						pose="enter"
						initialPose="exit"
						className="more-projects">
						<h3 className="more-projects--title">MORE&nbsp;PROJECTS</h3>
						<IoIosArrowRight className="more-projects--arrow" />
					</MoreProjects>
				</div>
				<Modal
					overlayClassName="Overlay Project-Overlay"
					className="Project-Modal"
					isOpen={this.state.modalIsOpen}
					onRequestClose={() => this.setState({ modalIsOpen: false })}>
					<ProjectModal
						closeModal={() => this.setState({ modalIsOpen: false })}
						html={this.state.projectHTML}
						{...this.state.project}
					/>
				</Modal>
			</Page>
		);
	}
}

const Badge = styled.div`
	background-color: rgba(0, 0, 0, 0.8);
	border-radius: 5px;
	text-transform: uppercase;
	padding: 0 0.25rem;
	font-size: 14px;
	color: white;
	position: absolute;
	z-index: 99;
	top: 10px;
	right: 10px;
`;

const MoreProjects = posed.div({
	enter: {
		x: 0,
		opacity: 1,
		delay: 750,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		x: "15%",
		opacity: 0
	}
});

const ProjectCardContainer = posed(ProjectCard)({
	enter: {
		y: 0,
		opacity: 1,
		delay: ({ index }) => index * 250 + 350,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		y: "10%"
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
		allMarkdownRemark(
			sort: { order: DESC, fields: frontmatter___date }
			filter: { frontmatter: { templateKey: { eq: "single-project" } } }
		) {
			edges {
				node {
					id
					html
					frontmatter {
						title
						ongoing
						image {
							childImageSharp {
								fluid(maxWidth: 1200, quality: 100) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
						thumbs: images {
							childImageSharp {
								fixed(width: 200, height: 200, quality: 100) {
									...GatsbyImageSharpFixed_withWebp
								}
							}
						}
						images {
							childImageSharp {
								fluid(maxWidth: 1200, quality: 100) {
									...GatsbyImageSharpFluid_withWebp
								}
							}
						}
						type
						description
						year: date(formatString: "YYYY")
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
