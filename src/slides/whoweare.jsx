import React from "react";
import Page from "../components/Page";
import PageNavigator from "../components/PageNavigator";
import Button from "../components/Button";
import { IoIosArrowThinRight } from "react-icons/lib/io";
import { HTMLContent } from "../components/Content";

const WhoWeAre = ({ index, image, content, caption, title, totalCount }) => (
	<Page title={title} index={index} totalCount={totalCount} className="section section--gradient-gray">
		<div className="double-flex">
			<div className="left-side">
				<span className="since-date">Since 2002</span>
				<h2 className="sub-title">A Construction management company based in Alberta</h2>
				<IoIosArrowThinRight className="arrow-right" />
				<p className="about-blurb">
					<HTMLContent content={content} />
					<Button simple>Read More</Button>
				</p>
			</div>
			<div className="right-side">
				<img className="whoweare-image" src={image} alt="Golden Triangle Construction Workers" />
				<div className="whoweare-image--caption">
					<span className="whoweare-image--caption--title">ABOUT US</span>
					<h5 className="whoweare-image--caption--body">{caption}</h5>
				</div>
			</div>
		</div>
		<PageNavigator prev={{ title: "Home", url: "/" }} next={{ title: "Projects", url: "/projects" }} />
	</Page>
);

export default WhoWeAre;
