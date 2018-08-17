import React, { Component } from "react";
import styled from "styled-components";
import Helmet from "react-helmet";
import Header from "./Header";
import Indicator from "./Indicator";
import Layout from "./layout";
import posed, { PoseGroup } from "react-pose";
import styleguide from "./styleguide";
import PageNavigator from "./PageNavigator";
import { navigateTo } from "gatsby";

class Page extends Component {
	handleScroll = e => {
		if (e.deltaY < -500) {
			setTimeout(() => {
				navigateTo(this.props.next.url);
			}, 100);
		} else if (e.deltaY > 500) {
			setTimeout(() => {
				navigateTo(this.props.prev.url);
			}, 100);
		}
	};

	handleKey = e => {
		if (e.key == "ArrowRight" && !e.repeat) {
			navigateTo(this.props.next.url);
		} else if (e.key == "ArrowLeft" && !e.repeat) {
			navigateTo(this.props.prev.url);
		}
	};

	componentDidMount() {
		setTimeout(() => {
			window.addEventListener("wheel", this.handleScroll);
			window.addEventListener("keydown", this.handleKey);
		}, 1000);
	}

	componentWillUnmount() {
		window.removeEventListener("wheel", this.handleScroll);
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
					id={id}
					pose="enter"
					initialPose="exit"
					className={`${className} Page-Component`}
					style={{ ...style }}
					{...others}>
					<Header line={line} title={title} color={light ? "white" : "black"} />
					<Indicator light={light} index={index} totalCount={totalCount + 1} />
					<PageNavigator light={light} prev={prev} next={next} />
					{children}
				</Swipe>
			</Layout>
		);
	}
}

const Swipe = posed.div({
	enter: {
		opacity: 1,
		delay: 50,
		delayChildren: 200,
		transition: {
			default: { ease: styleguide.bezierArray, duration: 200 }
		}
	},
	exit: {
		opacity: 0
	}
});

export default Page;
