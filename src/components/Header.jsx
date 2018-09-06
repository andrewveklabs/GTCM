import React, { Component } from "react";
import { Link } from "gatsby";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import Menu from "./Menu";
import logo from "../img/Single.svg";
import styleguide from "./styleguide";

const StyledNav = styled.nav`
	a,
	span {
		color: ${props => props.color};
	}
	h2 {
		margin-left: ${100 / 24}vw;
	}
`;

const HeaderLogo = styled.img`
	width: ${styleguide.c(0.75)};
`;

class Header extends Component {
	render() {
		const { color = "black", title, line = true } = this.props;
		return (
			<StyledNav ref="container" className="navbar" color={color}>
				<Flex className="menu-flex" justifyBetween alignCenter>
					{title && (
						<FlexItem>
							<Flex center>
								{title && (
									<Link className="home-logo" to="/">
										<HeaderLogo src={logo} alt="GTCM logo" />
									</Link>
								)}
								<h2>
									{line === true ? (
										<strike className={`line-through ${title}`}>{title && title}</strike>
									) : (
										title && title
									)}
								</h2>
							</Flex>
						</FlexItem>
					)}
					<FlexItem>
						<h5>
							<Menu color={color} />
							<Link className="contact" to="contact">
								Contact
							</Link>
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
