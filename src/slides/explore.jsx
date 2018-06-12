import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { bindKeyboard } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";
import Indicator from "../components/Indicator";
import _ from "lodash";

import "../styles/explore.scss";

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

class Explore extends Component {
	navigate = () => {};
	state = {
		index: 0
	};
	componentDidMount() {
		this.setState({ index: this.props.index });
	}
	slideDidSwitch = index => {
		this.setState({
			index: index
		});
	};
	render() {
		const { images, index, pageInfo } = this.props;
		return (
			<Route path="explore">
				<Fragment>
					<BindKeyboardSwipeableViews
						resistance
						enableMouseEvents
						ignoreNativeScroll
						onChangeIndex={this.slideDidSwitch}
						index={this.state.index}
						slideStyle={{ overflow: "visible" }}
						className="explore-view">
						{_.sortBy(images, image => image.index).map((image, i) => (
							<div key={i} onClick={this.navigate} className="explore-image">
								<h4 className="explore-page-title">{pageInfo[i].title}</h4>
								<img alt="screenshot" src={image.imageData} />
							</div>
						))}
					</BindKeyboardSwipeableViews>
					<Indicator light index={this.state.index + 1} totalCount={images.length} />
				</Fragment>
			</Route>
		);
	}
}

export default Explore;
