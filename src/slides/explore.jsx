import React, { Component, Fragment } from "react";
import { bindKeyboard } from "react-swipeable-views-utils";
import SwipeableViews from "react-swipeable-views";

import "../styles/explore.scss";

const BindKeyboardSwipeableViews = bindKeyboard(SwipeableViews);

class Explore extends Component {
	navigate = () => {};
	render() {
		const { images, index, pageInfo } = this.props;
		return (
			<Fragment>
				<BindKeyboardSwipeableViews
					resistance
					enableMouseEvents
					ignoreNativeScroll
					index={index}
					slideStyle={{ overflow: "visible" }}
					className="explore-view">
					{images.map((image, i) => (
						<div onClick={this.navigate} className="explore-image">
							<h4 className="explore-page-title">{pageInfo[i].title}</h4>
							<img alt="screenshot" src={image} />
						</div>
					))}
				</BindKeyboardSwipeableViews>
			</Fragment>
		);
	}
}

export default Explore;
