import React, { Fragment } from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import styleguide from "./styleguide";
import PropTypes from "prop-types";

import { IoIosArrowRight } from "react-icons/lib/io";

const ButtonLink = styled(Link)`
	color: ${styleguide.blue};
	text-transform: uppercase;
	font-weight: 500;
	float: right;
	margin-top: 0.2em;
	padding-right: ${styleguide.col / 2}vw;

	&:hover {
		opacity: 1;
		text-decoration: underline;
	}
`;

const NoButton = styled.div`
	color: ${styleguide.blue};
	text-transform: uppercase;
	font-weight: 500;
	float: right;
	margin-top: 0.2em;
	padding-right: ${styleguide.col / 2}vw;
	cursor: pointer;

	&:hover {
		opacity: 1;
		text-decoration: underline;
	}
`;

const Button = ({ children, text, to, noLink, onClick }) => {
	return (
		<Fragment>
			{noLink ? (
				<NoButton onClick={onClick}>
					{children}
					<IoIosArrowRight style={{ marginTop: "-0.2em" }} />
				</NoButton>
			) : (
				<ButtonLink to={to}>
					{children}
					<IoIosArrowRight style={{ marginTop: "-0.2em" }} />
				</ButtonLink>
			)}
		</Fragment>
	);
};

Button.propTypes = {
	simple: PropTypes.boolean
};

export default Button;
