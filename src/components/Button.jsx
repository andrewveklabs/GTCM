import React from "react";
import styled from "styled-components";
import Link from "gatsby-link";
import styleguide from "./styleguide";
import PropTypes from "prop-types";

import { IoIosArrowRight } from "react-icons/lib/io";

const ButtonLink = styled(Link)`
	color: ${styleguide.blue};
	text-transform: uppercase;
	float: right;
	margin-top: 0.2em;
	padding-right: ${styleguide.col / 2}vw

	&:hover {
		opacity: 1;
		text-decoration: underline;
	}
`;

const Button = ({ children, to = "", simple }) => {
	return (
		<ButtonLink simple={simple} to={to}>
			{children}
			<IoIosArrowRight style={{ marginTop: "-0.2em" }} />
		</ButtonLink>
	);
};

Button.propTypes = {
	simple: PropTypes.boolean
};

export default Button;
