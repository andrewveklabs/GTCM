import React from "react";
import Link from "gatsby-link";
import styled from "styled-components";

const StyledNav = styled.nav`
	a,
	span {
		color: ${props => props.color};
	}
`;

const Header = ({ color = "black" }) => (
	<StyledNav className="navbar" color={color}>
		<h5>
			<Link to="explore" exact>
				Explore
			</Link>
			<Link to="contact">Contact</Link>
			<span className="navbar-divider">|</span>
			<a href="tel:+1 403 256 3668">+1 403 256 3668</a>
		</h5>
	</StyledNav>
);

export default Header;
