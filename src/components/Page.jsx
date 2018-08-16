import React, { Component } from "react";
import Helmet from "react-helmet";
import Header from "./Header";
import Indicator from "./Indicator";
import Layout from "./layout";
import posed from "react-pose";
import styleguide from "./styleguide";
import PageNavigator from "./PageNavigator";

class Page extends Component {
	state = {
		direction: "fromRight",
		pose: "enter"
	};

	componentWillMount() {
		this.setState({ pose: "enter" });
	}

	componentWillUnmount() {
		this.setState({ pose: this.state.direction });
	}

	render() {
		const {
			id,
			className,
			style,
			others,
			light,
			children,
			totalCount,
			index,
			location,
			title,
			line,
			next,
			prev
		} = this.props;
		return (
			<Layout location={location}>
				<Helmet title={title} />
				<Swipe
					initialPose="exit"
					pose="enter"
					id={id}
					className={`${className} Page-Component`}
					style={{ ...style }}
					{...others}>
					<Header line={line} title={title} color={light ? "white" : "black"} />
					<Indicator light={light} index={index} totalCount={totalCount + 1} />
					<PageNavigator
						leftClicked={() => (this.direction = "fromRight")}
						rightClicked={() => (this.direction = "fromLeft")}
						light={light}
						prev={prev}
						next={next}
					/>
					{children}
				</Swipe>
			</Layout>
		);
	}
}

const Swipe = posed.div({
	enter: {
		opacity: 1,
		delayChildren: 500,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 1000 }
		}
	},
	exit: {
		opacity: 0
	},
	fromLeft: {
		x: "-100%"
	}
});

export default Page;
