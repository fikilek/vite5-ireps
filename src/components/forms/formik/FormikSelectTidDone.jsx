import { ErrorMessage, Field } from "formik";

import "@/components/forms/Form.css";

import FormFieldError from "@/components/forms/formError/FormFieldError";

const FormikSelectTidDone = props => {
	// console.log(`props`, props);
	const { label, name, options, ...rest } = props;
	// console.log(`rest`, rest);

	return (
		<div className={`form-control ${name} `}>
			<Field id={name} name={name} {...rest}>
				{props => {
					// console.log(`props`, props);
					const { field, form, meta } = props;

					const handleChange = async e => {
						console.log(`e.target.value`, e.target.value);
						console.log(`field.name`, field.name);

						await form.setFieldValue("tidOperation.tidDone", e.target.value);
						await form.validateField("tidOperation.tidDone");

						if (e.target.value === "no") {
							await form.setFieldValue("tidBefore.tariff", "");
							await form.setFieldValue("tidBefore.krn", "");
							await form.validateField("tidBefore.krn");

							await form.setFieldValue("tidAfter.tariff", "");
							await form.validateField("tidAfter.tariff");

							await form.setFieldValue("tidAfter.krn", "");
							await form.validateField("tidAfter.krn");

							await form.validateField("tidOperation.comment");
						}
					};

					return (
						<select {...field} onChange={handleChange} className={meta.error ? 'error' : ''}>
							{options &&
								options.map(option => {
									return (
										<option key={option.key} value={option.value}>
											{option.key}
										</option>
									);
								})}
						</select>
					);
				}}
			</Field>
			<label className="label" htmlFor={name}>
				{label}
			</label>
			<ErrorMessage name={name} component={FormFieldError}></ErrorMessage>
		</div>
	);
};

export default FormikSelectTidDone;
