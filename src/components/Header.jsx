import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";

const StyledNav = styled.nav`
	a,
	span {
		color: ${props => props.color};
	}
	h2 {
		margin-left: ${100 / 24}vw;
	}
`;

const Header = ({ color = "black", title, line = true }) => (
	<StyledNav className="navbar" color={color}>
		<Flex justifyBetween alignCenter>
			<FlexItem>
				<h2>
					{line === true ? <strike className={`line-through ${title}`}>{title && title}</strike> : title && title}
				</h2>
			</FlexItem>
			<FlexItem>
				<h5>
					<Link to="menu" exact>
						Menu
					</Link>
					<Link to="contact">Contact</Link>
					<span className="navbar-divider">|</span>
					<a href="tel:+1 403 256 3668">+1 403 256 3668</a>
				</h5>
			</FlexItem>
		</Flex>
	</StyledNav>
);

export default Header;
