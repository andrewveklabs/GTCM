import React, { Component } from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import styleguide from "./styleguide";
import { IoIosLightbulbOutline, IoIosCheckmarkOutline, IoIosSnowy } from "react-icons/lib/io";
import { HTMLContent } from "./Content";

const FeatureIcon = ({ icon, className }) => {
	switch (icon) {
		case "snow":
			return <IoIosSnowy className={className} />;
		case "light":
			return <IoIosLightbulbOutline className={className} />;
		case "check":
			return <IoIosCheckmarkOutline className={className} />;
		default:
			return <IoIosCheckmarkOutline className={className} />;
	}
};

const ProjectModal = ({ title, content, image, images, year, features, type, date, description, html }) => {
	return (
		<ModalContainer>
			<ModalImage src={image} alt={`${title} image`} />
			<ModalInner>
				<Flex justifyBetween alignCenter>
					<FlexItem>
						<ModalTitle>{title}</ModalTitle>
					</FlexItem>
					<FlexItem>
						<Flex justifyBetween>
							{features.map(feature => (
								<Feature alignCenter>
									<ModalFeatureIcon icon={feature.icon} />
									<FeatureText>{feature.title}</FeatureText>
								</Feature>
							))}
						</Flex>
					</FlexItem>
				</Flex>
				<Flex alignCenter>
					<ProjectType>{type}</ProjectType>
					<ProjectYear>{year}</ProjectYear>
				</Flex>
				<ProjectDescription>{description}</ProjectDescription>
			</ModalInner>
		</ModalContainer>
	);
};

const ModalFeatureIcon = styled(FeatureIcon)`
	font-size: 2rem;
	margin-right: 0.25rem;
`;

const ModalContainer = styled.div`
	max-width: 1200px;
	width: ${styleguide.c(14)};
	margin-top: ${styleguide.c(1)};
	box-shadow: 0 5px 25px rgba(0, 0, 0, 0.24);
	background: white;
`;

const ProjectDescription = styled.p`
	color: black;
`;

const ProjectYear = styled.span`
	background: black;
	color: white;
	padding: 0 0.5rem;
	font-size: 16px;
	border-radius: 5px;
`;

const ProjectType = styled.span`
	color: ${styleguide.blue};
	margin-right: 1rem;
`;

const ModalInner = styled.div`
	padding: ${styleguide.c(1)};
`;

const ModalTitle = styled.h2`
	line-height: 0;
`;

const Feature = Flex.extend`
	margin: 0 1rem;
`;

const FeatureText = styled.span`
	font-size: 1rem;
	font-weight: 500;
	text-transform: capitalize;
`;

const ModalImage = styled.img`
	width: 100%;
	max-height: 400px;
	object-fit: cover;
`;

export default ProjectModal;
