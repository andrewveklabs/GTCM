import styleguide from "../components/styleguide";

const getTransitionStyles = (timeout, index = 1, nextIndex) => {
	return {
		entering: {
			transform: "translateX(100%)"
		},
		entered: {
			transition: `${timeout}ms cubic-bezier(${styleguide.bezier})`,
			transform: "translateX(0)"
		},
		exiting: {
			transition: `${timeout}ms cubic-bezier(${styleguide.bezier})`,
			transform: "translateX(-100%)"
		}
	};
};

const getTransitionStyle = ({ timeout, status, index, nextIndex }) => getTransitionStyles(timeout, index, nextIndex)[status];

export default getTransitionStyle;
