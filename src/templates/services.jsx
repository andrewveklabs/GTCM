import React, { Component } from "react";
import styled from "styled-components";
import Page from "../components/Page";
import "../styles/team.scss";
import posed from "react-pose";
import styleguide from "../components/styleguide";
import Modal from "react-modal";
import { graphql } from "gatsby";
import {
	IoIosCalculatorOutline,
	IoIosHomeOutline,
	IoIosPieOutline,
	IoIosBriefcaseOutline,
	IoIosBody
} from "react-icons/lib/io";
import Flex from "styled-flex-component";

const Icons = {
	calculator: <IoIosCalculatorOutline size={60} />,
	home: <IoIosHomeOutline size={60} />,
	pie: <IoIosPieOutline size={60} />,
	briefcase: <IoIosBriefcaseOutline size={60} />,
	safety: <IoIosBody size={60} />
};

const Icon = ({ icon }) => {
	return <>{Icons[icon]}</>;
};

Modal.setAppElement("#___gatsby");

class Services extends Component {
	state = {
		isOpen: false,
		modalInnerText: "",
		icon: null
	};

	openModal = () => {
		this.setState({ isOpen: true });
	};

	render() {
		const { data, location } = this.props;
		const { markdownRemark: page, services } = data;

		return (
			<Page
				location={location}
				prev={{ title: "Leadership", url: "/leadership" }}
				next={{ title: "Contact", url: "/contact" }}
				index={page.frontmatter.index}
				totalCount={data.totalPages.totalCount}
				title={page.frontmatter.title}
				className="section section--services section--gradient-blue">
				<ServiceGrid>
					{services.edges &&
						services.edges.map((service, i) => (
							<ServiceCard
								onClick={() =>
									this.setState({
										modalInnerText: service.node.html,
										isOpen: true,
										icon: service.node.frontmatter.icon,
										modalTitle: service.node.frontmatter.title
									})
								}
								animateOnMount
								pose="enter"
								initialPose="exit"
								i={i}>
								<ServiceIcon>
									<Icon icon={service.node.frontmatter.icon} />
								</ServiceIcon>
								<ServiceText>
									<ServiceTitle>{service.node.frontmatter.title}</ServiceTitle>
									<ServiceExcerpt>{service.node.frontmatter.excerpt}</ServiceExcerpt>
								</ServiceText>
							</ServiceCard>
						))}
				</ServiceGrid>
				<Modal
					closeTimeoutMS={225}
					className="Service-Modal"
					onRequestClose={() => this.setState({ isOpen: false })}
					overlayClassName="Overlay"
					shouldCloseOnOverlayClick={true}
					shouldCloseOnEsc={true}
					isOpen={this.state.isOpen}>
					<ServiceModal>
						<Flex alignCenter justifyStart>
							<Icon icon={this.state.icon} />
							<h3 style={{ marginLeft: 15 }}>{this.state.modalTitle}</h3>
						</Flex>
						<p dangerouslySetInnerHTML={{ __html: this.state.modalInnerText }} />
					</ServiceModal>
				</Modal>
			</Page>
		);
	}
}

const ServiceModal = styled.div`
	background: white;
	max-width: 1000px;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
	padding: 1rem 2rem;
	box-sizing: border-box;
`;

const ServiceGrid = styled.div`
	display: grid;
	grid-auto-flow: row;
	width: calc(100vw / 24 * 14);
	margin: 0 auto;
	grid-gap: calc(100vw / 24 * 0.66);
	grid-template-columns: repeat(auto-fill, minmax(calc(100vw / 24 * 3), 480px));
`;

const ServiceCard = styled(
	posed.div({
		enter: {
			y: 0,
			opacity: 1,
			delay: ({ i }) => i * 500,
			transition: {
				default: { ease: styleguide.bezierArray, duration: 1000 }
			}
		},
		exit: {
			y: "10px",
			opacity: 0
		}
	})
)`
	height: 160px;
	display: grid;
	grid-template-areas: "icon text";
	background-color: white;
	cursor: pointer;
	transition: 225ms cubic-bezier(${styleguide.bezier});

	&:hover {
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
	}
`;

const ServiceIcon = styled.div`
	grid-area: icon;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0 calc(100vw / 24 * 0.5);
`;

const ServiceText = styled.div`
	grid-area: text;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding-right: calc(100vw / 24 * 0.5);
`;

const ServiceTitle = styled.h5`
	font-weight: bold;
	margin: 0;
`;

const ServiceExcerpt = styled.span``;

export default Services;

export const ServicesPageQuery = graphql`
	query ServicesPage($id: String!) {
		markdownRemark(id: { eq: $id }) {
			frontmatter {
				title
				index
			}
		}
		services: allMarkdownRemark(
			filter: { frontmatter: { templateKey: { eq: "service" } } }
			sort: { fields: frontmatter___order }
		) {
			edges {
				node {
					id
					html
					frontmatter {
						title
						excerpt
						order
						icon
					}
				}
			}
		}
		totalPages: allMarkdownRemark(filter: { frontmatter: { level: { eq: "top" } } }) {
			totalCount
		}
	}
`;
