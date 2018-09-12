import React from "react";
import styled from "styled-components";
import Flex from "styled-flex-component";
import styleguide from "./styleguide";
import Img from "gatsby-image";
import {
	IoIosClose,
	IoIosUploadOutline,
	IoSocialFacebook,
	IoSocialTwitter,
	IoSocialGoogleplus
} from "react-icons/lib/io";

const PostModal = ({ title, image, tags, date, html, author, closeModal }) => {
	return (
		<ModalContainer>
			<ImageContainer>
				<Close onClick={closeModal} color="black" size={28} />
				<ModalImage fluid={image.childImageSharp.fluid} alt={`${title} image`} />
			</ImageContainer>
			<ModalInner>
				<ModalTitle>{title}</ModalTitle>
				<PostDetails>
					<ProjectYear>{date}</ProjectYear>
					{tags.map(tag => (
						<ProjectType>{tag}</ProjectType>
					))}
					{author && <strong>by {author}</strong>}
				</PostDetails>
				<ProjectDescription dangerouslySetInnerHTML={{ __html: html }} />
			</ModalInner>
			<ModalSidebar>
				<Flex column>
					<SocialButton color="black">
						<IoIosUploadOutline color="white" size={20} />
					</SocialButton>
					<SocialButton color="#5375D6">
						<IoSocialFacebook color="white" size={20} />
					</SocialButton>
					<SocialButton color="#41C9F5">
						<IoSocialTwitter color="white" size={20} />
					</SocialButton>
					<SocialButton color="#FC4E4E">
						<IoSocialGoogleplus color="white" size={20} />
					</SocialButton>
				</Flex>
			</ModalSidebar>
		</ModalContainer>
	);
};

const SocialButton = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
	width: 2rem;
	height: 2rem;
	border-radius: 100px;
	background-color: ${props => props.color};
	margin: 0.5rem 0;
	cursor: pointer;
	transition: 125ms cubic-bezier(${styleguide.bezier});

	&:hover {
		box-shadow: 0 2px 6px rgba(0, 0, 0, 0.36);
	}
`;

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

	@media screen and (max-width: 1024px) {
		max-width: auto;
		width: 80%;
		margin: 0 auto;
	}

	@media screen and (max-width: 600px) {
		width: 100%;
	}
`;

const ModalSidebar = styled.div`
	grid-area: sidebar;
	padding-right: ${styleguide.c(1)};
	margin-top: ${styleguide.c(3)};
	position: sticky;

	${Flex} {
		position: sticky;
		top: 0;
	}
`;

const PostDetails = styled.div`
	display: grid;
	grid-auto-flow: column;
	justify-content: start;
	grid-gap: 1rem;
	margin: 1rem 0 2rem;
`;

export const Close = styled(IoIosClose)`
	position: absolute;
	z-index: 99;
	top: 1rem;
	right: 1rem;
	cursor: pointer;
	transition: 225ms cubic-bezier(${styleguide.bezier});
	background: white;
	border-radius: 100px;

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

const ImageContainer = styled.div`
	grid-area: image;
`;

const ModalImage = styled(Img)`
	width: 100%;
	max-height: 400px;
	object-fit: cover;
`;

export default PostModal;
