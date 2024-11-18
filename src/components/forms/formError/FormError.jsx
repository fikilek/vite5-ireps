import "@/components/forms/formError/FormError.css";

const FormError = props => {
	const { errorMsg } = props;
	return (
		<div className="form-error">
			<p>{errorMsg}</p>
		</div>
	);
};

export default FormError;
