import React from "react";
import PropTypes from "prop-types";
import { HTMLContent } from "../components/Content";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import { IoIosArrowRight, IoIosLightbulbOutline, IoIosCheckmarkOutline, IoIosSnowy } from "react-icons/lib/io";

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
	<div className="project-card">
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
	</div>
);

const Projects = ({ data }) => {
	const { allMarkdownRemark: projects } = data;
	return (
		<Page
			totalCount={data.totalPages.totalCount}
			index={data.markdownRemark.frontmatter.index}
			className="section section--gradient-yellow">
			<div className="project-grid">
				{projects.edges.length &&
					projects.edges.map(project => (
						<ProjectCard
							key={project.node.id}
							features={project.node.frontmatter.features}
							image={project.node.frontmatter.image}
							type={project.node.frontmatter.type}
							title={project.node.frontmatter.title}
						/>
					))}
				<div className="more-projects">
					<h3 className="more-projects--title">MORE&nbsp;PROJECTS</h3>
					<IoIosArrowRight className="more-projects--arrow" />
				</div>
			</div>
			<PageNavigator prev={{ title: "Who We Are", url: "/whoweare" }} next={{ title: "Team", url: "/team" }} />
		</Page>
	);
};

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
