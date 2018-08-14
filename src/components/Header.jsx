import React, { Fragment } from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import styleguide from "./styleguide";

const StyledNav = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;

	h2 {
		margin: auto;
		margin-left: ${styleguide.col * 2}vw;

		strike {
			padding-right: 1rem;
		}
	}

	a,
	span {
		color: ${props => props.color};
	}
`;

const Header = ({ color = "black", title, line = true }) => (
	<StyledNav className="navbar" color={color}>
		{title ? <h2 className="page-title">{line ? <strike className="line-through page-header">{title}</strike> : <Fragment>{title}</Fragment>}</h2> : ""}
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
