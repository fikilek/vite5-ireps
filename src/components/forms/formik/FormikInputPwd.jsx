import { ErrorMessage, Field } from "formik";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { IconContext } from "react-icons";
import { useState } from "react";

import "@/components/forms/Form.css";

import FormFieldError from "@/components/forms/formError/FormFieldError";

const FormikInputPwd = props => {
	
	// console.log(`props`, props);
	const { label, name, type, hide, ...rest } = props;

	const [pwdEyeToggle, SetPwdEyeToggle] = useState(false);
	const attrType = pwdEyeToggle ? "text" : "password";

	const handleClick = e => {
		// console.log(`icon clicked`);
		SetPwdEyeToggle(!pwdEyeToggle);
	};

	return (
		<div className={`form-control password `}>
			<Field name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, meta } = props;

					// input border must be red if there is an error and its touched
					const error = meta.error && meta.touched ? "error" : "";

					// create state for password eye

					return (
						<>
							<input {...field} {...rest} className={`${meta.error ? 'error' : ''} ${hide}`} type={attrType} />
							<IconContext.Provider value={{ className: "icon-password" }}>
								{pwdEyeToggle ? (
									<GoEye onClick={handleClick} />
								) : (
									<GoEyeClosed onClick={handleClick} />
								)}
							</IconContext.Provider>
						</>
					);
				}}
			</Field>
			<label className={`label`} htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikInputPwd;
