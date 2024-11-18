// import { CiLogin } from "react-icons/ci";
import "@/components/forms/formFooter/FormFooter.css";

import FormResetBtn from "@/components/forms/formBtns/FormResetBtn";
import FormSubmitBtn from "@/components/forms/formBtns/FormSubmitBtn";

const FormFooter = props => {
	// console.log(`props`, props);
	const { formik, signState, children } = props;
	return (
		<div className="form-footer vc-hsb">
			<FormResetBtn formik={formik} title={"Reset Form"} signState={signState} />
			{children}
			<FormSubmitBtn formik={formik} title={"Submit Form"} signState={signState} />
		</div>
	);
};

export default FormFooter;
