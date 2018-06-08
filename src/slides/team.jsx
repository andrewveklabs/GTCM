import React from "react";
import Page from "../components/Page";
import "../styles/team.scss";

const Team = ({ title, members }) => (
	<Page title={title} className="section section--team section--gradient-gray">
		<div className="team-members">
			{members.map(member => (
				<div key={member.name} className="team-member">
					<img className="team-member--image" src={member.image} alt={member.name} />
					<div className="team-member--info">
						<h3 className="team-member--name">{member.name}</h3>
						<span className="team-member--title">{member.title}</span>
					</div>
				</div>
			))}
		</div>
	</Page>
);

export default Team;
