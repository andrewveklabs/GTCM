import React from "react";
import Page from "../components/Page";
import "../styles/contact.scss";
import { HTMLContent } from "../components/Content";
import { IoSocialTwitter, IoSocialFacebook, IoSocialGoogleplus } from "react-icons/lib/io";

const Contact = ({ title, light, blueLine, tagline }) => (
	<Page light={light} blueLine={blueLine} title={title} className="section contact-slide section--gradient-black">
		<div className="double-flex">
			<div className="left-side">
				<h4 className="contact--tagline">
					<HTMLContent content={tagline} />
				</h4>
				<div className="contact--social-icons">
					<IoSocialFacebook className="social-icon blue" />
					<IoSocialTwitter className="social-icon light-blue" />
					<IoSocialGoogleplus className="social-icon red" />
				</div>
			</div>
			<div className="right-side">
				<form action="POST" className="contact-form" netlify netlify={true} id="contact-form">
					<input type="text" className="contact-name" placeholder="Name" />
					<input type="email" className="contact-email" placeholder="Email" />
					<textarea name="contact-message" id="contact-message" cols="30" rows="10" className="contact-message" placeholder="Message" />
					<button className="contact-submit">SUBMIT</button>
				</form>
			</div>
		</div>
	</Page>
);

export default Contact;
