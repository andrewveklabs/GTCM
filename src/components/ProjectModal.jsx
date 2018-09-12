import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import styleguide from "./styleguide";
import { IoIosLightbulbOutline, IoIosCheckmarkOutline, IoIosSnowy } from "react-icons/lib/io";
import Img from "gatsby-image";
import { Close } from "./PostModal";
import Lightbox from "react-image-lightbox";

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

const ProjectModal = ({
	title,
	content,
	image,
	images,
	thumbs,
	year,
	features,
	type,
	date,
	description,
	html,
	closeModal
}) => {
	return (
		<ModalContainer>
			<Close onClick={closeModal} color="black" size={28} />
			<ModalImage fluid={image.childImageSharp.fluid} alt={`${title} image`} />
			<ModalInner>
				<HeaderFlex justifyBetween alignCenter>
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
				</HeaderFlex>
				<Flex alignCenter>
					<ProjectType>{type}</ProjectType>
					<ProjectYear>{year}</ProjectYear>
				</Flex>
				<ProjectDescription>{description}</ProjectDescription>
				<ProjectImages>{thumbs && thumbs.map(image => <Img fixed={image.childImageSharp.fixed} />)}</ProjectImages>
				<ProjectText dangerouslySetInnerHTML={{ __html: html }} />
			</ModalInner>
		</ModalContainer>
	);
};

const HeaderFlex = Flex.extend`
	@media screen and (max-width: 600px) {
		flex-direction: column;
		align-items: flex-start;
	}
`;

const ModalFeatureIcon = styled(FeatureIcon)`
	font-size: 2rem;
	margin-right: 0.25rem;

	@media screen and (max-width: 600px) {
		font-size: 1rem;
	}
`;

const ModalContainer = styled.div`
	max-width: 1200px;
	width: ${styleguide.c(14)};
	margin: ${styleguide.c(1)} 0;
	box-shadow: 0 5px 25px rgba(0, 0, 0, 0.24);
	background: white;

	@media screen and (max-width: 1200px) {
		width: 80%;
		margin: ${styleguide.c(1)} auto;
		overflow: hidden;
		z-index: 99999999;
		position: relative;
	}
	@media screen and (max-width: 1200px) {
		width: 100%;
	}
`;

const ProjectDescription = styled.p`
	color: black;
`;

const ProjectText = styled.p``;

const ProjectImages = styled.div`
	display: grid;
	grid-auto-flow: column;
	grid-gap: 10px;
	margin-top: ${styleguide.c(1)};

	@media screen and (max-width: 600px) {
	}
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
	margin: 0;
`;

const Feature = Flex.extend`
	margin: 0 1rem;

	@media screen and (max-width: 600px) {
		flex-direction: column;
		margin-bottom: 1rem;
	}
`;

const FeatureText = styled.span`
	font-size: 1rem;
	font-weight: 500;
	text-transform: capitalize;
`;

const ModalImage = styled(Img)`
	width: 100%;
	max-height: 400px;
	object-fit: cover;
`;

export default ProjectModal;
