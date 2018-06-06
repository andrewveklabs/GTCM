import React from "react";
import Page from "../components/Page";

import "../styles/projects.scss";

const FeatureIcon = () => {};

const ProjectCard = ({ title, type, image, features }) => (
	<div className="project-card">
		<img className="project-card--image" src={image} alt={title} />
		<div className="project-card--bottom">
			<h4 className="project-card--title">{title}</h4>
			<span className="project-card--type">{type}</span>
			<div className="project-card--features">{features.map(feature => <span className="project-card--feature-title">{feature.title}</span>)}</div>
		</div>
	</div>
);

const Projects = ({ index, image, caption, title, projects = [{ id: 1 }], totalCount }) => (
	<Page title={title} line={false} index={index} totalCount={totalCount} className="section section--gradient-yellow">
		<div className="project-grid">
			{projects.length
				? projects.map(project => <ProjectCard key={project.node.id} features={project.node.frontmatter.features} image={project.node.frontmatter.image} type={project.node.frontmatter.type} title={project.node.frontmatter.title} />)
				: ""}
		</div>
	</Page>
);

export default Projects;
