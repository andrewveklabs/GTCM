import React, { Component } from "react";
import styled from "styled-components";
import styleguide from "./styleguide";
import Flex, { FlexItem } from "styled-flex-component";
import { Link } from "gatsby";
import {
	IoIosHome,
	IoIosHomeOutline,
	IoIosFlowerOutline,
	IoIosFlower,
	IoIosBoltOutline,
	IoIosBolt,
	IoIosPaperOutline,
	IoIosPaper,
	IoIosPeopleOutline,
	IoIosPeople,
	IoIosAnalyticsOutline,
	IoIosAnalytics,
	IoIosBriefcaseOutline,
	IoIosBriefcase,
	IoIosChatboxesOutline,
	IoIosChatboxes
} from "react-icons/lib/io";
import { Popover, Position, Button } from "evergreen-ui";

const Menu = ({ color }) => (
	<Popover
		position={Position.BOTTOM_RIGHT}
		zIndex={999999}
		content={
			<MenuContainer>
				<MenuContainerInner>
					<MenuItem url="/" text="Home" icon={IoIosHomeOutline} hoverIcon={IoIosHome} />
					<MenuItem url="/whoweare" text="Who We Are" icon={IoIosFlowerOutline} hoverIcon={IoIosFlower} />
					<MenuItem url="/projects" text="Projects" icon={IoIosBoltOutline} hoverIcon={IoIosBolt} />
					<MenuItem url="/news" text="News" icon={IoIosPaperOutline} hoverIcon={IoIosPaper} />
					<MenuItem url="/leadership" text="Leadership" icon={IoIosPeopleOutline} hoverIcon={IoIosPeople} />
					<MenuItem url="/services" text="Services" icon={IoIosAnalyticsOutline} hoverIcon={IoIosAnalytics} />
					<MenuItem url="/leadership#careers" text="Careers" icon={IoIosBriefcaseOutline} hoverIcon={IoIosBriefcase} />
					<MenuItem url="/contact" text="Contact" icon={IoIosChatboxesOutline} hoverIcon={IoIosChatboxes} />
				</MenuContainerInner>
				<MenuFooter justifyBetween>
					<FlexItem>
						<FooterText>Terms & Conditions</FooterText>
						<span style={{ color: styleguide.blue }}>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
						<FooterText> Cookie Policy</FooterText>
					</FlexItem>
					<FlexItem>
						<FooterCopyright>© 2018 GTCM</FooterCopyright>
					</FlexItem>
				</MenuFooter>
			</MenuContainer>
		}>
		<Button color={color} marginTop={-3} className="menu-trigger">
			Menu
		</Button>
	</Popover>
);

class MenuItem extends Component {
	state = { hovered: false };
	render() {
		return (
			<Link to={this.props.url} exact>
				<MenuButton
					onMouseOver={() => this.setState({ hovered: true })}
					onMouseOut={() => this.setState({ hovered: false })}
					alignCenter>
					{this.state.hovered
						? this.props.hoverIcon({ size: 30, color: "#6F98AA" })
						: this.props.icon({ size: 30, color: "#6F98A8" })}
					<MenuText>{this.props.text}</MenuText>
				</MenuButton>
			</Link>
		);
	}
}

const MenuFooter = Flex.extend`
	background: #efefef;
	padding: ${styleguide.c(0.5)} ${styleguide.c(1)};
	font-size: 14px;
`;

const FooterText = styled(Link)`
	font-weight: 500;
`;

const MenuContainer = styled.div`
	background: white;
`;

const FooterCopyright = styled.span`
	font-weight: 500;
	color: #aaa;
`;

const MenuContainerInner = styled.div`
	padding: ${styleguide.c(0.5)};
	display: grid;
	grid-gap: 1rem ${styleguide.c(1)};
	position: relative;
	grid-template-columns: repeat(2, ${styleguide.c(4)});
`;

const MenuText = styled.h6`
	margin: 0;
	font-size: 1.2rem;
	line-height: 1;
	margin-left: ${styleguide.c(0.15)};
	color: #6f98a8;
`;

const MenuButton = Flex.extend`
	background: white;
	padding: ${styleguide.c(0.25)} ${styleguide.c(0.5)};
	transition: 225ms;
	cursor: pointer;

	&:hover {
		background: rgba(111, 152, 170, 0.15);
	}
`;

export default Menu;
