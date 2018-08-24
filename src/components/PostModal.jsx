import React from "react";
import styled from "styled-components";
import Flex, { FlexItem } from "styled-flex-component";
import styleguide from "./styleguide";
import Img from "gatsby-image";
import { IoIosClose } from "react-icons/lib/io";

const PostModal = ({ title, content, image, tags, date, description, html, closeModal }) => {
	return (
		<ModalContainer>
			<ImageContainer>
				<Close onClick={closeModal} color="white" size={28} />
				<ModalImage fluid={image.childImageSharp.fluid} alt={`${title} image`} />
			</ImageContainer>
			<ModalInner>
				<ModalTitle>{title}</ModalTitle>
				<PostDetails>
					<ProjectYear>{date}</ProjectYear>
					{tags.map(tag => (
						<ProjectType>{tag}</ProjectType>
					))}
				</PostDetails>
				<ProjectDescription dangerouslySetInnerHTML={{ __html: html }} />
			</ModalInner>
			<ModalSidebar>Sidebar</ModalSidebar>
		</ModalContainer>
	);
};

const ModalContainer = styled.div`
	max-width: 1200px;
	display: grid;
	width: ${styleguide.c(14)};
	box-shadow: 0 5px 25px rgba(0, 0, 0, 0.24);
	background: white;
	margin-bottom: calc(100vw / 24 * 2);
	grid-gap: 0 calc(100vw / 24 * 1.5);
	grid-template-areas:
		"image image image image"
		"content content content sidebar";
`;

const ModalSidebar = styled.div`
	grid-area: sidebar;
`;

const PostDetails = styled.div`
	display: grid;
	grid-auto-flow: column;
	justify-content: start;
	grid-gap: 1rem;
	margin: 1rem 0 2rem;
`;

const Close = styled(IoIosClose)`
	position: absolute;
	z-index: 99;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
	transition: 225ms cubic-bezier(${styleguide.bezier});

	&:hover {
		opacity: 0.8;
	}
`;

const ProjectDescription = styled.div`
	color: black;

	.gatsby-resp-image-wrapper {
		border-radius: 5px;
		overflow: hidden;
		box-shadow: 0 5px 25px rgba(0, 0, 0, 0.24);
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
	text-transform: capitalize;
`;

const ModalInner = styled.div`
	padding: ${styleguide.c(1)};
	grid-area: content;
`;

const ModalTitle = styled.h2`
	margin: 0;
	line-height: 1.5;
	max-width: 640px;
`;

const Feature = Flex.extend`
	margin: 0 1rem;
`;

const FeatureText = styled.span`
	font-size: 1rem;
	font-weight: 500;
	text-transform: capitalize;
`;

const ImageContainer = styled.div`
	grid-area: image;
`;

const ModalImage = styled(Img)`
	width: 100%;
	max-height: 400px;
	object-fit: cover;
`;

export default PostModal;
