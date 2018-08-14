import React, { Fragment } from "react";
import Link from "gatsby-link";
import styled from "styled-components";
import styleguide from "./styleguide";
import { IoIosHelp } from "react-icons/lib/io";

const StyledNav = styled.nav`
	display: flex;
	justify-content: flex-end;
	align-items: center;

	h2 {
		margin: auto;
		margin-left: ${styleguide.col * 2}vw;
		color: ${props => props.color};

		strike {
			padding-right: 1rem;
		}
	}

	a,
	span {
		color: ${props => props.color};
	}
`;

const Header = ({ color = "black", title, line = true, blueLine }) => (
	<StyledNav className="navbar" color={color}>
		{title ? <h2 className="page-title">{line ? <strike className={`line-through page-header ${blueLine ? "blue-line" : ""}`}>{title}</strike> : <Fragment>{title}</Fragment>}</h2> : ""}
		<h5>
			<Link to="explore" exact>
				Explore
			</Link>
			<Link to="contact">Contact</Link>
			<span className="navbar-divider">|</span>
			<a href="tel:+1 403 256 3668">+1 403 256 3668</a>
			{/* <IoIosHelp color={color} /> */}
		</h5>
	</StyledNav>
);

export default Header;
