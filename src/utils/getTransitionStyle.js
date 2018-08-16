import styleguide from "../components/styleguide";

const getTransitionStyles = timeout => {
	return {
		entering: {},
		entered: {
			transition: `${timeout}ms cubic-bezier(${styleguide.bezier})`
		},
		exiting: {
			transition: `${timeout}ms cubic-bezier(${styleguide.bezier})`
		}
	};
};

const getTransitionStyle = ({ timeout, status }) => getTransitionStyles(timeout)[status];

export default getTransitionStyle;
