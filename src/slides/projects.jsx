import React from "react";
import Page from "../components/Page";
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

const Projects = ({ index, image, caption, title, projects = [{ id: 1 }], totalCount }) => (
	<Page title={title} line={false} index={index} totalCount={totalCount} className="section section--gradient-yellow">
		<div className="project-grid">
			{projects.length
				? projects.map(project => <ProjectCard key={project.node.id} features={project.node.frontmatter.features} image={project.node.frontmatter.image} type={project.node.frontmatter.type} title={project.node.frontmatter.title} />)
				: ""}
			<div className="more-projects">
				<h3 className="more-projects--title">MORE&nbsp;PROJECTS</h3>
				<IoIosArrowRight className="more-projects--arrow" />
			</div>
		</div>
	</Page>
);

export default Projects;
