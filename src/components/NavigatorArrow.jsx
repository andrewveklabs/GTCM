import React from "react";
import { IoIosArrowLeft, IoIosArrowRight } from "react-icons/lib/io";

const NavigatorArrow = ({ left, right, text, onClick }) => {
	if (left) {
		return (
			<div onClick={onClick} className="page-navigator--part page-navigator--left">
				<span className="page-navigator--icon">
					<IoIosArrowLeft />
				</span>
				<span className="page-navigator--text">{text}</span>
			</div>
		);
	} else if (right) {
		return (
			<div onClick={onClick} className="page-navigator--part page-navigator--right">
				<span className="page-navigator--text">{text}</span>
				<span className="page-navigator--icon">
					<IoIosArrowRight />
				</span>
			</div>
		);
	}
};

export default NavigatorArrow;
