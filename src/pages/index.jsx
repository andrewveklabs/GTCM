import React, { Fragment, Component } from "react";
import NavigatorArrow from "../components/NavigatorArrow";
import Indicator from "../components/Indicator";
import { bindKeyboard } from "react-swipeable-views-utils";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import Helmet from "react-helmet";
import html2canvas from "html2canvas";

import IndexSlide from "../slides/index";
import WhoWeAre from "../slides/whoweare";
import Projects from "../slides/projects";
import Team from "../slides/team";
import Contact from "../slides/contact";
import News from "../slides/news";
import Explore from "../slides/explore";

import bg from "../../static/img/home-hero.jpg";
import "normalize.css";
import "../styles/main.scss";
import "../styles/index.scss";
import "../styles/whoweare.scss";

const BindKeyboardSwipeableRoutes = bindKeyboard(SwipeableRoutes);

class IndexPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			index: 0,
			light: true,
			prevTitle: "",
			nextTitle: "Who We Are",
			title: "Home",
			explore: false,
			screenshotsLoaded: false,
			screenshots: []
		};
	}

	componentDidMount() {
		setTimeout(() => {
			let slides = document.querySelectorAll(".react-swipeable-view-container > div > div");
			let screenshots = [];
			slides.forEach(async slide => {
				try {
					await html2canvas(slide, {
						profile: true,
						ignoreElements: element => {
							return element.className === "ignored";
						}
					}).then(canvas => {
						var ctx = canvas.getContext("2d");
						ctx.webkitImageSmoothingEnabled = false;
						ctx.mozImageSmoothingEnabled = false;
						ctx.imageSmoothingEnabled = false;
						screenshots.push(canvas.toDataURL("image/jpeg"));
						this.setState({ screenshots: screenshots });
					});
					if (screenshots.length === 6) this.setState({ screenshotsLoaded: true });
				} catch (err) {
					console.log(err);
				}
			});
		}, 500);
	}

	slideDidSwitch = index => {
		this.setState({
			index: index,
			prevTitle: pages[index].prevTitle,
			nextTitle: pages[index].nextTitle,
			light: pages[index].light,
			title: pages[index].title
		});
	};

	forwardSlide = () => {
		this.setState(prevState => ({
			index: prevState.index + 1
		}));
	};

	backwardSlide = () => {
		this.setState(prevState => ({
			index: prevState.index - 1
		}));
	};

	explore = () => {
		this.setState(prevState => ({ explore: !prevState.explore }));
	};

	render() {
		const data = this.props.data;
		const { totalCount } = this.props.data.totalPages;

		return (
			<Fragment>
				<Helmet title={`GTCM | ${this.state.title}`} />
				{typeof window !== "undefined" ? (
					<Router>
						{this.state.screenshotsLoaded && this.state.explore ? (
							""
						) : (
							<Fragment>
								<BindKeyboardSwipeableRoutes
									resistance
									enableMouseEvents
									ignoreNativeScroll
									index={this.state.index}
									onChangeIndex={this.slideDidSwitch}
									style={{ opacity: this.state.explore ? 0 : 1 }}
									slideStyle={{ position: "relative", transform: this.state.explore ? "scale(0.5" : "" }}>
									<Route exact path="/">
										<IndexSlide
											author={data.NewsWidget.edges[0].node.frontmatter.author}
											slug={data.NewsWidget.edges[0].node.fields.slug}
											title={data.NewsWidget.edges[0].node.frontmatter.title}
											date={data.NewsWidget.edges[0].node.frontmatter.date}
											light={this.state.light}
											bg={bg}
											onExplore={this.explore}
										/>
									</Route>
									<Route path="/whoweare">
										<WhoWeAre
											title={data.WhoWeAre.edges[0].node.frontmatter.title}
											image={data.WhoWeAre.edges[0].node.frontmatter.image}
											caption={data.WhoWeAre.edges[0].node.frontmatter.caption}
											content={data.WhoWeAre.edges[0].node.html}
											onExplore={this.explore}
										/>
									</Route>
									<Route path="/projects">
										<Projects
											title={data.Projects.edges[0].node.frontmatter.title}
											image={data.WhoWeAre.edges[0].node.frontmatter.image}
											caption={data.WhoWeAre.edges[0].node.frontmatter.caption}
											projects={data.SingleProject.edges}
											onExplore={this.explore}
										/>
									</Route>
									<Route path="/team">
										<Team
											title={data.Team.edges[0].node.frontmatter.title}
											members={data.Team.edges[0].node.frontmatter.members}
											onExplore={this.explore}
										/>
									</Route>
									<Route path="/contact">
										<Contact
											title={data.Contact.edges[0].node.frontmatter.title}
											tagline={data.Contact.edges[0].node.frontmatter.tagline}
											light={this.state.light}
											blueLine
											onExplore={this.explore}
										/>
									</Route>
									<Route path="/news">
										<News title={data.News.edges[0].node.frontmatter.title} posts={data.Posts.edges} explore={this.explore} />
									</Route>
								</BindKeyboardSwipeableRoutes>
							</Fragment>
						)}
					</Router>
				) : (
					""
				)}
				{this.state.screenshotsLoaded && this.state.explore ? (
					<Explore index={this.state.index} pageInfo={pages} images={this.state.screenshots} />
				) : (
					""
				)}
				{this.state.screenshotsLoaded && this.state.explore ? (
					""
				) : (
					<div className={`page-navigator ${this.state.light ? "light" : ""}`}>
						{this.state.prevTitle !== "" ? <NavigatorArrow onClick={this.backwardSlide} text={this.state.prevTitle} left /> : ""}
						{this.state.nextTitle !== "" ? <NavigatorArrow onClick={this.forwardSlide} text={this.state.nextTitle} right /> : ""}
					</div>
				)}
				<button onClick={this.explore} style={{ position: "absolute", left: 0, top: 0 }}>
					Explore
				</button>
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
		NewsWidget: allMarkdownRemark(
			limit: 1
			sort: { order: DESC, fields: [frontmatter___date] }
			filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
		) {
			edges {
				node {
					id
					fields {
						slug
					}
					frontmatter {
						title
						author
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
		Team: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "team" } } }) {
			edges {
				node {
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
			}
		}
		Contact: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "contact" } } }) {
			edges {
				node {
					frontmatter {
						title
						index
						tagline
					}
				}
			}
		}
		Posts: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "blog-post" } } }, sort: { order: DESC, fields: [frontmatter___date] }) {
			edges {
				node {
					id
					frontmatter {
						title
						date
						description
						tags
						image
						author
					}
				}
			}
		}
		News: allMarkdownRemark(filter: { frontmatter: { templateKey: { eq: "news" } } }) {
			edges {
				node {
					frontmatter {
						title
					}
				}
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
