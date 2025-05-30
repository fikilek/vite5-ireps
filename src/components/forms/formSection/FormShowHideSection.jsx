const FormShowHideSection = (props) => {
	// console.log(`props`, props);
	const { active, setActive, sectionName, formik } = props;
	// console.log(`active`, active);
	// console.log(`sectionName`, sectionName);

	const handleClick = (e) => {
		// console.log(`FormShowHideSection handleClick`);
		// console.log(`sectionName`, sectionName);
		// console.log(`active`, active);

		e.preventDefault();
		if (sectionName === active) {
			// console.log(`set  active to "null`)
			setActive(null);
		} else {
			// console.log(`set  active to ${sectionName}`)
			setActive(sectionName);
		}
	};

	return (
		<button type="button" className="section-btn" onClick={handleClick}>
			{active === sectionName ? "-" : "+"}
		</button>
	);
};

export default FormShowHideSection;
