import React, { Fragment, Component } from "react";
import NavigatorArrow from "../components/NavigatorArrow";
import Indicator from "../components/Indicator";
import SwipeableViews from "react-swipeable-views";
import { bindKeyboard } from "react-swipeable-views-utils";

import IndexSlide from "../slides/index";
import WhoWeAre from "../slides/whoweare";
import Projects from "../slides/projects";
import Team from "../slides/team";
import Contact from "../slides/contact";
import News from "../slides/news";

import bg from "../../static/img/home-hero.jpg";
import "normalize.css";
import "../styles/main.scss";
import "../styles/index.scss";
import "../styles/whoweare.scss";

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			light: true,
			prevTitle: "",
			nextTitle: "Who We Are"
		};
	}

	componentDidMount() {
		//Collect Screenshots of pages
	}

	slideDidSwitch = (index, indexLatest, meta) => {
		this.setState({
			index: index,
			prevTitle: pages[index].prevTitle,
			nextTitle: pages[index].nextTitle,
			light: pages[index].light
		});
	};

	forwardSlide = () => {
		this.setState(prevState => ({
			index: prevState.index + 1,
			prevTitle: pages[prevState.index + 1].prevTitle,
			nextTitle: pages[prevState.index + 1].nextTitle,
			light: pages[prevState.index + 1].light
		}));
	};

	backwardSlide = () => {
		this.setState(prevState => ({
			index: prevState.index - 1,
			prevTitle: pages[prevState.index - 1].prevTitle,
			nextTitle: pages[prevState.index - 1].nextTitle,
			light: pages[prevState.index - 1].light
		}));
	};

	render() {
		const data = this.props.data;
		const { totalCount } = this.props.data.totalPages;

		return (
			<Fragment>
				<BindKeyboardSwipeableViews resistance enableMouseEvents ignoreNativeScroll index={this.state.index} onChangeIndex={this.slideDidSwitch} slideStyle={{ position: "relative" }}>
					<IndexSlide slug={data.NewsWidget.edges[0].node.fields.slug} title={data.NewsWidget.edges[0].node.frontmatter.title} date={data.NewsWidget.edges[0].node.frontmatter.date} light={this.state.light} bg={bg} />
					<WhoWeAre title={data.WhoWeAre.edges[0].node.frontmatter.title} image={data.WhoWeAre.edges[0].node.frontmatter.image} caption={data.WhoWeAre.edges[0].node.frontmatter.caption} content={data.WhoWeAre.edges[0].node.html} />
					<Projects title={data.Projects.edges[0].node.frontmatter.title} image={data.WhoWeAre.edges[0].node.frontmatter.image} caption={data.WhoWeAre.edges[0].node.frontmatter.caption} projects={data.SingleProject.edges} />
					<Team title="Team" />
					<Contact title="Contact" light={this.state.light} blueLine />
					<News title="News" />
				</BindKeyboardSwipeableViews>
				<div className={`page-navigator ${this.state.light ? "light" : ""}`}>
					{this.state.prevTitle !== "" ? <NavigatorArrow onClick={this.backwardSlide} text={this.state.prevTitle} left /> : ""}
					{this.state.nextTitle !== "" ? <NavigatorArrow onClick={this.forwardSlide} text={this.state.nextTitle} right /> : ""}
				</div>
				<Indicator light={this.state.light} index={this.state.index + 1} totalCount={totalCount + 1} />
			</Fragment>
		);
	}
}

const pages = [
	{
		title: "Home",
		slug: "/",
		prevTitle: "",
		nextTitle: "Who We Are",
		light: true
	},
	{
		title: "Who We Are",
		slug: "/whoweare",
		prevTitle: "Home",
		nextTitle: "Projects"
	},
	{
		title: "Projects",
		slug: "/projects",
		prevTitle: "Who We Are",
		nextTitle: "Team"
	},
	{
		title: "Team",
		slug: "/team",
		prevTitle: "Projects",
		nextTitle: "Contact"
	},
	{
		title: "Contact",
		slug: "/contact",
		prevTitle: "Team",
		nextTitle: "News",
		light: true
	},
	{
		title: "News",
		slug: "/news",
		prevTitle: "Contact",
		nextTitle: ""
	}
];

export default IndexPage;

export const pageQuery = graphql`
	query Pages {
		NewsWidget: allMarkdownRemark(limit: 1, sort: { order: DESC, fields: [frontmatter___date] }, filter: { frontmatter: { templateKey: { eq: "blog-post" } } }) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
						date(formatString: "YYYY")
					}
				}
			}
		}
		Projects: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "projects" } } }) {
			edges {
				node {
					frontmatter {
						title
						index
					}
				}
			}
		}
		SingleProject: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "single-project" } } }) {
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
		WhoWeAre: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "whoweare" } } }) {
			edges {
				node {
					html
					frontmatter {
						title
						index
						image
						caption
					}
				}
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
