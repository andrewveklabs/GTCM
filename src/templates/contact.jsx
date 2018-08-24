import React from "react";
import Page from "../components/Page";
import "../styles/contact.scss";
import { HTMLContent } from "../components/Content";
import { IoSocialTwitter, IoSocialFacebook, IoSocialGoogleplus } from "react-icons/lib/io";
import { graphql } from "gatsby";

const Contact = ({ data, location }) => (
	<Page
		blueLine={true}
		light
		prev={{ title: "Services", url: "/services" }}
		next={{ title: "News", url: "/news" }}
		title="Contact"
		index={data.markdownRemark.frontmatter.index}
		totalCount={data.totalPages.totalCount}
		location={location}
		className="section contact-slide section--gradient-black">
		<div className="double-flex">
			<div className="left-side">
				<h4 className="contact--tagline">
					<HTMLContent content={data.markdownRemark.frontmatter.tagline} />
				</h4>
				<div className="contact--social-icons">
					<IoSocialFacebook className="social-icon blue" />
					<IoSocialTwitter className="social-icon light-blue" />
					<IoSocialGoogleplus className="social-icon red" />
				</div>
			</div>
			<div className="right-side">
				<form action="POST" className="contact-form" netlify={true} id="contact-form">
					<input type="text" className="contact-name" placeholder="Name" />
					<input type="email" className="contact-email" placeholder="Email" />
					<textarea
						name="contact-message"
						id="contact-message"
						cols="30"
						rows="10"
						className="contact-message"
						placeholder="Message"
					/>
					<button className="contact-submit">SUBMIT</button>
				</form>
			</div>
		</div>
	</Page>
);

export default Contact;

export const ContactPageQuery = graphql`
	query ContactPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				index
				tagline
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
