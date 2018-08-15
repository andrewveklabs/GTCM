import styleguide from "../components/styleguide";

const getTransitionStyles = timeout => {
	return {
		entering: {
			opacity: 0
		},
		entered: {
			transition: `${timeout}ms cubic-bezier(${styleguide.bezier})`,
			opacity: 1
		},
		exiting: {
			transition: `${timeout}ms cubic-bezier(${styleguide.bezier})`,
			opacity: 0
		}
	};
};

const getTransitionStyle = ({ timeout, status }) => getTransitionStyles(timeout)[status];

export default getTransitionStyle;
