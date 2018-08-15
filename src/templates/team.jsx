import React from "react";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import "../styles/team.scss";

const Team = ({ data, location }) => {
	const { markdownRemark: team } = data;
	return (
		<Page
			location={location}
			index={team.frontmatter.index}
			totalCount={data.totalPages.totalCount}
			title="Team"
			className="section section--team section--gradient-gray">
			<div className="team-members">
				{team.frontmatter.members.map(member => (
					<div key={member.name} className="team-member">
						<img className="team-member--image" src={member.image} alt={member.name} />
						<div className="team-member--info">
							<h3 className="team-member--name">{member.name}</h3>
							<span className="team-member--title">{member.title}</span>
						</div>
					</div>
				))}
			</div>
			<PageNavigator prev={{ title: "Projects", url: "/projects" }} next={{ title: "Contact", url: "/contact" }} />
		</Page>
	);
};

export default Team;

export const TeamPageQuery = graphql`
	query TeamPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				index
				members {
					name
					title
					image
				}
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
