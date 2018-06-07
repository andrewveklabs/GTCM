import React from "react";
import Page from "../components/Page";
import Button from "../components/Button";
import { IoIosArrowThinRight } from "react-icons/lib/io";
import { HTMLContent } from "../components/Content";

const WhoWeAre = ({ image, content, caption, title }) => (
	<Page title={title} className="section section--gradient-gray">
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
	</Page>
);

export default WhoWeAre;
