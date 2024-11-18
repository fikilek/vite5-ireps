import "@/components/forms/FormHeader/FormHeader1.css";

import FormCloseBtn from "@/components/forms/formBtns/FormCloseBtn";

const FormHeader1 = props => {
	const { title } = props;

	return (
		<div className="form-header1">
			<p>{title}</p>
			<FormCloseBtn />
		</div>
	);
};

export default FormHeader1;
