import React, { Component } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import Menu from "./Menu";

const StyledNav = styled.nav`
	a,
	span {
		color: ${props => props.color};
	}
	h2 {
		margin-left: ${100 / 24}vw;
	}
`;

class Header extends Component {
	render() {
		const { color = "black", title, line = true } = this.props;
		return (
			<StyledNav ref="container" className="navbar" color={color}>
				<Flex justifyBetween alignCenter>
					<FlexItem>
						<h2>
							{line === true ? <strike className={`line-through ${title}`}>{title && title}</strike> : title && title}
						</h2>
					</FlexItem>
					<FlexItem>
						<h5>
							<Menu color={color} />
							<Link to="contact">Contact</Link>
							<span className="navbar-divider">|</span>
							<a href="tel:+1 403 256 3668">+1 403 256 3668</a>
						</h5>
					</FlexItem>
				</Flex>
			</StyledNav>
		);
	}
}

export default Header;
