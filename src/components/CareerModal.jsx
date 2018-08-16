import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import styleguide from "./styleguide";
import logo from "../img/Single.svg";

const CareerModal = ({ text }) => (
	<CareerContainer>
		<CareerLogo src={logo} alt="GTCM logo" />
		<p>{text}</p>
		<p>
			Please submit your resume to Human Resources. <a href="mailto:info@gtcm.ca">info@gtcm.ca</a>
		</p>
	</CareerContainer>
);

const CareerLogo = styled.img`
	width: ${styleguide.c(1)};
	margin-bottom: ${styleguide.c(0.25)};
`;

const CareerContainer = styled.div`
	margin-top: ${styleguide.c(1)};
	background: white;
	padding: ${styleguide.c(1)} ${styleguide.c(1)};
	box-sizing: border-box;
	width: ${styleguide.c(12)};
`;

export default CareerModal;
